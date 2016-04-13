using FlatShareMVC.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Transactions;

namespace FlatShareMVC.Controllers
{
    public class OutlayController : BaseController
    {
        //
        // GET: /Outlay/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetOutlayList(int take = 10, int skip = 0)
        {
            var outlays = (from o in db.Outlay
                           join p in db.PayItem on o.opiId equals p.piId
                           join u in db.UserAccount on o.ouaId equals u.uaId
                           where o.oDeleted != true
                           orderby o.oDate descending
                           select new
                           {
                               o.oId,
                               o.opiId,
                               p.piName,
                               o.oTotalMoney,
                               o.ouaId,
                               u.uaUserName,
                               o.oDate,
                               o.oRemark
                           }).Skip(skip * take).Take(take);
            return Content(JsonConvert.SerializeObject(outlays));
        }

        public ActionResult GetOutlayInfo(int oId)
        {
            var outlay = (from o in db.Outlay
                          join p in db.PayItem on o.opiId equals p.piId
                          join u in db.UserAccount on o.ouaId equals u.uaId
                          where o.oId == oId
                          orderby o.oDate descending
                          select new
                          {
                              o.oId,
                              o.opiId,
                              p.piName,
                              o.oTotalMoney,
                              o.ouaId,
                              u.uaUserName,
                              o.oDate,
                              o.oRemark
                          }).SingleOrDefault();

            var outlayLines = from ol in db.OutlayLine
                              join u in db.UserAccount on ol.oluaId equals u.uaId
                              where ol.oloId == oId
                              orderby ol.oluaId
                              select new
                              {
                                  ol.olId,
                                  ol.olPayMoney,
                                  ol.olRemark,
                                  ol.oluaId,
                                  u.uaUserName
                              };


            var result = new
            {
                outlay = outlay,
                outlayLines = outlayLines
            };
            return Content(JsonConvert.SerializeObject(result));
        }

        public ActionResult AddOutlayInfo(string modelJson)
        {
            try
            {
                OutlayInfoModel model = JsonConvert.DeserializeObject<OutlayInfoModel>(modelJson);
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                    using (TransactionScope scope = new TransactionScope())
                    {
                        Outlay outlay = model.OutlayInfo;
                        outlay.oUpdatedBy = currentUser.uaId;
                        outlay.oUpdatedDate = DateTime.Now;
                        db.Outlay.Add(outlay);
                        db.SaveChanges();

                        foreach (OutlayLine line in model.OutlayLines)
                        {
                            line.oloId = outlay.oId;
                            line.olUpdatedBy = currentUser.uaId;
                            line.olUpdatedDate = DateTime.Now;
                            db.OutlayLine.Add(line);
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
            catch (Exception ex)
            {
                return AjaxResult("error", ex.Message);
            }
        }

        public ActionResult DeleteOutlayInfo(int oId)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    Outlay temp = db.Outlay.Where(u => u.oId == oId).SingleOrDefault();
                    UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                    temp.oUpdatedBy = currentUser.uaId;
                    temp.oUpdatedDate = DateTime.Now;
                    temp.oDeleted = true;
                    var lines = db.OutlayLine.Where(u => u.oloId == oId);
                    foreach (var item in lines)
                    {
                        item.olUpdatedBy = currentUser.uaId;
                        item.olUpdatedDate = DateTime.Now;
                        item.olDelete = true;
                    }
                    db.SaveChanges();
                    scope.Complete();
                }
                return AjaxResult("success", "删除成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }
    }
}
