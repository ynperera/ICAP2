#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class MasterDataGateway
    {
        public ResponseData GetOrganizations()
        {
            try
            {
                UserWriter<ResponseData> userWriter = new UserWriter<ResponseData>();
                //userWriter.UserObj = userObj;
                return userWriter.Execute();
            }
            catch (Exception ex)
            {
                ResponseData response = new ResponseData();
                response.StatusCode = RequestStatus.Failure;
                response.StatusMessage = "Failure";
                //[TODO] Need to log the error
                return response;
            }
        }

        public ResponseData GetUserRoles()
        {
            try
            {
                UserWriter<ResponseData> userEditer = new UserWriter<ResponseData>();
                //userEditer.UserObj = userObj;
                return userEditer.Execute();
            }
            catch (Exception ex)
            {
                ResponseData response = new ResponseData();
                response.StatusCode = RequestStatus.Failure;
                response.StatusMessage = "Failure";
                //[TODO] Need to log the error
                return response;
            }
        }
    }
}
