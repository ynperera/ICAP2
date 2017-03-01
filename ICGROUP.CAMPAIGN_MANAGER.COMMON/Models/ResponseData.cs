#region Using Directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Text;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public class ResponseData
    {
        public string Id { get; set; }
        public RequestStatus StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public object Data { get; set; }
    }

    public class ReaderResponseData:ResponseData
    {

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public string SortKey { get; set; }
        public string SortDirection { get; set; }
        public string SearchKey { get; set; }     
        
    }
}
