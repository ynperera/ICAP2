using System.Web;
using System.Web.Optimization;

namespace ICGROUP.CAMPAIGN_MANAGER
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js", "~/Scripts/jquery.onoff.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));


            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/boilerplate-en.css",
                "~/Content/menu-en.css"
                , "~/Content/style-en.css",
                "~/Content/jquery.onoff.css"
             ));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));


            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                       "~/Scripts/Application/User/Login.js"));

            bundles.Add(new ScriptBundle("~/bundles/util").Include(
                        "~/Scripts/Application/Util/Layout.js",
                        "~/Scripts/Application/Util/Util.js",
                        "~/Scripts/Application/Util/Constants.js",
                         "~/Scripts/Application/Util/PrototypeExtensions.js",
                        "~/Scripts/Application/Util/DataStore.js"
                       ));

            bundles.Add(new ScriptBundle("~/bundles/campaign").Include(
                   "~/Scripts/Application/Campaign/Campaign.js",
                      "~/Scripts/Application/Campaign/Rule.js")

                   );

            bundles.Add(new ScriptBundle("~/bundles/service").Include(
            "~/Scripts/Application/Service/RequestGenerator.js",
            "~/Scripts/Application/Service/ResponseProcessor.js",
            "~/Scripts/Application/Service/Service.js",
            "~/Scripts/Application/Service/ServiceHandler.js"));

            bundles.Add(new ScriptBundle("~/bundles/grid").Include(
                       "~/Scripts/jquery.jqGrid.min.js",
                     "~/Scripts/grid.locale-en.js"
                       ));


            bundles.Add(new ScriptBundle("~/bundles/user").Include(
                   "~/Scripts/Application/User/Search.js",
                   "~/Scripts/Application/User/User.js"));

            // bundles.Add(new ScriptBundle("~/bundles/recaptcha").Include("https://www.google.com/recaptcha/api.js"));


        }
    }
}