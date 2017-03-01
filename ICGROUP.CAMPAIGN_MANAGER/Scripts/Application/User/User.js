var User = (function () {

    var _saveUser = function () {
        if (document.URL.contains("?id")) {
            var userId = Util.Url.getUrlParamsByUrl(document.URL, CAMPAIGN_MANAGER.WEB.META.URLParams.Id);
            Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
            var userObj = {
                UserId: userId,
                Email: $('#txtEmail').val(),
                FirstName: $('#txtFirstName').val(),
                LastName: $('#txtLastName').val(),
                OrganizationId: $('#ddlOrganization').val(),
                RoleId: $('#ddlRole').val()
            };
            ServiceHandler.editUser(userObj,
                function (data) {
                    if (data && data.Status && data.Status === CAMPAIGN_MANAGER.WEB.CONST.SERVICE_STATUS.SUCCESS) {
                        _showSuccessMsg('User edited successfully', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
                    }
                    else {
                        _showSuccessMsg('Failed to edit user', CAMPAIGN_MANAGER.WEB.META.MessageType.Error)
                    }
                }
            );
        }
        else {
            var userObj = {
                Email: $('#txtEmail').val(),
                FirstName: $('#txtFirstName').val(),
                LastName: $('#txtLastName').val(),
                OrganizationId: $('#ddlOrganization').val(),
                RoleId: $('#ddlRole').val()
            };
            var errors = Util.Contribution.isValidUserInsert(userObj);
            if (errors.length === 0) {
                Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
                ServiceHandler.addUser(userObj,
                    function (data) {
                        if (data && data.Status && data.Status === CAMPAIGN_MANAGER.WEB.CONST.SERVICE_STATUS.SUCCESS) {
                            _showSuccessMsg('User created successfully', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
                        }
                        else {
                            _showSuccessMsg('Failed to create user', CAMPAIGN_MANAGER.WEB.META.MessageType.Error)
                        }
                    }
                );
            }
            else {
                Util.View.showWarningMessage('Create User', errors);
            }
        }
    };

    var _successCallback = function () {
        window.location.href = "/User/Search";
    };

    var _showSuccessMsg = function (message, messageType) {
        var callbackFn = _successCallback;
        if (messageType !== CAMPAIGN_MANAGER.WEB.META.MessageType.Error) {
            Util.View.showMessage('Info', message, messageType, {
                callback: callbackFn
            });
        } else {
            Util.View.showMessage('Error', message, messageType);
        }
    };

    var _sendPasswordResetRequest = function () {
        if (document.URL.contains("?id")) {
            var userId = Util.Url.getUrlParamsByUrl(document.URL, CAMPAIGN_MANAGER.WEB.META.URLParams.Id);
            Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
            ServiceHandler.requestPasswordResetByAdmin(userId,
                function (data) {
                    //check the status
                    _showSuccessMsg('Password Reset Request Sent Successfully', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
                }
            );
        }
    };

    var _sendPasswordResetRequestByUser = function () {
        var email = $('#txtEmail').val();
        if (email) {
            Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
            ServiceHandler.requestPasswordResetByUser(email,
                function (data) {
                    //check the status
                    _showSuccessMsg('Password Reset Request Sent Successfully', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
                }
            );
        }
    };

    var _validatePasswordResetUrl = function () {
        if (document.URL.contains("?id")) {
            var requestId = Util.Url.getUrlParamsByUrl(document.URL, CAMPAIGN_MANAGER.WEB.META.URLParams.Id);
            ServiceHandler.validatePasswordResetRequest(requestId,
                function (data) {
                    if (data && data.Status && data.Status === CAMPAIGN_MANAGER.WEB.CONST.SERVICE_STATUS.SUCCESS) {
                        $('#divPasswordReset').show();
                    }
                    else {
                        $('#divInvalidUrl').show();
                    }
                });
        }
    };

    var _resetPassword = function () {
        var callbackFn = _redirectToLoginPage;
        if (document.URL.contains("?id")) {
            var password = $('#txtPassword').val();
            var confirmPassword = $('#txtConfirmPassword').val();

            if (password === confirmPassword) {
                if (Util.Validation.validatePassword(password)) {
                    var userResetObj = {
                        id: Util.Url.getUrlParamsByUrl(document.URL, CAMPAIGN_MANAGER.WEB.META.URLParams.Id),
                        password: password
                    }
                    Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
                    ServiceHandler.resetPassword(userResetObj,
                        function (data) {
                            //check the status
                            _showSuccessMsg('Password Reset Successfully', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
                            {
                                callback:callbackFn
                            }
                        }
                    );
                }
            }
            else {
                //show error msg
            }
        }
    };

    var _redirectToLoginPage = function () {
        window.location.href = '/Application/Index';
    }

    var _init = function () {

       /* var permissionList = DataStore.getUserPermissionList();
        if (permissionList && ( permissionList.indexOf(CAMPAIGN_MANAGER.WEB.META.Entitlements.CreateUser) > 0 || permissionList.indexOf(CAMPAIGN_MANAGER.WEB.META.Entitlements.EditUser) > 0)) {*/
            if (document.URL.contains("?id")) {

                $('#divUserFormTitle').text('Edit User Details');
                $('#btnResetPassword').show();
                $('#btnSaveUSer').val('Save');
            }
            else {

                $('#divUserFormTitle').text('Create New User');
                $('#btnResetPassword').hide();
                $('#btnSaveUSer').val('Create User');
            }
        /*}
        else {
            Util.Common.accessDenied();
        }*/
    };

    return {
        saveUser: _saveUser,
        init: _init,
        sendPasswordResetRequest: _sendPasswordResetRequest,
        validatePasswordResetUrl: _validatePasswordResetUrl,
        resetPassword: _resetPassword,
        sendPasswordResetRequestByUser: _sendPasswordResetRequestByUser
    }
})();
