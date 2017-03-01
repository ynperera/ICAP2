using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ICGROUP.CAMPAIGN_MANAGER.BUSINESS
{
    public class CampaignDataManager
    {
        Dictionary<string, Campaign> campaignList = new Dictionary<string, Campaign>();

        Campaign[] campaigns = new Campaign[] 
        { 
            new Campaign { Id = Guid.NewGuid().ToString(), Name = "Tomato Soup", CountryCode = "AF", CampaignType = "Groceries" }, 
            new Campaign { Id = Guid.NewGuid().ToString(), Name = "Yo-yo", CountryCode = "AU", CampaignType = "3.75M" }, 
            new Campaign { Id =Guid.NewGuid().ToString(), Name = "Hammer", CountryCode = "IN", CampaignType = "16.99M" },
            new Campaign { Id ="100", Name = "Hammer1", CountryCode = "JP", CampaignType = "16.99aaM" }
        };

        public CampaignDataManager()
        { 
        }

        public string Add(Campaign campaignModel)
        {
            string id = null;

            if (!string.IsNullOrEmpty(campaignModel.Id) || !string.IsNullOrWhiteSpace(campaignModel.Id))
            {
                if (campaignList.ContainsKey(campaignModel.Id))
                {
                    campaignList.Remove(campaignModel.Id);
                }
                campaignList[campaignModel.Id] = campaignModel;
                id = campaignModel.Id;
            }
            else
            {
                id = Guid.NewGuid().ToString();
                campaignList.Add(id, campaignModel);
            }
            
            return id;
        }

        
        public string Edit(Campaign campaignModel)
        {
            string id = Add(campaignModel);
            return id;
        }


        public string Delete(string campaignId)
        {
            string id = null;

            if (!string.IsNullOrEmpty(campaignId) || !string.IsNullOrWhiteSpace(campaignId))
            {
                if (campaignList.ContainsKey(campaignId))
                {
                    campaignList.Remove(campaignId);
                }

                id = campaignId;
            }

            return id;
        }

        public Campaign Search(string campaignId)
        {
            Campaign campaign = campaigns.FirstOrDefault((p) => p.Id == campaignId);
            if (campaign == null)
            {
                return null;
            }
            return campaign;           
        }

        public Campaign[] Search()
        {
            return campaigns;
        }


    }
}
