let express = require('express');
    
let JWT = require('../service/jwt.verify');
let UserService = require('../service/user.service');
let phoneCode = require('../service/phone.code');

// let { comfirmEmail } = require('../service/email');

let ObjectId = require('mongoose').Types.ObjectId;

var router = express.Router();

// router.use('/', locals);

router.post('/email', loginByEmail );
router.post('/phone', loginByPhone );
router.post('/phone/verifyCode', loginByVerifyCode );
router.get('/getVerifyCode', getLoginVerifyCode );
// router.get('/verifyCode', verifyCode );
// router.get('/verifyCode', verifyCode );


module.exports = router;

function loginByEmail(req, res) {  
 
    let {email, password} = req.body;

    // 去除前后空格
    email = email.replace(/^\s*|\s*$/g,"");
 
    console.log("登录：", email, password);
    let param = {
        email:email,
        password:password
    }
    if ( !email || !password )
    {
        res.send({error: "登录信息不完善，请检查数据", result:null});
        return;
    }
    UserService.login(param,{email})
    .then(function(user){
        if (user && user.state==1){
            let jwt = new JWT({uid: user._id,email:user.email});
            let token = jwt.generateToken();
            console.log("登陆成功: ", token);
            res.send({error: null, result:user,token:token,state:1});
        }
        else if ( user && user.state == 2  ){
            // res.send({error: "该账号是封号状态，具体情况请联系管理员", result:null});
            res.send({error: "该账号是封号状态，具体情况请联系管理员", state:2, result:null});
        }
        else {
            let jwt = new JWT({uid: user._id,email:user.email});
            let token = jwt.generateToken();
            res.send({error: "该账号还未验证，请前往验证",state:0, result:null,token:token});
        }
    })
    .catch(function(err){
        console.log("登陆失败：",err);
        res.send({error: err, result:null,state:500});
    })
}


function loginByPhone(req, res) {  
    let {phone, password} = req.body;

    // 去除前后空格
    phone = phone.replace(/^\s*|\s*$/g,"");

    if ( !phone || !password )
    {
        res.send({error: "登录信息不完善，请检查数据", result:null});
        return;
    }

    let param = {
        phone:phone,
        password:password
    }
    debugger
    UserService.login(param,{phone})
    .then(function(user){
        if ( user && user.state == 2  ) {
            // res.send({error: "该账号是封号状态，具体情况请联系管理员", result:null});
            res.send({error: "该账号是封号状态，具体情况请联系管理员", state:2, result:null});
        }
        else 
        {
            let jwt = new JWT({uid: user._id,phone:user.phone});
            let token = jwt.generateToken();
            console.log("登陆成功: ", token);
            res.send({error: null, result:user,token:token});
        }
       
    })
    .catch(function(err){
        console.log("登陆失败：",err);
        res.send({error: err, result:null,state:500});
    })

}

/* 
    status: 0， 代表注册报错
    status: 1， 代表该用户已经注册了，但是验证码发送失败
*/
function loginByVerifyCode(req, res) {  
    
    let {phone, token} = req.body;

    // 去除前后空格
    phone = phone.replace(/^\s*|\s*$/g,"");

    if ( !phone || !token )
    {
        res.send({error: "登录信息不完善，请检查数据", result:null});
        return;
    }

    let jwt = new JWT(token);
    let ver = jwt.verifyToken();

    if(ver.error)
    {
        res.send({error:'验证码已过期或操作不合法', result:null});
        return;
    }


    UserService.loginByPhoneCode(phone)
    .then(function(user){
        if ( user && user.state == 2  ) {
            // res.send({error: "该账号是封号状态，具体情况请联系管理员", result:null});
            res.send({error: "该账号是封号状态，具体情况请联系管理员", state:2, result:null});
        }
        else 
        {
            let jwt = new JWT({uid: user._id,phone:user.phone});
            let token = jwt.generateToken();
            console.log("登陆成功: ", token);
            res.send({error: null, result:user,token:token});
        }
       
    })
    .catch(function(err){
        console.log("登陆失败：",err);
        res.send({error: err, result:null,state:500});
    })



}

function getLoginVerifyCode(req, res) { 
    
    let {phone} = req.query;

    
    if ( !phone )
    {
        res.send({error: "请传入正确的电话号码", result:null});
        return;
    }
    // 去除前后空格
    phone = phone.replace(/^\s*|\s*$/g,"");

    UserService.getUserOrCreate({phone},2)
    .then((result)=>{
        phoneCode.send({
            "PhoneNumbers": phone,
            "TemplateCode": "SMS_176528840"
        })
        .then((result)=>
        {
            let {Code}=result
            if (Code === 'OK') {
                //处理返回参数
                console.log(result)
               /*  let jwt = new JWT({newCode: result.newCode,phone:phone});
                let token = jwt.generateToken(60*5); */
                let token =  phoneCode.getToken(result.newCode, {phone});
                res.send({ error:null, result: 'OK', token });
            }
        })
        .catch((ex)=>{
            res.send({ error:ex, result: null, status: 1 });
        })
    })
    .catch((error)=>{
        res.send({ error:error, result: null, status: 0 });
    });
}

/* 
返回结果中： 
    status: 0， 代表token有问题，如：已过期，不合法的
    status: 1， 代表该用户输入的验证码不对
    取消status返回,避免报错，默认1
*/
function verifyCode( req, res ) { 

    let {token, code} = req.query; 

    
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

    /* let token =  phoneCode.verifyToken(result.newCode, phone);

    let jwt = new JWT(token);
    if (ver.result)
    {
        let {newCode} = ver.result;
        console.log("解析的数据：", ver.result);
       if( newCode == code)
       {
            res.send({error:null, result:'OK'});
       }
       else
       {
            res.send({error:'验证失败', result:null, status: 1});
       }
    }
    else
    {
        console.log("refresh 验证失败：",ver);
        res.send( {error:"验证码已过期", result:null, status: 0} );
    } */

}