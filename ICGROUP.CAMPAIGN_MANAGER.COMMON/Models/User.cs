#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ICGROUP.CAMPAIGN_MANAGER.COMMON;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON.Models
{
    public class User
    {
        public int OrganizationId { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string OrganizationName { get; set; }        
        public UserTypes UserType { get; set; }
        public UserStatus Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public int RoleId { get; set; }  
    }
}