using FlatShareMVC.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FlatShareMVC.Controllers
{
    public class PayItemController : BaseController
    {
        //
        // GET: /PayItem/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPayItemList()
        {
            return Content(JsonConvert.SerializeObject(db.PayItem.Where(u => u.piDeleted != true)));
        }

        public ActionResult EditPayItem(PayItem payItem)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                if (!ModelState.IsValid)
                    return AjaxResult("error", "数据格式不正确");
                PayItem temp = db.PayItem.Where(u => u.piName == payItem.piName && u.piId != payItem.piId && u.piDeleted != true).SingleOrDefault();
                if (temp != null)
                    return AjaxResult("error", "修改失败，已经存在此支出项");
                UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                payItem.piUpdatedBy = currentUser.uaId;
                payItem.piUpdatedDate = DateTime.Now;
                payItem.piRemark = payItem.piRemark == null ? "" : payItem.piRemark;
                db.Entry(payItem).State = EntityState.Modified;
                db.SaveChanges();

                return AjaxResult("success", "修改成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }

        public ActionResult AddPayItem(PayItem payItem)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                if (!ModelState.IsValid)
                    return AjaxResult("error", "数据格式不正确");
                PayItem temp = db.PayItem.Where(u => u.piName == payItem.piName && u.piDeleted != true).SingleOrDefault();
                if (temp != null)
                    return AjaxResult("error", "添加失败，已经存在此支出项");
                UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                payItem.piUpdatedBy = currentUser.uaId;
                payItem.piUpdatedDate = DateTime.Now;
                payItem.piRemark = payItem.piRemark == null ? "" : payItem.piRemark;
                db.PayItem.Add(payItem);
                db.SaveChanges();
                return AjaxResult("success", "添加成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }

        public ActionResult DeletePayItem(int piId)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                PayItem temp = db.PayItem.Where(u => u.piId == piId).SingleOrDefault();
                UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                temp.piUpdatedBy = currentUser.uaId;
                temp.piUpdatedDate = DateTime.Now;
                temp.piDeleted = true;
                db.SaveChanges();
                return AjaxResult("success", "删除成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }
    }
}
