using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public class CampaignList : SearchBase
    {
        public List<Campaign> Campaigns { get; set; }
    }
}