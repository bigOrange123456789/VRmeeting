window.onload = function () {
    var container = getDom("container");
    // 新密码
    var inputPassword = getDom("input-password");
    // 修改密码按钮
    var modifyBtn = getDom("modify-btn");
    var token = utils.getParam(window.location.href, "token", "");

    modifyBtn.onclick = function () {
        var data = {
            token,
            password: inputPassword.value,
        };
        (async () => {
            var verrifyResult = await asyncAxios.get(url + "/user/changeUserPasswordBytoken", data);
            if (verrifyResult && !verrifyResult.error) {
                var seconds = 5;
                setInterval(() => {
                    if (seconds <= 0) {
                        window.location = "/index.html";
                    }
                    container.innerText = "密码设置成功," + seconds-- + "s后跳转至首页";
                }, 1000);
            } else {
                container.innerText = "密码修改失败";
            }
        })();
    }





}