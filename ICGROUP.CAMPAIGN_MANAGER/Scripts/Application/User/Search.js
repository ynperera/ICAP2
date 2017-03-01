var Search = (function () {

    var USER_SORT_KEYS = {
        E: 'E',
        F: 'F',
        L: 'L',
        O: 'O',
        S: 'S',
        C: 'C'
    };

    var _currentSortOrder;
    var _currentSortKey;
    var _currentPageSize;
    var _currentPageIndex;
    var _currentSearchKey;


    var _addNewUser = function () {
        window.location.href = "/User/Create";
    };

    var _search = function (pageIndex, pageSize, sortKey, sortOrder, searchKey) {

        _setCurrentSearchPrams(pageIndex, pageSize, sortKey, sortOrder, searchKey);

        var searchObj = {
            PageSize: pageSize,
            PageIndex: pageIndex,
            SortDirection: sortOrder,
            SortKey: sortKey,
            SearchKey: searchKey
        }
        ServiceHandler.searchUsers(
            searchObj, function (data) {
                _populateData(data)
            }
        );
    }

    var _sort = function (sortKey) {

        if (_currentSortKey && USER_SORT_KEYS[sortKey] === _currentSortKey) {
            if (_currentSortOrder && _currentSortOrder === CAMPAIGN_MANAGER.WEB.META.SortOrder.Ascending) {

                _search(0, 10, _currentSortKey, CAMPAIGN_MANAGER.WEB.META.SortOrder.Descending);
            }
            else if (_currentSortOrder && _currentSortOrder === CAMPAIGN_MANAGER.WEB.META.SortOrder.Descending) {

                _search(0, 10, _currentSortKey, CAMPAIGN_MANAGER.WEB.META.SortOrder.Ascending);
            }
        }
        else {

            _search(0, 10, USER_SORT_KEYS[sortKey], CAMPAIGN_MANAGER.WEB.META.SortOrder.Ascending);
        }
    }

    var _initSearch = function () {
        _search(0, 10, USER_SORT_KEYS.E, CAMPAIGN_MANAGER.WEB.META.SortOrder.Ascending);

    }

    var _setUserStatus = function (userId, control) {
        var status = $("#" + control).is(':checked') ? 1 : 0;
        var statusObj = {
            userId: userId,
            statusId: status
        }
        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});

        ServiceHandler.setStatus(statusObj,
            function (data) {
                //check the status
                _showSuccessMsg('Successfully Inserted', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        );
    }

    var _editUser = function (userId) {
        window.location.href = "/User/Create?id=" + userId;
    };

    var _deleteUser = function (userId) {
        if (userId) {
            Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
            ServiceHandler.deleteUser(userId,
                function (data) {
                    if (data && data.Status && data.Status === CAMPAIGN_MANAGER.WEB.CONST.SERVICE_STATUS.SUCCESS) {
                        _showSuccessMsg('Successfully deleted user', CAMPAIGN_MANAGER.WEB.META.MessageType.Info);
                        $('#tr_' + userId).remove();
                    }
                    else
                        _showSuccessMsg('Failed to delete user', CAMPAIGN_MANAGER.WEB.META.MessageType.Error);
                }
            );
        }
    };

    var _showSuccessMsg = function (message, messageType) {
        if (messageType !== CAMPAIGN_MANAGER.WEB.META.MessageType.Error) {
            Util.View.showMessage('Info', message, messageType, {});
        } else {
            Util.View.showMessage('Error', message, messageType);
        }
    };

    var _populateData = function (userData) {
        if (userData && userData.Data) {
            $("#tbResults td").parent().remove();
            $.each(userData.Data, function (key, value) {
                var html;
                html = '<tr id="tr_' + value.UserId + '"> <td>' +
                value.Email +
                '</td> <td>' +
                value.FirstName +
                '</td> <td>' +
                value.LastName +
                '</td> <td>' +
                value.OrganizationName +
                '</td>' +
                '<td> <span></span>' +
                ' <input type="checkbox" id="chkActiveStatus_' + value.UserId + '" onchange="Search.setUserStatus( ' + value.UserId + ',\'chkActiveStatus_' + value.UserId +
                '\')"></span>  </td>' +
                '<td>' + value.CreatedDate + '</td>' +
                '<td> <input type="button" onclick="Search.editUser(' + value.UserId + ')" /> <input type="button" onclick="Search.deleteUser(' + value.UserId + ')" /> </td> </tr>';

                $('#tbResults').append(html);
            });
            $('input[type="checkbox"]').bootstrapToggle({ on: 'Active',
                off: 'Inactive' , size:'mini', width:100 });


            $('#divPagination').twbsPagination('destroy');
            $('#divPagination').twbsPagination({
                totalPages: (userData.TotalRecords % userData.PageSize) === 0 ? userData.TotalRecords / userData.PageSize : Math.round(userData.TotalRecords / userData.PageSize) + 1,
                visiblePages: 7,
                startPage: userData.PageIndex + 1,
                initiateStartPageClick: false,
                onPageClick: function (event, page) {
                    _search((page - 1), _currentPageSize, _currentSortKey, _currentSortOrder, _currentSearchKey);
                }
            });
        }
    };

    var _searchByKey = function () {

        var searchKey = $('#txtSearchText').val();

        if (searchKey) {
            _search(0, 10, USER_SORT_KEYS.E, CAMPAIGN_MANAGER.WEB.META.SortOrder.Ascending, searchKey);
        }
    }

    var _setPageSize = function () {
        var pageSize = $('#ddlPageSize').val();
        _search(0, pageSize, _currentSortKey, _currentSortOrder, _currentSearchKey);
    }

    var _setCurrentSearchPrams = function (pageIndex, pageSize, sortKey, sortOrder, searchKey) {
        if (pageIndex) {
            _currentPageIndex = pageIndex;
        }

        if (pageSize) {
            _currentPageSize = pageSize;
        }

        if (sortKey) {
            _currentSortKey = sortKey;
        }

        if (sortOrder) {
            _currentSortOrder = sortOrder;
        }

        _currentSearchKey = searchKey;

    }

    return {
        addNewUser: _addNewUser,
        search: _search,
        sort: _sort,
        initSearch: _initSearch,
        setUserStatus: _setUserStatus,
        editUser: _editUser,
        deleteUser: _deleteUser,
        searchByKey: _searchByKey,
        setPageSize: _setPageSize
    }
})();
