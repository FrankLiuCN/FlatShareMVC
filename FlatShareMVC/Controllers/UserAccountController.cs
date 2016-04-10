using FlatShareMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FlatShareMVC.App_Code;

namespace FlatShareMVC.Controllers
{
    public class UserAccountController : BaseController
    {
        private FlatShareEntities db = new FlatShareEntities();
        //
        // GET: /UserAccount/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
        public ActionResult LoginVerify(string userName, string password, bool remember)
        {
            UserAccount account = db.UserAccount.Where(u => u.uaLoginName == userName && u.uaPassword == password && u.uaDeleted != true).SingleOrDefault();
            if (account == null)
            {
                return AjaxResult("error", "登录失败，用户名或密码不正确");
            }
            else
            {
                if (account.uaEnable == true)
                {
                    if (remember)
                        Utils.SetLoginInfoCookie(account, 30);
                    else
                        Utils.RemoveLoginInfoCookie();
                    return AjaxResult("success", "登录成功");
                }
                else
                {
                    return AjaxResult("error", "登录失败，账号未启用");
                }
            }

        }

    }
}
