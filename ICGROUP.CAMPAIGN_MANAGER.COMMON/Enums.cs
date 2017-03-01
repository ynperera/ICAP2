using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON
{
    public enum UserTypes
    { 
        Admin = 1,
        Internal = 2,
        External = 3
    }

    public enum UserStatus
    {
        Active = 1,
        Inactive = 0 
    }

    public enum RequestStatus
    {
        Success = 1,
        Failure = 0
    }

    public enum ParamDirection
    {
        Acs,
        Desc
    }  
}
