#region Using Directives

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.DATA.DBReferences;
using System.Data.SqlClient;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class WriteUserMapper : WriteMapperBase<ResponseData>
    {
        public override ResponseData Map(IDbCommand command)
        {
            ResponseData response = new ResponseData();
            try
            {
                SqlCommand sqlCommand = command as SqlCommand;
                response.Id = (DBNull.Value == sqlCommand.Parameters[ColumnNames.UserId].Value) ?
                    string.Empty : sqlCommand.Parameters[ColumnNames.UserId].Value.ToString();                
                response.StatusCode = RequestStatus.Success;
                response.StatusMessage = "Success";                
            }
            catch (Exception ex)
            {
                response.StatusCode = RequestStatus.Failure;
                response.StatusMessage = "Failure";   
                //[TODO] Need to log the error
            }

            return response;
        }
    }
}
