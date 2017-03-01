#region Using Directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public class UserList : SearchBase 
    {
        public Collection<User> Users { get; set; }
        public RequestStatus StatusCode { get; set; }
        public string StatusMessage { get; set; }
    }
}