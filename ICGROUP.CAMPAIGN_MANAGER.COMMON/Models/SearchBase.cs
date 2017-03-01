#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public abstract class SearchBase
    {        
        public int ActionId { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public string SortKey { get; set; }
        public string SortDirection { get; set; }
        public string SearchKey { get; set; }         
    }

    public class UserSearch : SearchBase
    {
        
    }
}
