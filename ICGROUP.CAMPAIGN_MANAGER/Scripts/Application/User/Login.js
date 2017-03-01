var Login = (function () {
    var login = function () {
        //Add s aervice call to authenticate data

        var userObj={
            uid:1,
            sid:'23SDF4dDGFG55FG544FSG555GFGtg',
            email:'a@a.com',
            permission:[1,2,3]
        }
        DataStore.addUserData(userObj);
        window.location.href = "/Application/Home";
    };
    return {
        loginUser: login
    }
})();
