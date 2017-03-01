using ICGROUP.CAMPAIGN_MANAGER.BUSINESS;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ICGROUP.CAMPAIGN_MANAGER.SERVICES.Controllers
{
    public class CampaignController : ApiController
    {
        public CampaignDataManager campaignDataManager = new CampaignDataManager();   

        [HttpPost]
        public string Add([FromBody]Campaign campaignModel)
        {
            string campaignId = campaignDataManager.Add(campaignModel);
            return campaignId;
        }

        [HttpPost]
        public string Edit([FromBody]Campaign campaignModel)
        {
            string abc = campaignDataManager.Edit(campaignModel);
            return abc;
        }

        [HttpPost]
        public string Delete([FromBody]string campaignModel)
        {
            string abc = campaignDataManager.Delete(campaignModel);
            return abc;
        }

        [HttpPost]
        public Campaign Search([FromBody]string campaignModel)
        {
            Campaign abc = campaignDataManager.Search(campaignModel);
            return abc;
        }

        [HttpPost]
        public IEnumerable<Campaign> Search()
        {
            Campaign[] allCampaigns = campaignDataManager.Search();
            return allCampaigns;
        }
    }
}