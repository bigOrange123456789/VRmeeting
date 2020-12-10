const express = require('express');
const Router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Q = require('q');

const config = require("../config.json");
const JWT = require("../service/jwt.verify");
const sendEmail = require("../service/email");

const User = require('../models/user.model');
const UserService = require('../service/user.service');
const phoneCode = require('../service/phone.code');

let ObjectId = require('mongoose').Types.ObjectId;


const _existsSync = fs.existsSync;

const options = {
    ssl: null,
    oldId : null,
    thumbnailPath: "./assets/user/",
    webIP:config.webIP,
    score:100,//一块钱对应的积分数

    getSuffix: function (name) {
        var index = name.lastIndexOf(".");
        var suffix = name.substring(index);
        return suffix;
    },

    initUrls: function (req, path) {
        var baseUrl = (options.ssl ? 'https:' : 'http:') +
            '//' + req.headers.host;
        let url = baseUrl + "/" + path;
        return url;
    },

    getId: function () {

        let id = new Date().getTime();

        if ( this.oldId && this.oldId == id ) 
        {
            while ( id == this.oldId  )
            {
                id = new Date().getTime();
            }

            this.oldId = id;

            return id;
        }
        else
        {
            this.oldId = id;
            return id;
        }
    }
}



let storage_thumbnail = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        destination = options.thumbnailPath + req.body.id + "/";

        createFolder(destination);
        console.log("缩略图保存地址：",destination);

        cb(null, destination);
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        filename = file.originalname;
       
        let suffix = options.getSuffix(file.originalname);
        filename = "thumbnail-"+ options.getId() + suffix;

        console.log("上传缩略图：",filename);
        
        cb(null, filename);
    }
});


Router.get("/verifyToken", verifyToken);
Router.get("/verifyEmail", verifyEmail);
Router.get("/refresh", refresh);
Router.get("/getById", getById);
Router.get("/getuserbykeyword", getUserByKeyword);
Router.get("/changePassword", changeUserPassword);
Router.get("/changePasswordByEmail", changePasswordByEmail);
Router.get("/changeUserPasswordBytoken", changeUserPasswordBytoken);
Router.post("/updateUserInfoById", multer({ storage: storage_thumbnail }).single('thumbnail'), updateUserInfoById);
Router.post("/verifyUser", verifyUser);
Router.get("/changePwdByOldPwd", changePwdByOldPwd);
Router.get("/phone/changPwdCode", getChangPwdCodebyPhone);
Router.post("/phone/changePassword", changePwdByPhone);
Router.post("/verifyPhonecode", verifyPhonecode);


module.exports = Router;
// todo: 发送邮件的统一使用email.js里面的模板
// 验证码修改

FileInfo = function (file) {
    this.name = this.filename = file.filename;
    this.size = file.size;
    this.destination = file.destination;
    this.path = file.destination;
    if (file.path.indexOf("\\") > 0) {
        this.path = file.path.split("\\").join("/");
    }
}

FileInfo.prototype.validate = function () {
    if (options.minFileSize && options.minFileSize > this.size) {
        this.error = 'File is too small';
    } else if (options.maxFileSize && options.maxFileSize < this.size) {
        this.error = 'File is too big';
    } else if (!options.acceptFileTypes.test(this.name)) {
        this.error = 'Filetype not allowed';
    }
    return !this.error;
};

FileInfo.prototype.initUrls = function (req) {
    if (!this.error) {
        var baseUrl = (options.ssl ? 'https:' : 'http:') +
            '//' + req.headers.host;
        // this.url = baseUrl + "/" + this.path;
        this.path = this.url =  "/" + this.path;

    }
};



// 创建文件夹
function createFolder ( path ) 
{
    if ( _existsSync(path) )
    {
        return;
    }

    fs.mkdirSync(path, 0777);

    return;
}

function removeFolder ( path ) {
    if (fs.readdirSync(path).length == 0 )
    {
        fs.rmdirSync(path);
    }
    else
    {
        setTimeout(()=>{ removeFolder(path) },200)
    }
}

function deleteFolder ( path )
{
    if ( !_existsSync(path) )
    {
        return '该文件不存在';
    }
    if (fs.statSync(path).isFile())
    {
        fs.unlinkSync(path);
        return '这是个文件，已删除';
    }


    var files = [];
    files = fs.readdirSync(path);
    for ( let file of files )
    {
        var curPath = path + "/" + file;
        let stat = fs.statSync(curPath)
        if( stat.isDirectory()) 
        { 
            deleteFolder(curPath);
        } 
        else if (stat.isFile()) 
        {
            fs.unlinkSync(curPath);
        }
    }
    removeFolder(path);
}


function verifyToken( req, res)
{
    let {token} = req.query;

    if(!token)
    {
        res.send({error:"请检查该连接是不是已过期",result:null});
        return;
    }
    let jwt = new JWT(token);
    let ver = jwt.verifyToken();

    if (ver.result)
    {
        let {uid} = ver.result;
        console.log("解析的数据：", ver.result);
        UserService.updateById(uid,{state:1})
        .then((user)=>{
            let jwt = new JWT({uid: user._id,email:user.email});
            let token = jwt.generateToken();
            console.log("refresh 成功: ", token);
            res.send({error: null, result:user,token:token});
        })
        .catch((err)=>{
            res.send({error: err, result:null});
        })
    }
    else
    {
        console.log("refresh 验证失败：",ver);
        res.send(ver);
    }

}


function verifyEmail( req, res ) {
    debugger
    let {token} = req.query;
    
    if(!token)
    {
        res.send({error:"用户未登录",result:null});
        return;
    }
    let jwt = new JWT(token);
    let ver = jwt.verifyToken();

    debugger
    if (ver.result)
    {
        let {uid,email } = ver.result;
        UserService.getbyquery({_id:uid})
        .then((result)=>{
            console.log("查询成功了？",result);
            let user = result;
            if(user)
            {
                let jwt = new JWT({uid: user._id,email:user.email});
                let token = jwt.generateToken();
                debugger
                sendEmail.comfirmEmail(user.username,token,user.email)
                .then(()=>{
                    res.send({error:null,result:'OK'});
                })
                .catch((error)=>{
                    res.send({error:error,result:null, state:404});
                });
            }
            else 
            {
                res.send({error:'verification failed!',result:null});
            }
        })
        .catch((err)=>{
            res.send({error:err,result:null});
        })
    }
    else
    {
        console.log("refresh 验证失败：",ver);
        res.send(ver);
    }
}

function refresh(req, res) {
    console.log("请求头里是不是有token：",req.headers.token)
    let token = req.headers.token || req.query.token;

    if(!token)
    {
        res.send({error:"用户未登录",result:null});
        return;
    }
    let jwt = new JWT(token);
    let ver = jwt.verifyToken();

    if (ver.result)
    {
        let {uid} = ver.result;
        if (!uid)
        {
            res.send({error: "can't find this user in the token:", result:null});
            return;
        }
        UserService.getbyquery({_id:uid}, true)
        .then((result)=>{
            let user=result[0];
            if (!result)
            {
                res.send({error: "can't find this user:"+uid, result:null});
                return;
            }
            // console.log("ref user: ", user);
            if (user && (user.state == true || user.state == 1 )){
                let jwt = new JWT({uid: user._id,email:user.email});
                let token = jwt.generateToken();
                // console.log("refresh 成功: ", user);
                res.send({error: null, result:user,token:token});
            }
            else if ( user && user.state == 2  ){
                // res.send({error: "该账号是封号状态，具体情况请联系管理员", result:null});
                res.send({error: "This account is closed, please contact the administrator for details", state:2, result:null});
            }
            else {
                let jwt = new JWT({uid: user._id,email:user.email});
                let token = jwt.generateToken();
                res.send({error: "This account has not been verified, please go to verify",state:0, result:null,token:token});
            }
        })
        .catch((err)=>{
            res.send({error: err, result:null});
        })

    }
    else
    {
        console.log("refresh 验证失败：",ver);
        res.send(ver);
    }


}


function comfirmEmail(username,token, useremail) {
    var deferred = Q.defer();

    // let comfirmUrl = "http://106.15.124.119:8808/confirm";
    let comfirmUrl = options.webIP + "/verify.html";

    let _html = 
    "<!DOCTYPE html>"      
    +"<html>"      
    +"<title>W3.CSS</title>"      
    +"<meta name='viewport'  content='width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' >"      
    +"<head>"      
    +"</head>"      
    +"<body>"      
    +"    <div style='background:#ffcc00;text-align:center;padding:20px;font-size:24px;max-width:550px;margin:10px auto;'>"   
    +"        <a style='color:#ffffff;' target='_bank' href='"+ comfirmUrl+ "?username="+ username+ "&token=" + token+"'>"   
    +"            <p>Important: Your email hasn't been confirmed </p>"     
    +"            <p>Comfirm now</p>"   
    +"        </a>"
    +"    </div>"     
    +"</body>"      
    +"</html>";

    var mail = {
        // 发件人
        from: 'contactus@shinexr.com',
        // 主题
        subject: 'Validation email',
        // 收件人
        to: useremail,
        text: 'hello !',
        // 邮件内容，HTML格式
        html:_html
    };
    eamil(mail)
    .then((result)=>{
        deferred.resolve(result);
    })
    .catch((error)=>{
        deferred.reject(error);
    });
    return deferred.promise;
}

function changePasswordEmail(username,token, useremail) {
    var deferred = Q.defer();

    // let comfirmUrl = "http://106.15.124.119:8808/confirm";
    let comfirmUrl = options.webIP + "/modifypwd.html";

    let _html = 
    "<!DOCTYPE html>"      
    +"<html>"      
    +"<title>W3.CSS</title>"      
    +"<meta name='viewport'  content='width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' >"      
    +"<head>"      
    +"</head>"      
    +"<body>"      
    +"    <div style='background:#ffcc00;text-align:center;padding:20px;font-size:24px;max-width:550px;margin:10px auto;'>"   
    +"        <a style='color:#ffffff;' target='_bank' href='"+ comfirmUrl+ "?username="+ username+ "&token=" + token+"'>"   
    +"            <p>是否确认重置密码 </p>"     
    +"            <p>确认重置</p>"   
    +"        </a>"
    +"    </div>"     
    +"</body>"      
    +"</html>";

    var mail = {
        // 发件人
        from: 'contactus@shinexr.com',
        // 主题
        subject: '重置密码',
        // 收件人
        to: useremail,
        text: 'hello !',
        // 邮件内容，HTML格式
        html:_html
    };
    eamil(mail)
    .then((result)=>{
        deferred.resolve(result);
    })
    .catch((error)=>{
        deferred.reject(error);
    });
    return deferred.promise;
}

function getById(req, res) {
    let query = { _id: ObjectId(req.query.id) }

    console.log("用户查询：", query, req.query);

    User.findOne(query, function (err, user) {
        if (err) {
            res.send({ error: err, result: null });
        }
        else {
            res.send({ error: null, result: user });
        }
    })

}


function getUserByKeyword (req, res )
{
    const { keyword } =  req.query

    console.log("用户查询");
    if ( keyword == '') {
        res.send({error:null, result:[]});
        return;
    }
    var query ={
        $or: [  // 多字段同时匹配
          {email: {$regex: keyword, $options: '$i'}},
          {username: {$regex: keyword, $options: '$i'}},
          {realname: {$regex: keyword, $options: '$i'}}
        ]
      }
    
      User.find(query)
        .exec(function (err, user) {
            if (err) {
                res.send({ error: err, result: null });
            }
            else {
                res.send({ error: null, result: user });
            }
        })
}


function changeUserPasswordBytoken ( req, res ) {

    let token = req.headers.token || req.query.token;
    let password = req.query.password;


    console.log("新密码：", password, req.query);

    if(!token)
    {
        res.send({error:"用户未登录",result:null});
        return;
    }
    if(!password)
    {
        res.send({error:"请输入有效密码！",result:null});
        return;
    }


    let jwt = new JWT(token);
    let ver = jwt.verifyToken();
    let uid =  ver.result ? ver.result.uid : null;
    console.log("请求头里是不是有token：",token,password, ver)

    
    if (!uid)
    {
        res.send({error: "验证失败，请检查改链接是否已经失效！", result:null});
        return;
    }

    User.findById(ObjectId(uid), function (err, user) {
        if (err || !user) {
            if (!user)
                res.send({error:"该用户不存在！", result:null});
            else
                res.send({error:err, result:null});
        }
        else {
            user.changePassword(password, function (err, hashedPssword) {
                if (err) {
                    res.send({error:err, result:null});
                    return;
                }
                console.log("新密码",password,hashedPssword);
                User.findOneAndUpdate({_id:user._id}, { password: hashedPssword })
                    .exec(function (err, result) {
                        if (err) {
                            res.send({error:err, result:null});
                        }
                        else {
                            res.send({error:null, result:result});
                        }//if
                    })
            })
        }
    });

}

function changeUserPassword( req, res ) {

    let { id,password  } = req.query;

    let query  = { _id: ObjectId(id) };

    console.log("管理员修改用户密码：", query,  id,password);

    User.findOne(query, function (err, user) {
        if (err || !user) {
            if (!user)
                res.send({error:"The user does not exist", result:null});
            else
                res.send({error:err, result:null});
        }
        else {
            user.changePassword(password, function (err, hashedPssword) {
                if (err) {
                    res.send({error:err, result:null});
                    return;
                }
                console.log("新密码",hashedPssword);
                User.findOneAndUpdate({_id:user._id}, { password: hashedPssword })
                    .exec(function (err, result) {
                        if (err) {
                            res.send({error:err, result:null});
                        }
                        else {
                            res.send({error:null, result:result});
                        }
                    })
            })
        }
    });

}

function changePasswordByEmail( req, res ) { 
    
    let {email} = req.query;
    let query = {email:email}
    User.find(query)
    .exec((error, result)=>{

        if(error)
        {
            res.send({error:err,result:null});
            return;
        }
        
        if( !result || result.length < 1 )
        {
            console.log("没找到用户？", result,email);
            res.send({error:'请检查用户邮箱是否正确',result:null});
            return;
        }

        let user = result[0];
        console.log("查询成功了？",user);
        if(user)
        {
            let jwt = new JWT({uid: user._id,email:user.email});
            let token = jwt.generateToken();
            // changePasswordEmail(user.username,token,user.email)
            sendEmail.changePasswordEmail(user.username,token,user.email)
            .then(()=>{
                res.send({error:null,result:'OK'});
            })
            .catch((error)=>{
                res.send({error:'邮件发送失败，请检查邮箱是否正确！',result:null, state:404});
            });
        }
    })
}


function verifyUser(req, res) {
    // console.log("用户验证接口:", req.body);
    let param = Object.assign(req.body);
    User.findOne(param, function (err, user) {
         if(user){
            res.send({ error: null, result: {_id:user._id,email:user.email, username:user.username, thumbnail:user.thumbnail } });
        }
        else {
            res.send({ error: err, result: null });
        }
    })
}


function updateUserInfoById(req, res) {
    let params = Object.assign({},req.body);
    let query = { _id: ObjectId(req.body.id) };

    if (!req.body.id) {
        res.send({ error: "请传入一个正确的参数:id", result: null });
        return;
    }

    if (req.file) {
        let thumbnailInfo = new FileInfo(req.file);
        thumbnailInfo.initUrls(req);
        params = Object.assign({ thumbnail: thumbnailInfo.url }, req.body)
    }

    console.log("更新用户数据：", query, params);
    let option = { new: false };

    User.findOneAndUpdate(query, params, option)
        .exec(function (err, user) {
            if (err || !user ) {
                err ? res.send({ error: err, result: null }) : res.send({ error: '该用户不存在！', result: null }) ;
            }
            else {
                // console.log("更新用户数据：", user);
                // let userone = JSON.parse(JSON.stringify(user));
                // let result = Object.assign({setting:options.setting},userone);
                if(user.thumbnail)
                {
                    deleteFolder(user.thumbnail);
                }
                res.send({ error: null, result: user });
            }
        })
}

function changePwdByOldPwd(req, res) {
    let { id, oldPwd, newPwd } = req.query;
    let query = { _id: ObjectId(id) };
    console.log("通过老密码设置新密码", query, id, oldPwd, newPwd);
    User.findOne(query, function (err, user) {
        if (err || !user) {
            if (!user)
                res.send({ error: "The user does not exist", result: null });
            else
                res.send({ error: err, result: null });
        } else {
            user.checkPassword(oldPwd, function (err, isMatch) {
                if (err) {
                    res.send({ error: err, result: null });
                    return;
                } else {
                    if (isMatch) {
                        user.changePassword(newPwd, function (err, hashedPssword) {
                            if (err) {
                                res.send({ error: err, result: null });
                                return;
                            } else {
                                User.findOneAndUpdate({ _id: id }, { password: hashedPssword })
                                    .exec(function (err, result) {
                                        if (err) {
                                            res.send({error:err, result:result});
                                        } else {
                                            res.send({error:null, result: true});
                                        }
                                    })
                            }
                        })
                    } else {
                        res.send({ error: "原密码错误", result: null });
                        return;
                    }
                }
            })
        }
    });
}

function getChangPwdCodebyPhone( req, res ) {
    
    let {phone} = req.query;

    UserService.existVerify({phone})
    .then((users)=>{
        if ( !users || users.length == 0 )
        {
            console.log("验证该数据存在:",users)
            res.send({error:"该手机还未注册，请前往注册！",result:null});
            return;
        }

        phoneCode.send({
            "PhoneNumbers": phone,
            "TemplateCode": "SMS_176533705"
        })
        .then((result)=>
        {
            let {Code}=result
            if (Code === 'OK') {
                //处理返回参数
                console.log(result)
                /* let jwt = new JWT({newCode: result.newCode,phone:phone});
                let token = jwt.generateToken(60*5); */
                let uid = users[0]._id;
                let token =  phoneCode.getToken(result.newCode, {phone,uid});
                res.send({ error:null, result: 'OK', token });
            }
        })
        .catch((ex)=>{
            res.send({ error:ex, result: null, status: 0 });
        })


    })
    .catch((error)=>{
        res.send({ error:error, result: null});
    })

}

function changePwdByPhone( req, res ) {

    let token = req.headers.token || req.body.token;
    let password = req.body.password;

    console.log("新密码：", password, req.query);

    if(!token)
    {
        res.send({error:"用户未登录",result:null});
        return;
    }
    if(!password)
    {
        res.send({error:"请输入有效密码！",result:null});
        return;
    }


    let jwt = new JWT(token);
    let ver = jwt.verifyToken();
    let uid =  ver.result ? ver.result.uid : null;
    console.log("请求头里是不是有token：",token,password, ver)

    
    if (!uid)
    {
        res.send({error: "验证失败，请检查改链接是否已经失效！", result:null});
        return;
    }

    User.findById(ObjectId(uid), function (err, user) {
        if (err || !user) {
            if (!user)
                res.send({error:"该用户不存在！", result:null});
            else
                res.send({error:err, result:null});
        }
        else {
            user.changePassword(password, function (err, hashedPssword) {
                if (err) {
                    res.send({error:err, result:null});
                    return;
                }
                console.log("新密码",password,hashedPssword);
                User.findOneAndUpdate({_id:user._id}, { password: hashedPssword })
                    .exec(function (err, result) {
                        if (err) {
                            res.send({error:err, result:null});
                        }
                        else {
                            res.send({error:null, result:result});
                        }
                    })
            })
        }
    });
}
/* 
返回结果中： 
    status: 0， 代表token有问题，如：已过期，不合法的
    status: 1， 代表该用户输入的验证码不对
    取消status返回,避免报错，默认1
*/
function verifyPhonecode( req, res ) { 

    let {token, code} = req.body; 

    let verifyRes =  phoneCode.verifyToken(token, code);

    if(verifyRes)
    {
        res.send({error:null, result:'OK'});
    }
    else
    {
        res.send({error:'验证失败', result:null,status: 1});
    }

    return;
}
