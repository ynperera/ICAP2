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
    public class MasterDataManager
    {
           MasterDataGateway masterDataGateway = new MasterDataGateway();

        public ResponseData GetOrganizations()
        {
            ResponseData response = masterDataGateway.GetOrganizations();
            return response;
        }

        public ResponseData GetUserRoles()
        {
           ResponseData response = masterDataGateway.GetUserRoles();
            return response;
        }       
    }
}
