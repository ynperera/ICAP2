#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using ICGROUP.CAMPAIGN_MANAGER.BUSINESS;
using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.SERVICES.Models;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.SERVICES.Controllers
{
    public class MasterController : ApiController
    {
        public MasterDataManager masterDataManager = new MasterDataManager();       

        [HttpPost]
        public HttpResponseMessage GetOrganizations()
        {
            ResponseData response = masterDataManager.GetOrganizations();

            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    UserId = response.Id,
                    Status = response.StatusCode,
                    StatusMessage = response.StatusMessage
                })
            };
        }

        [HttpPost]
        public HttpResponseMessage GetRoles()
        {
            ResponseData response = masterDataManager.GetUserRoles();

            return new HttpResponseMessage()
            {
                Content = new JsonContent(new
                {
                    UserId = response.Id,
                    Status = response.StatusCode,
                    StatusMessage = response.StatusMessage
                })
            };
        }    
    }
}