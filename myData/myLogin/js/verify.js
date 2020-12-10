window.onload = function () {
    var container = getDom("container");
    var token = utils.getParam(window.location.href, "token", "");
    var data = {
        token
    };
    (async () => {
        var verrifyResult = await asyncAxios.get(url + "/user/verifyToken", data);
        if (verrifyResult && !verrifyResult.error) {
            var seconds = 5;
            setInterval(() => {
                if (seconds <= 0) {
                    window.location = "/index.html";
                }
                container.innerText = "邮箱验证成功," + seconds-- + "s后跳转至首页";
            }, 1000);
        } else {
            container.innerText = "邮箱验证失败";
        }
    })();

}