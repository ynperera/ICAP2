using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICGROUP.CAMPAIGN_MANAGER.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/

        public ActionResult Search()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult ResetPassword()
        {
            return View();
        }

        public ActionResult ForgotPassword()
        {
            return View();
        }

    }
}
