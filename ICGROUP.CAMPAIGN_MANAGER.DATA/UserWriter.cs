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
    public class UserWriter<T> : ObjectWriterBase<ResponseData>
    {
        protected override string CommandText
        {
            get { return DBReferences.StoredProcedureNames.SP_ADD_USER; }
        }

        protected override CommandType CommandType
        {
            get { return System.Data.CommandType.StoredProcedure; }
        }

        public User UserObj { get; set; }

        /// <summary>
        /// Set parameter list to send to DB.
        /// [TODO] : Need to add encrption on User Name, Password, Email fields before send to DB.
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        protected override Collection<IDataParameter> GetParameters(IDbCommand command)
        {
            Collection<IDataParameter> collection = new Collection<IDataParameter>();            

            if (Utility.IsValidStringField(UserObj.FirstName)) 
            {
                IDataParameter firstName = GetDBParameter(command, ColumnNames.FirstName, UserObj.FirstName, ParameterDirection.Input);
                collection.Add(firstName);
            }
            if (Utility.IsValidStringField(UserObj.LastName))
            {
                IDataParameter lastName = GetDBParameter(command, ColumnNames.LastName, UserObj.LastName, ParameterDirection.Input);
                collection.Add(lastName);
            }
            if (Utility.IsValidEmailField(UserObj.Email))
            {
                IDataParameter eMail = GetDBParameter(command, ColumnNames.Email, UserObj.Email, ParameterDirection.Input);
                collection.Add(eMail);
            }
            if (Utility.IsValidIntegerField(UserObj.OrganizationId))
            {
                IDataParameter orgId = GetDBParameter(command, ColumnNames.OrganizationId, DBNull.Value, ParameterDirection.Input);
                collection.Add(orgId);
            }


            IDataParameter roleId = GetDBParameter(command, ColumnNames.UserTypeId ,1, ParameterDirection.Input);
            collection.Add(roleId);

            IDataParameter userId = GetDBParameter(command, ColumnNames.UserId,-1, ParameterDirection.Output);
            collection.Add(userId);

          



            return collection;   
        }        

        protected override WriteMapperBase<ResponseData> GetMapper()
        {
            WriteMapperBase<ResponseData> mapper = new WriteUserMapper();
            return mapper;
        }
    }
}
