var Layout = (function () {
    var initialize = function () {

        var mainLinkDiv = $('div#main_link_div');
        var hrefHome = mainLinkDiv.find('#hrefHome');
        hrefHome.text('Home');
        hrefHome.attr('href', '/Application/Home');

        var hrefLogout = mainLinkDiv.find('#hrefLogout');
        hrefLogout.text('Logout');
        hrefLogout.unbind('click');
        hrefLogout.bind('click', Util.Common.logout);

        //TODO:Get Permission
        var permissionList;

        var hrefMenuDashboard= mainLinkDiv.find('#menu_dashboard');
        hrefMenuDashboard.text("Dashboard");

        var hrefMenuCampaigns = mainLinkDiv.find('#menu_campaigns');
        hrefMenuCampaigns .text("Campaigns");

        var hrefMenuTemplates = mainLinkDiv.find('#menu_legal_tempaltes');
        hrefMenuTemplates .text("Legal Templates");

        var hrefMenuPeople = mainLinkDiv.find('#menu_people');
        hrefMenuPeople.text("People");


        var hrefMenuSupport = mainLinkDiv.find('#menu_support');
        hrefMenuSupport.text("Support");






     //   var hrefMenuCampaign = mainLinkDiv.find('#menu_campaign');
     //   hrefMenuCampaign.text("Campaign");

    //    var subMenuCampaign = $('#submenu_campaign');
    //    _appendLinkPermitted(subMenuCampaign, permissionList, '/Campaign/Create/', {formLabel: 'Create'});
    //    _appendLinkPermitted(subMenuCampaign, permissionList, '/Campaign/Search/', {formLabel: 'Search'});


    };

    var _appendLinkPermitted = function (subMenuUl, permissionList, url, options) {
        //TODO:Check Permission
        subMenuUl.append('<li><a href="' + url + '">' + options.formLabel + '</a></li>');
    };

    return {
        init: initialize
    }
})();
