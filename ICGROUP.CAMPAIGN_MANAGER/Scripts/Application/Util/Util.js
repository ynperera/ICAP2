var Util = {
    Common: {
        logout: function () {
            DataStore.clearSessionData();
            window.location.href = "/Application/Index";
        },

        accessDenied: function () {
            window.location.href = "/Application/Index";
        },

        convertToJson: function (obj) {
            return JSON.stringify(obj);
        },

        convertFromJson: function (json) {
            return JSON.parse(json);
        }
    },
    View: {
        showMessage: function (title, body, messageType, options) {
            try {
                Util.View.closeMessage();
            } catch (e) {
                // discard the error
            }

            options = options ? options : {};
            var containerId = options.container ? options.container : 'master_popup_container';
            var popupContainer = $('div#' + containerId);
            var topIndex = Math.max(0, (($(window).height() - popupContainer.outerHeight()) / 4) /*+ $(window).scrollTop()*/);
            var leftIndex = Math.max(0, (($(window).width() - popupContainer.outerWidth()) / 2) /*+ $(window).scrollLeft()*/);

            popupContainer.css({
                'left': leftIndex + 'px',
                'top': topIndex + 'px',
                'position': 'fixed'
            });

            var popupDiv = popupContainer.find('div#master_popup_div');
            popupDiv.addClass(messageType);

            var titleSpan = popupContainer.find('span#msg_title_span');
            titleSpan.text(title);

            var msgDiv = popupContainer.find('div#msg_body_holder');
            msgDiv.html(body);

            options.callback = options.callback ? options.callback : Util.View.closeMessage;
            var okBtn = popupContainer.find('input#msg_popup_ok');
            okBtn.unbind('click');
            okBtn.bind('click', options.callback);

            var cancelBtn = popupContainer.find('input#msg_popup_cancel');
            if (options.enableCancel && cancelBtn) {
                cancelBtn.show();
            } else if (cancelBtn) {
                cancelBtn.hide();
            }

            if (options.disableOk && okBtn) {
                okBtn.hide();
            } else if (okBtn) {
                okBtn.show();
            }

            popupContainer.show();
        },

        showLoader: function (body, options) {
            try {
                Util.View.closeMessage();
            } catch (e) {
                // discard the error
            }

            options = options ? options : {};
            var containerId = options.container ? options.container : 'loading_popup_container';
            var popupContainer = $('div#' + containerId);
            var topIndex = Math.max(0, (($(window).height() - popupContainer.outerHeight()) / 4) /*+ $(window).scrollTop()*/);
            var leftIndex = Math.max(0, (($(window).width() - popupContainer.outerWidth()) / 2) /*+ $(window).scrollLeft()*/);

            popupContainer.css({
                'left': leftIndex + 'px',
                'top': topIndex + 'px',
                'position': 'fixed'
            });

            var msgDiv = popupContainer.find('div#loading_body_holder');
            msgDiv.html(body);
            popupContainer.show();
        },

        closeMessage: function () {
            var popupContainer = $('div#master_popup_container');
            var loadingContainer = $('div#loading_popup_container');
            if (popupContainer && popupContainer.length === 0) {
                popupContainer = $('div#login_popup_container');
            }
            var popupDiv = popupContainer.find('div#master_popup_div');
            var messageType = CAMPAIGN_MANAGER.WEB.META.MessageType;
            var allClasses = [messageType.Info, messageType.Warning, messageType.Error].join(CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST.SPACE);
            popupDiv.removeClass(allClasses);

            var titleSpan = popupContainer.find('span#msg_title_span');
            titleSpan.text(CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST.EMPTY);

            var msgDiv = popupContainer.find('div#msg_body_holder');
            msgDiv.html(CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST.EMPTY);

            var loadingDiv = loadingContainer.find('div#loading_body_holder');
            loadingDiv.html(CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST.EMPTY);

            var cancelBtn = popupContainer.find('input#msg_popup_cancel');
            if (cancelBtn) {
                cancelBtn.hide();
            }

            var okBtn = popupContainer.find('input#msg_popup_ok');
            if (okBtn) {
                okBtn.show();
            }

            popupContainer.hide();
            loadingContainer.hide();
        },

        showWarningMessage: function (title, warnings) {
            var warningMsg = ['<strong>', 'Please correct following errors', '</strong><span class="clearfix"></span><ul class="msg-list">'];
            $.each(warnings, function (key, val) {
                warningMsg[warningMsg.length] = '<li>';
                warningMsg[warningMsg.length] = val;
                warningMsg[warningMsg.length] = '</li>';
            });
            warningMsg[warningMsg.length] = '</ul>';
            Util.View.showMessage(title, warningMsg.join(''), CAMPAIGN_MANAGER.WEB.META.MessageType.Warning);
        },

        bindMessageCloseEvent: function () {
            var msgCloseBtn = $('input#msg_title_close');
            msgCloseBtn.unbind('click');
            msgCloseBtn.bind('click', Util.View.closeMessage);

            var msgCancelBtn = $('input#msg_popup_cancel');
            msgCancelBtn.unbind('click');
            msgCancelBtn.bind('click', Util.View.closeMessage);
        }
    },
    Url: {
        getUrlParamsByUrl: function (url, paramName) {
            url = url.replaceAll('&amp;', '&');
            var paramVal = undefined;
            var urlArray = url.split("?");
            var id = urlArray[1].split("&");
            $.each(id, function (key, param) {
                var paramComp = param.split("=");
                if (paramComp[0] === paramName) {
                    paramVal = paramComp[1];
                }
            });
            return paramVal;
        }
    },
    Validation: {
        validatePassword: function (password) {
            return /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,16}$/.test(password);
        },
        validateEmail: function (email) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        },
        isAvailable: function (str) {
            return (str !== undefined && str !== null && str.trim? str.trim() !== CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST.EMPTY:str !== CAMPAIGN_MANAGER.WEB.CONST.STRING_CONST.EMPTY);
        },
        isArrayAvailable: function (array) {
            return array !== undefined && array !== null && array.length > 0;
        }

    },
    Contribution: {
        isValidUserInsert: function (userObj) {
            var errors = []
            if (!Util.Validation.validateEmail(userObj.Email)) {
                errors[errors.length] = 'Invalid Email Address';
            }

            return errors;
        }
    }
}
