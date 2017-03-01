var CAMPAIGN_MANAGER = CAMPAIGN_MANAGER ? CAMPAIGN_MANAGER : {};
CAMPAIGN_MANAGER.WEB = CAMPAIGN_MANAGER.WEB ? CAMPAIGN_MANAGER.WEB : {};


(function () {
    CAMPAIGN_MANAGER.WEB.CONFIG = {

        URL: {
            CAMPAIGN_ADD_URL: '/campaignService/campaign/add',
            CAMPAIGN_EDIT_URL: '/campaignService/campaign/edit',
            CAMPAIGN_GET_URL: '/campaignService/campaign/retrieve',
            CAMPAIGN_GET_ALL_URL: '/campaignService/campaign/retrieveAll',
            SECTION_ADD_URL: '/campaignService/campaign/add',
            SECTION_EDIT_URL: '/campaignService/campaign/edit',
            SECTION_DELETE_URL: '/campaignService/campaign/edit',
            SECTION_APPROVE_URL: '/campaignService/campaign/edit',
            COMMENT_ADD_URL: '/campaignService/campaign/edit',
            COMMENT_REMOVE_URL: '/campaignService/campaign/edit',

            //Users

            USER_SEARCH_URL: '/campaignService/user/search',
            USER_ADD_URL: '/campaignService/user/add',
            USER_EDIT_URL: '/campaignService/user/edit',
            USER_DELETE_URL: '/campaignService/user/delete',
            USER_SET_STATUS_URL: '/campaignService/user/setStatus',
            PASSWORD_RESET_REQUEST_BY_ADMIN_URL: '/campaignService/user/passwordResetRequestByAdmin',
            VALIDATE_PASSWORD_RESET_REQUEST_URL: '/campaignService/user/validatePasswordResetUrl',
            USER_RESET_PASSWORD_URL: '/campaignService/user/resetPassword',
            PASSWORD_RESET_REQUEST_BY_USER_URL: '/campaignService/user/passwordResetRequestByUser'

        },

        COMMON: {
            SEARCH_REQUEST_TIMEOUT: 60,
            CONTRIBUTION_REQ_TIMEOUT: 600
        }
    };

    CAMPAIGN_MANAGER.WEB.CONST = {
        STRING_CONST: {
            QUESTION: "?",
            EQUAL: "=",
            AMPERSAND: "&",
            EMPTY: "",
            PIPE: "|",
            UNDERSCORE: "_",
            FWD_SLASH: '/',
            COMMA: ',',
            SPACE: ' ',
            COMMA_SPACE: ', ',
            ASTERIX: '*',
            TILDE: '~',
            COLON: ':',
            SPACE_COLON_SPACE: ' : ',
            BACKWARD_SLASH: '\\',
            PERIOD: '.',
            BREAK: '<br>'
        },
        USER_ACTIVE_STATUS: {
            ACTIVE: '1',
            LOCKER: '0'
        },
        SERVICE_STATUS:{
            SUCCESS:1,
            FAILURE:0
        }
    };

    CAMPAIGN_MANAGER.WEB.META = {
        RequestType: {
            GET: 'GET',
            POST: 'POST'
        },
        SortOrder: {
            Ascending: 'asc',
            Descending: 'desc'
        },
        OperationType: {
            Insert: 'INSERT',
            Edit: 'EDIT',
            Delete: 'DELETE',
            View: 'VIEW'
        },

        StorageType: {
            Local: 'local',
            Session: 'session'
        },
        UserData: {
            UserId: 'USER_ID',
            SessionId: 'SESSION_ID',
            Email: 'EMAIL',
            UserData: 'USER_DATA',
            PermissionList: 'PERMISSION_LIST'
        },
        CacheKeys: {},
        MessageType: {
            Info: 'success',
            Warning: 'alert',
            Error: 'error'
        },
        URLParams: {
            Id: 'id'
        },
        Recaptcha: {
            siteKey: '6Lcb3hYUAAAAACGpvsVub5aIMCXvggB3s1qyhj6e',
            secretKey: '6Lcb3hYUAAAAAPi1ev4n8a1uvtN4bHrY_T5eFRfK'
        },
        Entitlements:{
            CreateUser:1,
            EditUser:2,
            ViewUserList:3
        }

    };
})();
