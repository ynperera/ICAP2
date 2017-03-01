#region Using Directives

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON
{
    public class Utility
    {
        public static bool IsValidStringField(string stringToValidate)
        {
            if (!string.IsNullOrEmpty(stringToValidate) && (!string.IsNullOrWhiteSpace(stringToValidate)))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool IsValidEmailField(string emailToValidate)
        {
            if (!string.IsNullOrEmpty(emailToValidate) && (!string.IsNullOrWhiteSpace(emailToValidate)))
            {
                if (emailToValidate.Contains('@')) 
                {
                    return true;
                }
                return false;
            }
            else
            {
                return false;
            } 
        }

        public static bool IsValidIntegerField(int numberToValidate)
        {
            if (numberToValidate < 0)
            {                
                return false;
            }
            else
            {
                return true;
            }
        }            
    }
}
