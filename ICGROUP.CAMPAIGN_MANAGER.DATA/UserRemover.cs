#region Using Directives

using System;
using System.Data;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using System.Collections.ObjectModel;

using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.DATA.DBReferences;
using ICGROUP.CAMPAIGN_MANAGER.COMMON;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class UserRemover : UserWriter<ResponseData>
    {
        protected override string CommandText
        {
            get { return StoredProcedureNames.SP_DELETE_USER; }
        }

        public string UserId { get; set; }

        protected override Collection<IDataParameter> GetParameters(IDbCommand command)
        {
            Collection<IDataParameter> collection = new Collection<IDataParameter>();

            if (Utility.IsValidStringField(UserObj.UserId))
            {
                IDataParameter firstName = GetDBParameter(command, ColumnNames.UserId, UserObj.UserId, ParameterDirection.Input);
                collection.Add(firstName);
            }

            return collection;
        }
    }
}


