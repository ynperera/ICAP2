#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.DATA;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.BUSINESS
{
    public class UserDataManager
    {
        UserDataGateway userDataGateway = new UserDataGateway();         

        public UserDataManager()
        { 
        }

        public ResponseData Add(User userModel)
        {
            ResponseData response = userDataGateway.AddUser(userModel);
            return response;
        }

        public ResponseData Edit(User campaignModel)
        {
            ResponseData id = Add(campaignModel);
            return id;
        }

        public ResponseData Delete(string userId)
        {
            ResponseData response = userDataGateway.DeleteUser(userId);
            return response;           
        }

        public ReaderResponseData Search(SearchBase searchBase)
        {
            ReaderResponseData response = userDataGateway.SearchUsers(searchBase);
            return response;           
        }

        public UserList Search(string userId)
        {
            UserList response = userDataGateway.SearchUser(userId);
            return response;
        }

        public ResponseData SetUserStatus(User user) 
        {
            ResponseData response = userDataGateway.SetUserStatus(user);
            return response;
        }
    }
}
