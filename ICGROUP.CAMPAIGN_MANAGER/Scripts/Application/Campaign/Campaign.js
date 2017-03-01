var Campaign = (function () {
    var _initialize = function () {
        if (document.URL.contains("?id")) {
            var campaignId = Util.Url.getUrlParamsByUrl(document.URL, CAMPAIGN_MANAGER.WEB.META.URLParams.Id);
            ServiceHandler.getCampaign(campaignId, function (data) {
                _populateCampaign(data)
            });
        }
    };

    var _populateCampaign = function (data) {
        //Check whether user can edit data

    }

    var _addCampaign = function () {
        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
        var campaignObj = {
            title: $('#title').val(),
            launchDate: $('#txtLaunchDate').val(),
            country: $('#ddlCountry').val(),
            type: $('#ddlType').val()
        };
        ServiceHandler.addCampaign(campaignObj,
            function (data) {
                _showSuccessMsgAdd('Successfully Updated', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        );
    };

    var _successCallback = function () {
        //TODO: Append  id/guid  of campaign to the end
        window.location.href = "/Campaign/Edit?id=" + '1';
    }

    var _showSuccessMsgAdd = function (message, messageType) {
        var callbackFn = _successCallback;
        if (messageType !== CAMPAIGN_MANAGER.WEB.META.MessageType.Error) {
            Util.View.showMessage('Info', message, messageType, {
                callback: callbackFn
            });
        } else {
            Util.View.showMessage('Error', message, messageType);
        }
    };

    var _showSuccessMsgEdit = function (message, messageType) {
        if (messageType !== CAMPAIGN_MANAGER.WEB.META.MessageType.Error) {
            Util.View.showMessage('Info', message, messageType);
        } else {
            Util.View.showMessage('Error', message, messageType);
        }
    };

    var _editCampaign = function () {
        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
        var campaignObj = {
            title: $('#title').val(),
            launchDate: $('#txtLaunchDate').val(),
            country: $('#ddlCountry').val(),
            type: $('#ddlType').val()
        };
        ServiceHandler.editCampaign(campaignObj,
            function (data) {
                _showSuccessMsgEdit('Successfully Updated', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        );
    };

    var _search = function () {
        var dataTable = $("#newsGroupTable");
        dataTable.jqGrid('GridUnload');
        url = CAMPAIGN_MANAGER.WEB.CONFIG.URL.CAMPAIGN_GET_ALL_URL;
        dataTable.jqGrid(
            {
                url: url,
                datatype: "json",
                height: 'auto',
                colNames: ['Inv No', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'],
                colModel: [{name: 'id', index: 'id', width: 55}, {
                    name: 'invdate',
                    index: 'invdate',
                    width: 90
                }, {name: 'name', index: 'name asc, invdate', width: 100}, {
                    name: 'amount',
                    index: 'amount',
                    width: 80,
                    align: "right"
                }, {name: 'tax', index: 'tax', width: 80, align: "right"}, {
                    name: 'total',
                    index: 'total',
                    width: 80,
                    align: "right"
                }, {name: 'note', index: 'note', width: 150, sortable: false}],
                rowNum: 10,
                //  rowList: CAMPAIGN_MANAGER.WEB.CONFIG.COMMON.NEWS_SEARCH_ROWS_OPT,
                gridview: true,
                viewrecords: true,
                loadonce: true,
                altRows: true,
                sortorder: 'asc',
                sortname: 'ID',
                // manualSearch: manualSearch,                         // custom parameter to track user search button click event
                loadBeforeSend: function (xhr, settings) {
                    alert(' loadBeforeSend');
                },
                loadComplete: function (data) {
                    alert('loadComplete');
                },
                loadError: function () {
                    alert('loadError');
                },
                jsonReader: {
                    root: "dataParameter",
                    page: "currentPage",
                    total: "noOfPages",
                    records: "noOfRecords",
                    cell: "rowData",
                    id: "rowId"
                }
            });

    }

    return {
        init: _initialize,
        addCampaign: _addCampaign,
        editCampaign: _editCampaign,
        search: _search
    }
})();
