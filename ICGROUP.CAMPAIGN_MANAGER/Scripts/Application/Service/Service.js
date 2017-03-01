Service = (function () {

    var _callService = function (param) {
        try {
            var req = {
                type: param.type ? param.type : CAMPAIGN_MANAGER.WEB.META.RequestType.GET,
                url: param.url,
                timeout: (param.timeout ? param.timeout : (CAMPAIGN_MANAGER.WEB.CONFIG.COMMON.SEARCH_REQUEST_TIMEOUT ? CAMPAIGN_MANAGER.WEB.CONFIG.COMMON.SEARCH_REQUEST_TIMEOUT : 60)) * 1000,
                success: function (e) {
                    if ($.isFunction(param.sfn)) {
                        param.sfn(e);
                    }
                },
                error: function (e) {
                    if ($.isFunction(param.ffn)) {
                        param.ffn(e);
                    }
                }
            };
            if (param.data) {
                req.data = param.data;
            }
            if (param.processData) {
                req.processData = param.processData;
            }
            if (param.cache) {
                req.cache = param.cache;
            }
            if (param.dataType) {
                req.dataType = param.dataType;
            }
            if (param.contentType) {
                req.contentType = param.contentType;
            }
            if (param.async) {
                req.async = param.async;
            }
            $.ajax(req);
        } catch (e) {
            if ($.isFunction(param.ffn)) {
                param.ffn({});
            }
        }
    };



    return {
        callService: function (param) {
            _callService(param);
        }


    }
})();
