#region Using Directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Text;

using ICGROUP.CAMPAIGN_MANAGER.DATA.DBReferences;
using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class UserEditer : UserWriter<ResponseData>
    {
        protected override string CommandText
        {
            get { return StoredProcedureNames.SP_EDIT_USER; }
        }

        protected override Collection<IDataParameter> GetParameters(IDbCommand command) 
        {
            Collection<IDataParameter> collection = base.GetParameters(command);

            if (Utility.IsValidStringField(UserObj.UserId))
            {
                IDataParameter userId = GetDBParameter(command, ColumnNames.UserId, UserObj.UserId, ParameterDirection.Input);
                collection.Add(userId);
            }

            return collection;
        }
    }
}
