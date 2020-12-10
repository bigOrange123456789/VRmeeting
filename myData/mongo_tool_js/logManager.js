var logManager = (function (storage, time) {
    return {
        checkLog: function () {
            var logUser = storage.getItem('__logUser')
            return logUser ? logUser : false;
        },
        hasUser: function (name) {
            var user = storage.getUser(name);
            return user ? true : false;
        },
        registerIn: function (name, info) {
            if (this.hasUser(name)) {
                return false;
            } else {
                storage.addUser(name, info);
                return true;
            }
        },
        logIn: function (name, checked, token, _id, func) {
            // var user = storage.getUser(name);
            // if (!user) {
                var userInfo = {
                    name,
                    // logTimes: 0,
                    // lastLogTime: "",
                    // registerTime: utils.time.getTimeByDate(),
                    // email,
                    // password,
                    // log: false,
                    rememberPass: checked,
                    token,
                    _id
                };
                // if (!this.registerIn(name, userInfo)) {
                //     return false
                // }
                user = storage.getUser(name);
            // }
            storage.setItem('__logUser', name);
            storage.setItem('__lastUser', name);
            // user.logTimes++;
            // user.lastLogTime = time.getTimeByDate();
            // user.logIn = true;
            // user.rememberPass = checked;
            // user.token = token;
            storage.addUser(name, userInfo);
            if (typeof func === 'function') {
                func();
            }
            return true;
        },
        logOut: function (name, func) {
            var user = storage.getUser(name);
            if (this.hasUser(name)) {
                storage.setItem('__logUser', '');
                user.log = false;
                storage.addUser(name, user);
                func();
                return true;
            } else {
                return false;
            }
        },
        getPassward: function (name) {
            var user = storage.getUser(name);
            return user ? user.password : null;
        }
    }
}(utils.storage, utils.time))

//var url = "http://127.0.0.1:8068";
var url=myConstantURL;

var username = logManager.checkLog();
var storage = utils.storage;
// 注册
var smsToken = "";
// 免密登陆
var smsToken2 = "";
// 找回密码
var smsToken3 = "";