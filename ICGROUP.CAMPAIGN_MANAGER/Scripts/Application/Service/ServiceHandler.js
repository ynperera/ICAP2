var ServiceHandler = (function () {

    var _callService = function (dataObject, successFn, errorFn, url, type) {
        Service.callService({
            url: url,
            data: dataObject,
            type: type,
            timeout: CAMPAIGN_MANAGER.WEB.CONFIG.COMMON.CONTRIBUTION_REQ_TIMEOUT,
            sfn: function (e) {
                successFn(e);
            },
            ffn: function (e) {
                Util.View.showMessage('Error', 'Service Failure', CAMPAIGN_MANAGER.WEB.META.MessageType.Error);
                if ($.isFunction(errorFn)) {
                    errorFn(e);
                }
            }
        });
    };

    var _addCampaign = function (campaignObj, successFn, errorFn) {
        _callService(campaignObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.CAMPAIGN_ADD_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _editCampaign = function (campaignObj, successFn, errorFn) {
        _callService(campaignObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.CAMPAIGN_EDIT_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _getCampaign = function (campaignId, successFn, errorFn) {
        _callService(campaignId, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.CAMPAIGN_GET_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _addSection = function (sectionObj, successFn, errorFn) {
        _callService(sectionObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.SECTION_ADD_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _editSection = function (sectionObj, successFn, errorFn) {
        _callService(sectionObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.SECTION_EDIT_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _deleteSection = function (sectionId, successFn, errorFn) {
        _callService(sectionId, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.SECTION_DELETE_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _approveSection = function (sectionId, successFn, errorFn) {
        _callService(sectionId, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.SECTION_APPROVE_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _addComment = function (commentObj, successFn, errorFn) {
        _callService(commentObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.COMMENT_ADD_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _deleteComment = function (commentId, successFn, errorFn) {
        _callService(commentId, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.COMMENT_REMOVE_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _searchUsers = function (userSearchObj, successFn, errorFn) {
        _callService(userSearchObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.USER_SEARCH_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _addUser = function (userObj, successFn, errorFn) {
        _callService(userObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.USER_ADD_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _editUser = function (userObj, successFn, errorFn) {
        _callService(userObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.USER_EDIT_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _setStatus = function (userStatusObj, successFn, errorFn) {
        _callService(userStatusObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.USER_SET_STATUS_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _deleteUser = function (userId, successFn, errorFn) {
        _callService(userId, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.USER_DELETE_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _requestPasswordResetByAdmin = function (userId, successFn, errorFn) {
        _callService(userId, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.PASSWORD_RESET_REQUEST_BY_ADMIN_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _validatePasswordResetRequest = function (id, successFn, errorFn) {
        _callService(id, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.VALIDATE_PASSWORD_RESET_REQUEST_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _resetPassword = function (userResetObj, successFn, errorFn) {
        _callService(userResetObj, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.USER_RESET_PASSWORD_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    var _requestPasswordResetByUser = function (email, successFn, errorFn) {
        _callService(email, successFn, errorFn, CAMPAIGN_MANAGER.WEB.CONFIG.URL.PASSWORD_RESET_REQUEST_BY_USER_URL, CAMPAIGN_MANAGER.WEB.META.RequestType.POST);
    };

    return {
        addCampaign: _addCampaign,
        editCampaign: _editCampaign,
        getCampaign: _getCampaign,
        addSection: _addSection,
        editSection: _editSection,
        deleteSection: _deleteSection,
        approveSection: _approveSection,
        addComment: _addComment,
        deleteComment: _deleteComment,
        searchUsers: _searchUsers,
        addUser: _addUser,
        editUser: _editUser,
        setStatus: _setStatus,
        deleteUser: _deleteUser,
        requestPasswordResetByAdmin: _requestPasswordResetByAdmin,
        validatePasswordResetRequest: _validatePasswordResetRequest,
        resetPassword: _resetPassword,
        requestPasswordResetByUser: _requestPasswordResetByUser
    }
})();





