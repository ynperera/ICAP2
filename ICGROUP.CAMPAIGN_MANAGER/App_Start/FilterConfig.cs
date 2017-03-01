using System.Web;
using System.Web.Mvc;

namespace ICGROUP.CAMPAIGN_MANAGER
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}