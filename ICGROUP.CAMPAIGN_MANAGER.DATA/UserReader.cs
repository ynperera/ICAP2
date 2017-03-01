#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Collections.ObjectModel;

using ICGROUP.CAMPAIGN_MANAGER.COMMON.Models;
using ICGROUP.CAMPAIGN_MANAGER.DATA.DBReferences;
using ICGROUP.CAMPAIGN_MANAGER.COMMON;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA
{
    public class UserReader : ObjectReaderBase<User>
    {
        protected override string CommandText
        {
            get { return StoredProcedureNames.SP_SEARCH_USER_LIST; }
        }       

        public SearchBase SearchObj { get; set; }

        protected override Collection<IDataParameter> GetParameters(IDbCommand command)
        {
            Collection<IDataParameter> collection = new Collection<IDataParameter>();

            //if (Utility.IsValidStringField(SearchObj.SortKey)) 
            //{
                IDataParameter sortKey = GetDBParameter(command, OtherParameters.SortKey, SearchObj.SortKey, ParameterDirection.Input);
                collection.Add(sortKey);
            //}

            //if (Utility.IsValidStringField(SearchObj.SearchKey))
           // {
                IDataParameter searchKey = GetDBParameter(command, OtherParameters.SearchKey, SearchObj.SearchKey, ParameterDirection.Input);
                collection.Add(searchKey);
           // }

           // if (Utility.IsValidStringField(SearchObj.SortDirection))
            //{
                IDataParameter sortDirection = GetDBParameter(command, OtherParameters.SortDirection, SearchObj.SortDirection, ParameterDirection.Input);
                collection.Add(sortDirection);
           // }

           // if (Utility.IsValidIntegerField(SearchObj.PageIndex))
           // {
                IDataParameter pageIndex = GetDBParameter(command, OtherParameters.PageIndex, SearchObj.PageIndex, ParameterDirection.Input);
                collection.Add(pageIndex);
           // }

          //  if (Utility.IsValidIntegerField(SearchObj.PageSize))
           // {
                IDataParameter pageSize = GetDBParameter(command, OtherParameters.PageSize, SearchObj.PageSize, ParameterDirection.Input);
                collection.Add(pageSize);
           // }

            IDataParameter totalRecords = GetDBParameter(command, OtherParameters.TotalRecords, SearchObj.TotalRecords, ParameterDirection.Output);
            collection.Add(totalRecords);

            return collection;   
        }

        protected override ReadMapperBase<User> GetMapper()
        {
            ReadMapperBase<User> mapper = new ReadUserMapper();
            return mapper;
        }
    }
}
