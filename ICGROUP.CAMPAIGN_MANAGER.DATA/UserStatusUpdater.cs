#region Using Directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Text;

using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.DATA.DBReferences;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class UserStatusUpdater : UserWriter<ResponseData>
    {
        protected override string CommandText
        {
            get { return StoredProcedureNames.SP_SET_USER_STATUS; }
        }

        protected override Collection<IDataParameter> GetParameters(IDbCommand command)
        {
            Collection<IDataParameter> collection = new Collection<IDataParameter>();

            IDataParameter userId = GetDBParameter(command, ColumnNames.UserStatus, UserObj.UserId, ParameterDirection.InputOutput);
            collection.Add(userId);

            IDataParameter userStatus = GetDBParameter(command, ColumnNames.UserStatus, UserObj.Status, ParameterDirection.Input);
            collection.Add(userStatus);           

            return collection;
        }        
    }
}
