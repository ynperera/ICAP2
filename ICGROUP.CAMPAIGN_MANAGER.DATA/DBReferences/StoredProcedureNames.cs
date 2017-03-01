#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.DATA.DBReferences
{
    internal static class StoredProcedureNames
    {
        internal const string SP_ADD_USER = "USERS_ADD";
        internal const string SP_EDIT_USER = "USERS_UPDATE";
        internal const string SP_DELETE_USER = "USERS_DELETE";
        internal const string SP_SEARCH_USER = "USERS_GET";
        internal const string SP_SEARCH_USER_LIST = "USERS_SEARCH";
        internal const string SP_SET_USER_STATUS = "USERS_SET_STATUS";
    }
}
