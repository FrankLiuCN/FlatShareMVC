using FlatShareMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FlatShareMVC.App_Code;
using Newtonsoft.Json;

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
                    System.Web.Security.FormsAuthentication.SetAuthCookie(account.uaUserName, false);
                    Session["CurrentUser"] = account;
                    return AjaxResult("success", "登录成功");
                }
                else
                {
                    return AjaxResult("error", "登录失败，账号未启用");
                }
            }

        }

        public ActionResult LoginCheck()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                return AjaxResult("success", HttpContext.User.Identity.Name);
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }

        }

        public ActionResult GetUserList()
        {
            return Content(JsonConvert.SerializeObject(db.UserAccount.Where(u => u.uaDeleted != true)));
        }

        public ActionResult AddUser(UserAccount account)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                if (!ModelState.IsValid)
                    return AjaxResult("error", "数据格式不正确");
                UserAccount temp = db.UserAccount.Where(u => u.uaLoginName == account.uaLoginName && u.uaDeleted != true).SingleOrDefault();
                if (temp != null)
                    return AjaxResult("error", "添加失败，已经存在此登录名");
                UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                account.uaUpdatedBy = currentUser.uaId;
                account.uaUpdatedDate = DateTime.Now;
                db.UserAccount.Add(account);
                db.SaveChanges();
                return AjaxResult("success", "添加成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }

        public ActionResult DeleteUser(string loginName)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                //if (!ModelState.IsValid)
                //{
                //    return AjaxResult("error", "数据格式不正确");
                //}
                //UserAccount currentUser = Session["CurrentUser"] as UserAccount;
                //account.uaUpdatedBy = currentUser.uaId;
                //account.uaUpdatedDate = DateTime.Now;
                //db.UserAccount.Add(account);
                //db.SaveChanges();
                return AjaxResult("success", "删除成功");
            }
            else
            {
                return AjaxResult("error", "未登陆");
            }
        }
    }
}
