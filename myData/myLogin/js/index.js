window.onload = function () {
    function loginSuccess(){
                window.location.href='../myAvatarSelect/avatarSelect.html';		
    }

    /* 首页DOM */
    // 登录/注册tab
    var loginRegister = getDom("login-register");
    // --登录按钮
    var loginSpan = getDom("login-span");
    // --注册按钮
    var registerSpan = getDom("register-span");
    // 用户/注销tab
    var userLogout = getDom("user-logout");
    // --用户按钮
    var userSpan = getDom("user-span");
    // --注销按钮
    var logoutSpan = getDom("logout-span");

    /* 弹窗DOM */
    // 弹窗
    var wrap = getDom("wrap");
    // 弹窗关闭按钮
    var indexClose = getDom("index-close");
    //同时只有一个显示
    // 普通登录页
    var defaultLogin = getDom("login");

    // 注册页
    var registerPage = getDom("register");
    // 找回密码页
    var forgetPage = getDom("forget");
    // 记住密码checkbox
    var loginRemember = getDom("login-remember");

    /* 账号登录页DOM */
    var loginType = "phone";
    // 免密登录
    var loginMethodCode = getDom("login-method-code");
    // 手机登录
    var loginMethodPhone = getDom("login-method-phone");
    // 邮箱登录
    var loginMethodMail = getDom("login-method-mail");
    // 免密登录信息框
    var loginInputCode = getDom("login-input-code");
    // --手机号
    var loginCodePhoneInput = getDom("login-code-phone-input");
    // --手机号提示
    var loginCodePhoneTip = getDom("login-code-phone-tip");
    // --验证码
    var loginCodeCodeInput = getDom("login-code-code-input");
    // --验证码提示
    var loginCodeCodeTip = getDom("login-code-code-tip");
    // --获取验证码
    var loginCodeCodeGet = getDom("login-code-code-get");
    // 手机登录信息框
    var loginInputPhone = getDom("login-input-phone");
    // --手机号
    var loginPhonePhoneInput = getDom("login-phone-phone-input");
    // --手机号提示
    var loginPhonePhoneTip = getDom("login-phone-phone-tip");
    // --密码
    var loginPhonePwdInput = getDom("login-phone-pwd-input");
    // --密码提示
    var loginPhonePwdTip = getDom("login-phone-pwd-tip");
    // 邮箱登录信息框
    var loginInputMail = getDom("login-input-mail");
    // --邮箱
    var loginMailMailInput = getDom("login-mail-mail-input");
    // --邮箱提示
    var loginMailMailTip = getDom("login-mail-mail-tip");
    // --密码
    var loginMailPwdInput = getDom("login-mail-pwd-input");
    // --密码提示
    var loginMailPwdTip = getDom("login-mail-pwd-tip");
    // 忘记密码?按钮
    var goForget = getDom("go-forget");
    // 去注册按钮
    var goRegister = getDom("go-register");
    // 登录按钮
    var loginButton = getDom("login-button");



    /* 账号注册页DOM */
    var registerType = "phone";
    // 手机注册
    var registerMethodPhone = getDom("register-method-phone");
    // 邮箱注册
    var registerMethodMail = getDom("register-method-mail");
    // 手机注册信息框
    var registerInputPhone = getDom("register-input-phone");
    // --手机号
    var registerPhonePhoneInput = getDom("register-phone-phone-input");
    // --手机号提示
    var registerPhonePhoneTip = getDom("register-phone-phone-tip");
    // --验证码
    var registerPhoneCodeInput = getDom("register-phone-code-input");
    // --验证码提示
    var registerPhoneCodeTip = getDom("register-phone-code-tip");
    // --获取验证码
    var registerPhoneCodeGet = getDom("register-phone-code-get");
    // --密码
    var registerPhonePwdInput = getDom("register-phone-pwd-input");
    // --密码提示
    var registerPhonePwdTip = getDom("register-phone-pwd-tip");
    // 邮箱注册信息框
    var registerInputMail = getDom("register-input-mail");
    // --邮箱
    var registerMailMailInput = getDom("register-mail-mail-input");
    // --邮箱提示
    var registerMailMailTip = getDom("register-mail-mail-tip");
    // --密码
    var registerMailPwdInput = getDom("register-mail-pwd-input");
    // --密码提示
    var registerMailPwdTip = getDom("register-mail-pwd-tip");
    // 注册按钮
    var registerButton = getDom("register-button");
    // 已有账号,去登陆
    var switchLoginFromRegister = getDom("switch-login-from-register");

    /* 找回密码页DOM */
    var forgetType = "phone";
    // 手机找回
    var forgetMethodPhone = getDom("forget-method-phone");
    // 邮箱找回
    var forgetMethodMail = getDom("forget-method-mail");
    // 手机找回信息框
    var forgetInputPhone = getDom("forget-input-phone");
    // --手机号
    var forgetPhonePhoneInput = getDom("forget-phone-phone-input");
    // --手机号提示
    var forgetPhonePhoneTip = getDom("forget-phone-phone-tip");
    // --验证码
    var forgetPhoneCodeInput = getDom("forget-phone-code-input");
    // --验证码提示
    var forgetPhoneCodeTip = getDom("forget-phone-code-tip");
    // --获取验证码
    var forgetPhoneCodeGet = getDom("forget-phone-code-get");
    // --密码
    var forgetPhonePwdInput = getDom("forget-phone-pwd-input");
    // --密码提示
    var forgetPhonePwdTip = getDom("forget-phone-pwd-tip");
    // 邮箱找回信息框
    var forgetInputMail = getDom("forget-input-mail");
    // --邮箱
    var forgetMailMailInput = getDom("forget-mail-mail-input");
    // --邮箱提示
    var forgetMailMailTip = getDom("forget-mail-mail-tip");
    // --密码
    // var forgetMailPwdInput = getDom("forget-mail-pwd-input");
    // --密码提示
    // var forgetMailPwdTip = getDom("forget-mail-pwd-tip");
    // 找回按钮
    var forgetButton = getDom("forget-button");
    // 返回登录
    var switchLoginFromForget = getDom("switch-login-from-forget");

    function showLoginRegister() {
        setDisplayNone(userLogout);
        setDisplayBlock(loginRegister);
    }

    function showUserLogout() {
        setDisplayNone(loginRegister);
        setDisplayBlock(userLogout);
    }

    function showDefaultLoginPage() {

        setDisplayNone(registerPage);
        setDisplayNone(forgetPage);
        setDisplayBlock(defaultLogin);
    }

    function showRegisterPage() {
        setDisplayNone(defaultLogin);
        setDisplayNone(forgetPage);
        setDisplayBlock(registerPage);
    }

    function showForgetPage() {
        setDisplayNone(defaultLogin);
        setDisplayNone(registerPage);
        setDisplayBlock(forgetPage);
    }
    
    if (username) {
        var user = storage.getUser(username);
        if (user && sessionStorage.getItem('loged')) {
            utils.storage.addUser(username, user);
            showUserLogout();
        } else if (user && user.rememberPass) {
            var data = {
                token: user.token || "",
            };
            (async () => {
                var refreshResult = await asyncAxios.get(url + '/user/refresh', data);
                if (!refreshResult.error) {
                    user.token = refreshResult.token;
                    utils.storage.addUser(username, user);
                    showUserLogout();
                } else {
                    console.log(refreshResult.error);
                }
            })();
        }
    }
wrap.style.display = "block";//////////////////////显示登录窗口////////////////////////////////
showDefaultLoginPage();///////////////////////
    loginSpan.onclick = function () {
        setDisplayBlock(wrap);
        showDefaultLoginPage();
    }
    registerSpan.onclick = function () {
        setDisplayBlock(wrap);
        showRegisterPage();
    }
    userSpan.onclick = function () {
        window.location = "info.html"
    }
    logoutSpan.onclick = function () {
        logManager.logOut(username, () => {
            showLoginRegister();
            location = "index.html";
            sessionStorage.removeItem('loged');
        });
    }

    indexClose.onclick = function () {
        setDisplayNone(wrap);
    }



    switchLoginFromRegister.onclick = function () {
        showDefaultLoginPage();
    }
    switchLoginFromForget.onclick = function () {
        showDefaultLoginPage();
    }

    goForget.onclick = function () {
        showForgetPage();
    }
    goRegister.onclick = function () {
        showRegisterPage();
    }

    loginMethodCode.onclick = function () {
        loginType = "code";
        removeActive(loginMethodPhone);
        removeActive(loginMethodMail);
        addActive(loginMethodCode);
        setDisplayNone(loginInputPhone);
        setDisplayNone(loginInputMail);
        setDisplayBlock(loginInputCode);
    }

    loginMethodPhone.onclick = function () {
        loginType = "phone";
        removeActive(loginMethodCode);
        removeActive(loginMethodMail);
        addActive(loginMethodPhone);
        setDisplayNone(loginInputCode);
        setDisplayNone(loginInputMail);
        setDisplayBlock(loginInputPhone);
    }

    loginMethodMail.onclick = function () {
        loginType = "mail";
        removeActive(loginMethodCode);
        removeActive(loginMethodPhone);
        addActive(loginMethodMail);
        setDisplayNone(loginInputCode);
        setDisplayNone(loginInputPhone);
        setDisplayBlock(loginInputMail);
    }

    registerMethodPhone.onclick = function () {
        registerType = "phone";
        removeActive(registerMethodMail);
        addActive(registerMethodPhone);
        setDisplayNone(registerInputMail);
        setDisplayBlock(registerInputPhone);
    }

    registerMethodMail.onclick = function () {
        registerType = "mail";
        removeActive(registerMethodPhone);
        addActive(registerMethodMail);
        setDisplayNone(registerInputPhone);
        setDisplayBlock(registerInputMail);
    }

    forgetMethodPhone.onclick = function () {
        forgetType = "phone";
        removeActive(forgetMethodMail);
        addActive(forgetMethodPhone);
        setDisplayNone(forgetInputMail);
        setDisplayBlock(forgetInputPhone);
    }

    forgetMethodMail.onclick = function () {
        forgetType = "mail";
        removeActive(forgetMethodPhone);
        addActive(forgetMethodMail);
        setDisplayNone(forgetInputPhone);
        setDisplayBlock(forgetInputMail);
    }

    loginButton.onclick = async function () {
        switch (loginType) {
            case "code":
                loginCodePhoneTip.innerText = "";
                loginCodeCodeTip.innerText = "";
                if (!checkPhone(loginCodePhoneInput.value)) {
                    loginCodePhoneTip.innerText = "请输入正确手机号";
                    return;
                }
                if (!loginCodeCodeInput.value) {
                    loginCodeCodeTip.innerText = "请输入验证码";
                    return;
                }
                var data = {
                    token: smsToken2,
                    code: loginCodeCodeInput.value,
                };
                var result = await asyncAxios.post(url + "/user/verifyPhonecode", data);
                if (result.status === 0) {
                    toast("验证码已过期", 2000);
                } else if (result.status === 1){
                    loginCodeCodeTip.innerText = "验证码错误";
                } else if (result.result === "OK"){
                    var data2 = {
                        phone: loginCodePhoneInput.value,
                        token: smsToken2,
                    }
                    var result2 = await asyncAxios.post(url + "/login/phone/verifyCode ", data2);
                    if (result2.status === 2) {
                        toast("该账号已被封号", 2000);
                        
                    } else if (!result2.error){
                        logManager.logIn(loginCodePhoneInput.value,false, result2.token, result2.result._id, () => {
                            toast("登录成功", 2000);///////////////////////////////////////////////////////////////////////////////////////////////////////
                            //setDisplayNone(wrap);
                            showUserLogout();
                            sessionStorage.setItem("loged", true);
                            loginSuccess();
                        });
                    } else {
                        toast("登录失败", 2000);
                    }
                }
                break;
            case "phone":
                loginPhonePhoneTip.innerText = "";
                loginPhonePwdTip.innerText = "";
                if (!checkPhone(loginPhonePhoneInput.value)) {
                    loginPhonePhoneTip.innerText = "请输入正确手机号";
                    return;
                }
                if (!loginPhonePwdInput.value) {
                    loginPhonePwdTip.innerText = "请输入密码";
                    return;
                }

                var phone = loginPhonePhoneInput.value;
                var password = loginPhonePwdInput.value;
                var data = {
                    phone,
                    password,
                };

                var result = await asyncAxios.post(url + "/login/phone", data);
    
                if (result.state === 2) {
                    toast("该账号被封号", 2000);
                } else if (!result.error) {
                    logManager.logIn(result.result.phone, false, result.token, result.result._id, () => {
                        toast("登陆成功", 2000);////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //setDisplayNone(wrap);
                        showUserLogout();
                        sessionStorage.setItem("loged", true);
                        loginSuccess();
                    });
                } else {
                    toast("登陆失败", 2000);
                }
                break;
            case "mail":
                loginMailMailTip.innerText = "";
                loginMailPwdTip.innerText = "";
                if (!checkMail(loginMailMailInput.value)) {
                    loginMailMailTip.innerText = "请输入正确邮箱";
                    return;
                }
                var email = loginMailMailInput.value;
                var password = loginMailPwdInput.value;
                var data = {
                    email,
                    password
                }
                var loginResult = await asyncAxios.post(url + "/login/email", data);
                if (loginResult.state === 1) {
                    logManager.logIn(email, false, loginResult.token, loginResult.result._id, () => {
                        toast("登陆成功", 2000);////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //setDisplayNone(wrap);
                        showUserLogout();
                        sessionStorage.setItem("loged", true);
                        loginSuccess();
                    });
                } else if (loginResult.state === 2){
                    toast(loginResult.error, 2000);
                } else if (loginResult.state === 0) {
                    toast(loginResult.error, 2000);
                }
                break;
            default:
                break;
        }
    }

    registerButton.onclick = async function () {
        switch (registerType) {
            case "phone":
                registerPhonePhoneTip.innerText = "";
                registerPhoneCodeTip.innerText = "";
                registerPhonePwdTip.innerText = "";
                if (!checkPhone(registerPhonePhoneInput.value)) {
                    registerPhonePhoneTip.innerText = "请输入正确手机号";
                    return;
                }
                if (!registerPhoneCodeInput.value) {
                    registerPhoneCodeTip.innerText = "请输入验证码";
                    return;
                }
                if (!registerPhonePwdInput.value) {
                    registerPhonePwdTip.innerText = "请输入密码";
                    return;
                }
                var data = {
                    token: smsToken,
                    code: registerPhoneCodeInput.value,
                };
                var result = await asyncAxios.post(url + "/user/verifyPhonecode", data);
                if (result.status === 0) {
                    toast("验证码已过期", 2000);
                } else if (result.status === 1){
                    registerPhoneCodeTip.innerText = "验证码错误";
                } else if (result.result === "OK"){
                    var data2 = {
                        phone: registerPhonePhoneInput.value,
                        token: smsToken,
                        password: registerPhonePwdInput.value,
                    }
                    var result2 = await asyncAxios.post(url + "/signup/phone", data2);
                    if (!result2.error) {
                        alert('注册成功,请登陆。。。');//toast("注册成功", 2000);
                         window.location.href='index.html';
                        //setDisplayNone(wrap);
                        showLoginRegister();
                    } else {
                        toast(result2.error, 2000);
                    }
                }
                break;
            case "mail":
                registerMailMailTip.innerText = "";
                registerMailPwdTip.innerText = "";
                if (!checkMail(registerMailMailInput.value)) {
                    registerMailMailTip.innerText = "请输入正确邮箱";
                    return;
                }
                var email = registerMailMailInput.value;
                var password = registerMailPwdInput.value;
                var data = {
                    email,
                    password
                }
                var registerResult = await asyncAxios.post(url + "/signup/email", data);
                if (!registerResult.error) {
                    alert('邮件已发送,请到邮箱中激活后再登陆。。。');//toast("激活邮件已发送", 2000);
                    //setDisplayNone(wrap);
                    window.location.href='index.html';
                    //showLoginRegister();
                } else {
                    toast(registerResult.error, 2000);
                }
                break;
            default:
                break;
        }
    }

    forgetButton.onclick = async function () {
        switch (forgetType) {
            case "phone":
                forgetPhonePhoneTip.innerText = "";
                forgetPhoneCodeTip.innerText = "";
                forgetPhonePwdTip.innerText = "";
                if (!checkPhone(forgetPhonePhoneInput.value)) {
                    forgetPhonePhoneTip.innerText = "请输入正确手机号";
                    return;
                }
                if (!forgetPhoneCodeInput.value) {
                    forgetPhoneCodeTip.innerText = "请输入验证码";
                    return;
                }
                if (!forgetPhonePwdInput.value) {
                    forgetPhonePwdTip.innerText = "请输入密码";
                    return;
                }
                var data = {
                    token: smsToken3,
                    code: forgetPhoneCodeInput.value,
                };
                
                var result = await asyncAxios.post(url + "/user/verifyPhonecode", data);
                if (result.status === 0) {
                    toast("验证码已过期", 2000);
                } else if (result.status === 1){
                    forgetPhoneCodeTip.innerText = "验证码错误";
                } else if (result.result === "OK"){
                    var data2 = {
                        phone: forgetPhonePhoneInput.value,
                        token: smsToken3,
                        password: forgetPhonePwdInput.value,
                    }
                    var result2 = await asyncAxios.post(url + "/user/phone/changePassword", data2);
                    if (!result2.error) {
                        toast("修改密码成功", 2000);
                        setDisplayNone(wrap);
                        showLoginRegister();
                    } else {
                        toast(result2.error, 2000);
                    }
                }
                break;
            case "mail":
                forgetMailMailTip.innerText = "";
                if (!checkMail(forgetMailMailInput.value)) {
                    forgetMailMailTip.innerText = "请输入正确邮箱";
                    return;
                }
                var data = {
                    email: forgetMailMailInput.value,
                }
                var result = await asyncAxios.get(url + "/user/changePasswordByEmail", data);
                if (!result.error) {
                    toast("重置密码邮件已发送至邮箱", 2000);
                } else {
                    toast(result.error, 2000);
                }
                break;
            default:
                break;
        }
    }

    loginCodeCodeGet.onclick = async function () {
        if (!checkPhone(loginCodePhoneInput.value)) {
            loginCodePhoneTip.innerText = "请输入正确手机号";
            return;
        }
        if (!isNaN(loginCodeCodeGet.innerText)) {
            toast(loginCodeCodeGet.innerText + "秒后可再次发送", 2000);
            return;
        }
        var data = {
            phone: loginCodePhoneInput.value
        }
        var result = await asyncAxios.get(url + "/login/getVerifyCode", data);
        if (result.status === 0) {
            toast(result.error, 2000);
        } else if (result.status === 1) {
            toast("验证码发送失败", 2000);
        } else if (result.result === "OK") {
            toast("验证码已发送", 2000);
            countDown(loginCodeCodeGet, 60);
            smsToken2 = result.token;
        } 
    }

    registerPhoneCodeGet.onclick = async function () {
        if (!checkPhone(registerPhonePhoneInput.value)) {
            registerPhonePhoneTip.innerText = "请输入正确手机号";
            return;
        }
        if (!isNaN(registerPhoneCodeGet.innerText)) {
            toast(registerPhoneCodeGet.innerText + "秒后可再次发送", 2000);
            return;
        }
        var data = {
            phone: registerPhonePhoneInput.value
        }
        var result = await asyncAxios.get(url + "/signup/getVerifyCode", data);
        if (result.status === 0) {
            toast("验证码发送失败", 2000);
        } else if (result.status === 1) {
            toast("该手机已注册", 2000);
        } else if (result.result === "OK") {
            toast("验证码已发送", 2000);
            countDown(registerPhoneCodeGet, 60);
            smsToken = result.token;
        }
    }

    forgetPhoneCodeGet.onclick = async function () {
        if (!checkPhone(forgetPhonePhoneInput.value)) {
            forgetPhonePhoneTip.innerText = "请输入正确手机号";
            return;
        }
        if (!isNaN(forgetPhoneCodeGet.innerText)) {
            toast(forgetPhoneCodeGet.innerText + "秒后可再次发送", 2000);
            return;
        }
        var data = {
            phone: forgetPhonePhoneInput.value
        }
        var result = await asyncAxios.get(url + "/user/phone/changPwdCode", data);
        if (result.status === 0) {
            toast("验证码发送失败", 2000);
        } else if (result.result === "OK") {
            toast("验证码已发送", 2000);
            countDown(forgetPhoneCodeGet, 60);
            smsToken3 = result.token;
        } else if (result.error) {
            toast(result.error, 2000);
        }
    }

}