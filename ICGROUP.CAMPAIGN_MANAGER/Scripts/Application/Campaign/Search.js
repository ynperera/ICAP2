var CampaignSearch = (function () {
    var _searchData = function (infoType, firstSearch) {
        var errors = [];
        if (errors.length === 0) {
            $("#newsGroupTable").jqGrid('GridUnload');
            var reqParams = _getQueryParams(infoType);
            firstSearch = _populateDataTable(infoType, reqParams, firstSearch, true);
        } else {
            Util.View.showWarningMessage(Util.View.getLabelTexts('newsSearchTitle', CAMPAIGN_MANAGER.WEB.META.TextGroups.News), errors);
        }
        return firstSearch;
    };

    var _getQueryParams = function (infoType) {
        var reqParams = {};
        $.each(infoType.fieldList, function (key, val) {
            var value = val.value() && val.value().code ? val.value().code : "";    // groupList dropdown returns object with code and desc not the code
            if (Util.Validation.isAvailable(value)) {
                reqParams[val.name()] = value;
            }
        });
        return reqParams;
    };

    var _populateDataTable = function (infoType, reqParams, firstSearch, manualSearch) {
        var url, dataTable = $("#newsGroupTable");
        if (firstSearch) {
            var displayCols = StructureStore.getNewsGroupSearchDisplayColumns(infoType.code, DataStore.getLanguage());
            var key = [CAMPAIGN_MANAGER.WEB.META.StorageConst.NewsGroupMapping, DataStore.getLanguage(), CAMPAIGN_MANAGER.WEB.META.StorageParam.NewsGroupDisplayColumns].join(CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST.UNDERSCORE);
            DataStore.addToAppCache(key, displayCols);
            var colDef = Util.getDisplayColumnDefinition(displayCols);
            url = RequestGenerator.generateNewsByGroupIdUrl(reqParams);
            dataTable.jqGrid(
                {
                    url: url,
                    datatype: "json",
                    height: 'auto',
                    colNames: colDef.colNames,
                    colModel: colDef.colModel,
                    rowNum: CAMPAIGN_MANAGER.WEB.CONFIG.SEARCH_PARAM.NEWS_DEFAULT_PGS,
                    rowList: CAMPAIGN_MANAGER.WEB.CONFIG.COMMON.NEWS_SEARCH_ROWS_OPT,
                    gridview: true,
                    viewrecords: true,
                    loadonce: true,
                    altRows: true,
                    sortorder: 'asc',
                    sortname: 'ID',
                    manualSearch: manualSearch,                         // custom parameter to track user search button click event
                    loadBeforeSend: function (xhr, settings) {
                        _generateRequest(xhr, settings, dataTable);
                    },
                    loadComplete: function (data) {
                        if (data && data.userdata) { //reload data due to sorting
                            _setActionButtons(reqParams ? reqParams.NEWS_GROUP_LIST : '', infoType);
                        }
                        else if (data && data.DAT && data.DAT.NWSL) {
                            _processResponse(infoType.code, data, displayCols);
                            _setActionButtons(reqParams ? reqParams.NEWS_GROUP_LIST : '', infoType);

                        } else {
                            Util.View.showMessage(Util.View.getLabelTexts('newsSearchTitle', CAMPAIGN_MANAGER.WEB.META.TextGroups.News), Util.Common.getFDErrorStatus(data), CAMPAIGN_MANAGER.WEB.META.MessageType.Error);
                        }

                    },
                    loadError: function () {
                        Util.View.showMessage(Util.View.getLabelTexts('newsSearchTitle', CAMPAIGN_MANAGER.WEB.META.TextGroups.News), Util.View.getMessageTexts('newsSearchFailed', CAMPAIGN_MANAGER.WEB.META.TextGroups.News), CAMPAIGN_MANAGER.WEB.META.MessageType.Error);
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
        return firstSearch;
    };

    var _generateRequest = function (xhr, settings, dataTable) {
        var manualSearch = dataTable.jqGrid('getGridParam', 'manualSearch');
        var url = settings.url;
        settings.url = Util.Url.modifySearchUrl(url, manualSearch);
        if (manualSearch) {
            dataTable.setGridParam({manualSearch: false});
        }
    };

    var _processResponse = function (infoType, data, displayCols) {

        var noOfRecords = parseInt(data.ROW.NWSL, 10);

        var currentPage = parseInt(data.PGI.NWSL, 10) + 1;

        var pageSize = parseInt(data.PGS.NWSL, 10);
        var noOfPages = Math.ceil(noOfRecords / pageSize);
        noOfPages = noOfPages > 0 ? noOfPages : 1;
        var dataArray = _generateDataArray(infoType, data, displayCols);
        var jqResponse = {
            noOfPages: noOfPages,
            currentPage: currentPage,
            noOfRecords: noOfRecords,
            dataParameter: dataArray
        };
        $("#newsGroupTable")[0].addJSONData(jqResponse);
    };

    var _generateDataArray = function (infoType, data, displayCols) {
        var dataArray = [], idList = [];

        var dataSet = data.DAT.NWSL;

        var hedSet = data.HED.NWSL;
        var stringConst = CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST;

        var hedOp = [stringConst.PIPE, CAMPAIGN_MANAGER.WEB.META.OperationType.Edit, stringConst.PIPE, CAMPAIGN_MANAGER.WEB.META.OperationType.Delete].join(stringConst.EMPTY);
        hedSet = [hedSet, hedOp].join(stringConst.EMPTY);

        $.each(displayCols, function (key, val) {
            idList[idList.length] = val.id;
        });
        var colIdList = hedSet.split(stringConst.PIPE).indicesOf(idList);

        $.each(dataSet, function (i, item) {
            var entryArray = item.split(stringConst.PIPE);
            var showArray = [];

            $.each(displayCols, function (key, val) {
                var dataIndex = colIdList[val.id];
                showArray[showArray.length] = entryArray[dataIndex];
            });

            dataArray[dataArray.length] = {
                rowId: i,
                rowData: showArray
            };
        });
        return dataArray;
    };

    var _setActionButtons = function (newsGroupID, infoType) {
        var tagButtons = $("input[name=newsGrpTagDeltBtn]");
        tagButtons.attr('newsGroupID', newsGroupID);
        tagButtons.each(function () {
            $(this).click(function () {
                NewsGroupSearchContributionHelper.deleteFromGroup($(this).attr("dataString"), $(this).attr("newsGroupID"), infoType);
            });
        });

    };

    var _checkNewsGroupTagPermission = function () {
        var isTagEnable = false;
        var permissionList = DataStore.getPermissionList();
        var newsGroupTagDeletePermission = permissionList[CAMPAIGN_MANAGER.WEB.META.Forms.NewsGroupUpdate];
        if (newsGroupTagDeletePermission) {
            if (newsGroupTagDeletePermission.indexOf(CAMPAIGN_MANAGER.WEB.META.ActionType.Contribution) > -1) {
                isTagEnable = true;
            }
        }
        return isTagEnable;
    };

    return {
        searchNewsData: function (infoType, firstSearch) {
            return _searchData(infoType, firstSearch);
        },
        checkNewsGroupTagPermission: function (infoType, firstSearch) {
            return _checkNewsGroupTagPermission();
        }

    }
})();
