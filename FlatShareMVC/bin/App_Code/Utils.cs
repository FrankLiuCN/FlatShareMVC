using FlatShareMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatShareMVC.App_Code
{
    public static class Utils
    {
        /// <summary>
        /// 设置用户登陆信息的Cookie
        /// </summary>
        /// <param name="account"></param>
        /// <param name="expires"></param>
        public static void SetLoginInfoCookie(UserAccount account, int expires)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies["LoginInfo"];
            if (cookie == null)
                cookie = new HttpCookie("LoginInfo");
            cookie.Values["LoginName"] = account.uaLoginName;
            cookie.Values["Password"] = account.uaPassword;
            if (expires > 0)
            {
                cookie.Expires = DateTime.Now.AddDays(expires);
            }
            HttpContext.Current.Response.AppendCookie(cookie);
        }

        public static void RemoveLoginInfoCookie()
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies["LoginInfo"];
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddDays(-1);//删除整个Cookie，只要把过期时间设置为现在
                HttpContext.Current.Response.AppendCookie(cookie);
            }
        }
    }
}