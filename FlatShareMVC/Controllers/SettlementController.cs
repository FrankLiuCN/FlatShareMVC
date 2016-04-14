using FlatShareMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public ActionResult GenerateSettlement(DateTime start, DateTime end)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                var outlays = db.Outlay.Where(o => o.oDate >= start && o.oDate <= end && o.oDeleted != true);


                return AjaxResult("success", "修改成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }

    }
}
