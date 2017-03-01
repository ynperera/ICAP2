using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public class Campaign
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string CountryCode { get; set; }
        public string CampaignType { get; set; }
        public string LaunchDate { get; set; }
        public string Status { get; set; }
        public bool IsBlocked { get; set; }
    }
}