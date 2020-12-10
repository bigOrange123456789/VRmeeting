// window.onload = function () {
    var user = storage.getUser(username);
    // 展示头像
    var showavatar = getDom("show-avatar");
    // 头像
    var inputavatar = getDom("input-avatar");

    // 生日
    var inputBirthday = getDom("input-birthday");
    // 爱好
    var inputHobby = getDom("input-hobby");
    // 籍贯
    var inputBirthplace = getDom("input-birthplace");
    // 确认修改基本资料按钮
    var modifyInfoBtn = getDom("modify-info-btn");

    // 原密码
    var inputPasswordOld = getDom("input-password-old");
    // 新密码
    var inputPasswordNew = getDom("input-password-new");
    // 确认修改密码按钮
    var modifyPasswordBtn = getDom("modify-password-btn");
    // --注销按钮
    var logoutSpan = getDom("logout-span");






    inputavatar.onchange = async function () {


        var user = storage.getUser(username);

        var formData = new FormData();
        formData.append("id", user._id);
        formData.append("thumbnail", inputavatar.files[0]);

        var result = await asyncAxios.post(url + "/user/updateUserInfoById", formData);
        if (!result.error) {

            getUserInfo();

            toast("修改成功", 2000);
        } else {
            toast("修改失败", 2000);
        }
    }

    modifyInfoBtn.onclick = async function () {
        var formData = new FormData();
        formData.append("id", user._id);
        formData.append("birthday", inputBirthday.value);
        formData.append("hobby", inputHobby.value);
        formData.append("birthplace", inputBirthplace.value);

        var result = await asyncAxios.post(url + "/user/updateUserInfoById", formData);
        if (!result.error) {
            toast("修改成功", 2000);
        } else {
            toast("修改失败", 2000);
        }
    }

    modifyPasswordBtn.onclick = async function () {
        var data = {
            id: user._id,
            oldPwd: inputPasswordOld.value,
            newPwd: inputPasswordNew.value,
        }
        if (!data.oldPwd) {
            toast("请输入原密码", 2000);
            return;
        }
        if (!data.newPwd) {
            toast("请输入新密码", 2000);
            return;
        }
        var result = await asyncAxios.get(url + "/user/changePwdByOldPwd", data);
        if (!result.error) {
            toast("修改成功", 2000);
            inputPasswordOld.value = "";
            inputPasswordNew.value = "";
        } else {
            toast(result.error, 2000);
        }
    }
    


    function getUserInfo() {
        if (user) {
            var data = {
                id: user._id
            };
            (async () => {
                var result = await asyncAxios.get(url + "/user/getById", data);
                if (!result.error) {
                    if (!result.result) {
                        location.href = "index.html";
                    }
                    var user = result.result;
                    if (user.thumbnail) {
                        showavatar.src = url + user.thumbnail;
                    } else {
                        showavatar.src = "./img/user.png";
                    }
                    
                    inputBirthday.value = utils.time.getYMDTimeByDate(new Date(user.birthday));
                    inputHobby.value = user.hobby;
                    inputBirthplace.value = user.birthplace;
                
                } else {
        
                }
            })();
            
            
        }
    }
    getUserInfo();
    
    logoutSpan.onclick = function () {
        logManager.logOut(username, () => {
            sessionStorage.removeItem('loged');
            location = "index.html";    
        });
    }
    

// }