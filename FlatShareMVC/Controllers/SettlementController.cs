using FlatShareMVC.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;

namespace FlatShareMVC.Controllers
{
    public class SettlementController : BaseController
    {
        //
        // GET: /Settlement/

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult DeletedSettlementInfo(int sId)
        {
            if (Session["CurrentUser"] != null)
            {
                try
                {
                    UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                    using (TransactionScope scope = new TransactionScope())
                    {
                        Settlement settlement = db.Settlement.Where(s => s.sId == sId).SingleOrDefault();
                        settlement.sDeleted = true;
                        settlement.sUpdatedBy = currentUser.uaId;
                        settlement.sUpdatedDate = DateTime.Now;

                        db.SettlementLine.Where(sl => sl.slsId == sId).ToList().ForEach(item => {
                            item.sDeleted = true;
                        });

                        db.SaveChanges();

                        scope.Complete();
                    }

                    return AjaxResult("success", "删除成功");
                }
                catch (Exception ex)
                {
                return AjaxResult("error", ex.Message);
                }
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }
        public ActionResult GetSettlementInfoList()
        {
            List<SettlementInfoModel> modelList = new List<SettlementInfoModel>();
            var settlements = db.Settlement.Where(s => s.sDeleted != true).OrderByDescending(s => s.sUpdatedDate);
            foreach (var item in settlements)
            {
                SettlementInfoModel model = new SettlementInfoModel();
                model.SettlementInfo = item;
                List<SettlementLineInfo> settlementLineInfos = (from sl in db.SettlementLine
                                                                join ua in db.UserAccount on sl.sluaId equals ua.uaId
                                                                where sl.sDeleted != true && sl.slsId == item.sId
                                                                orderby sl.sluaId
                                                                select new SettlementLineInfo
                                                               {
                                                                   sluaId = sl.sluaId,
                                                                   uaUserName = ua.uaUserName,
                                                                   sActuallyPay = sl.sActuallyPay,
                                                                   sBalance = sl.sBalance,
                                                                   sPayable = sl.sPayable
                                                               }).ToList();

                model.SettlementLineInfos = settlementLineInfos;
                modelList.Add(model);
            }
            return Content(JsonConvert.SerializeObject(modelList));

        }
        public ActionResult GenerateSettlement(DateTime start, DateTime end)
        {
            if (Session["CurrentUser"] != null)
            {

                using (TransactionScope scope = new TransactionScope())
                {
                    var outlays = db.Outlay.Where(o => o.oDate >= start && o.oDate <= end && o.oDeleted != true);
                    Dictionary<int, SettlementLine> slDict = new Dictionary<int, SettlementLine>();
                    UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                    Settlement settlement = new Settlement();
                    settlement.sUpdatedBy = currentUser.uaId;
                    settlement.sUpdatedDate = DateTime.Now;
                    settlement.sStartDate = start;
                    settlement.sEndDate = end;
                    settlement.sTotalCost = 0;
                    foreach (var item in outlays)
                    {
                        settlement.sTotalCost += item.oTotalMoney;
                        SettlementLine templine = GetSettlementLineFromDict(slDict, (int)item.ouaId);
                        templine.sActuallyPay += item.oTotalMoney;//个人已经支付
                        slDict[(int)item.ouaId] = templine;

                        var outlayLine = db.OutlayLine.Where(ol => ol.oloId == item.oId && ol.olDelete != true);
                        foreach (var line in outlayLine)
                        {
                            SettlementLine sl = GetSettlementLineFromDict(slDict, (int)line.oluaId);
                            sl.sPayable += line.olPayMoney;//个人应该支付
                            slDict[(int)line.oluaId] = sl;
                        }
                    }

                    db.Settlement.Add(settlement);
                    db.SaveChanges();

                    foreach (var item in slDict.Values)
                    {
                        item.slsId = settlement.sId;
                        item.sBalance = item.sPayable - item.sActuallyPay;
                        db.SettlementLine.Add(item);
                        db.SaveChanges();
                    }
                    scope.Complete();
                }
                return AjaxResult("success", "添加成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }

        private SettlementLine GetSettlementLineFromDict(Dictionary<int, SettlementLine> slDict, int key)
        {
            if (slDict.ContainsKey(key))
            {
                return slDict[key];
            }
            else
            {
                SettlementLine sl = new SettlementLine();
                sl.sluaId = key;
                sl.sActuallyPay = 0;
                sl.sPayable = 0;
                slDict.Add(key, sl);
                return sl;
            }
        }

    }
}
