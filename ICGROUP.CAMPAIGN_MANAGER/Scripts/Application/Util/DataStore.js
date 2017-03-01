var DataStore = (function () {
    var _addToStorageFromObj = function (key, valueObj, storageType) {
        var status = false;
        if (Util.Validation.isAvailable(key) && valueObj) {
            var valueString = Util.Common.convertToJson(valueObj);
            status = _addToStorageFromString(key, valueString, storageType);
        }
        return status;
    };

    var _addToStorageFromString = function (key, value, storageType) {
        var status = false;
        if (_isStorageAvailable() && Util.Validation.isAvailable(key) && Util.Validation.isAvailable(value)) {
            if (Util.Validation.isAvailable(storageType) && storageType === CAMPAIGN_MANAGER.WEB.META.StorageType.Local) {
                localStorage.setItem(key, value);
            } else {
                sessionStorage.setItem(key, value);
            }
            status = true;
        }
        return status;
    };

    var _getFromStorageAsObj = function (key, storageType) {
        var obj;
        var str = _getFromStorageAsString(key, storageType);
        if (Util.Validation.isAvailable(str)) {
            obj = Util.Common.convertFromJson(str);
        }
        return obj;
    };

    var _getFromStorageAsString = function (key, storageType) {
        var value;
        if (Util.Validation.isAvailable(key)) {
            if (Util.Validation.isAvailable(storageType) && storageType === CAMPAIGN_MANAGER.WEB.META.StorageType.Local) {
                value = localStorage.getItem(key);
            } else {
                value = sessionStorage.getItem(key);
            }
        }
        return value;
    };

    var _getFromStorageAsObj = function (key, storageType) {
        var obj;
        var str = _getFromStorageAsString(key, storageType);
        if (Util.Validation.isAvailable(str)) {
            obj = Util.Common.convertFromJson(str);
        }
        return obj;
    };

    var _isStorageAvailable = function () {
        return (typeof (Storage) !== "undefined");
    };

    var _clearSessionData = function () {
        if (_isStorageAvailable()) {
            sessionStorage.clear();
        }
    };

    var _addUserData = function (userData) {
        _addToStorageFromString(CAMPAIGN_MANAGER.WEB.META.UserData.UserId, userData.uid, CAMPAIGN_MANAGER.WEB.META.StorageType.Session);
        _addToStorageFromString(CAMPAIGN_MANAGER.WEB.META.UserData.SessionId, userData.sid, CAMPAIGN_MANAGER.WEB.META.StorageType.Session);
        _addToStorageFromString(CAMPAIGN_MANAGER.WEB.META.UserData.Email, userData.email, CAMPAIGN_MANAGER.WEB.META.StorageType.Session);
        _addToStorageFromObj(CAMPAIGN_MANAGER.WEB.META.UserData.PermissionList, userData.permission, CAMPAIGN_MANAGER.WEB.META.StorageType.Session);
    };

    var _getUserPermissionList = function () {
        _getFromStorageAsObj(CAMPAIGN_MANAGER.WEB.META.UserData.PermissionList, CAMPAIGN_MANAGER.WEB.META.StorageType.Session);
    }

    return {
        addUserData: _addUserData,
        clearSessionData: _clearSessionData,
        getUserPermissionList: _getUserPermissionList
    }
})();
