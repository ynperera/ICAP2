#region Using Directives

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using ICGROUP.CAMPAIGN_MANAGER.COMMON;
using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.DATA.DBReferences;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class ReadUserMapper : ReadMapperBase<User>
    {
        protected override User Map(IDataRecord record)
        {
            try
            {
                User user = new User();

                user.UserId = (DBNull.Value == record[ColumnNames.UserId]) ?
                    string.Empty : record[ColumnNames.UserId].ToString();

                user.FirstName = (DBNull.Value == record[ColumnNames.FirstName]) ?
                    string.Empty : record[ColumnNames.FirstName].ToString();

                user.LastName = (DBNull.Value == record[ColumnNames.LastName]) ?
                    string.Empty :record[ColumnNames.LastName].ToString();

                user.Email = (DBNull.Value == record[ColumnNames.Email]) ?
                    string.Empty :record[ColumnNames.Email].ToString();

               // user.OrganizationName = (DBNull.Value == record[ColumnNames.OrganizationName]) ?
                 //   string.Empty : record[ColumnNames.OrganizationName].ToString();

               // user.Status = (DBNull.Value == record[ColumnNames.UserStatus]) ?
                   // UserStatus.Active : (UserStatus)Enum.Parse(typeof(UserStatus), record[ColumnNames.UserStatus].ToString());

                user.CreatedDate = (DBNull.Value == record[ColumnNames.CreatedDate]) ?
                    DateTime.Now : (DateTime)record[ColumnNames.CreatedDate];

              


                return user;
            }
            catch (Exception ex)
            {
                throw;               
            }
        }
    }
}
