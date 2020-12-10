let express = require('express');
	/* passport = require('passport'),
	config  = require('../config/config.json'),	
	locals  = require('../config/locals'),
    request = require('request'), */
    
let JWT = require('../service/jwt.verify');
// let verifyService = require('../service/verify.service');
let UserService = require('../service/user.service');
let phoneCode = require('../service/phone.code');

let { comfirmEmail } = require('../service/email');

let ObjectId = require('mongoose').Types.ObjectId;

var router = express.Router();

// router.use('/', locals);

router.post('/email', registerByEmail );
router.post('/phone', registerByPhone );
router.get('/getVerifyCode', getVerifyCode );
// router.get('/verifyCode', verifyCode );


module.exports = router;



function registerByEmail(req, res) {
    let _id = ObjectId();
    let user = Object.assign({_id:_id,state:0},req.body);
    
    if(!user.email)
    {
        res.send({error:'请传入如有效的email', result:null});
        return;
    }
    
    let jwt = new JWT({uid: user._id, email:user.email});
    let token = jwt.generateToken();

    console.log("有数据吗：", req.body);

    UserService.getbyquery({email:user.email})
    .then((result)=>{

        if (result.length > 0)
        {
            res.send({error:"该用户已存在："+ user.email});
            return;
        }

        comfirmEmail( user.username, token, user.email )
        .then((resu)=>{
            console.log("邮件发送成功了吗？",resu);

            user.registerBy = 3;
            UserService.create({email:user.email},user)
            .then((result)=>{
                console.log("注册成功：", result.username);
                res.send({error:null, result:{username:result.username, _id: result._id,token:token}});
            })
            .catch((err)=>{
                console.log("报错：", err);
                res.send({error:err, result:null, status:0});
            })
        })
        .catch((e)=>{
            res.send({error:e, result:null, status:404});
        });
    })
    .catch((error)=>{

    })

   
}

/* 
返回结果中： 
    status: 0， 代表报错
    status: 1， 代表该用户已经注册过了，无需再次注册
*/
function getVerifyCode( req, res ) {
    
    let {phone} = req.query;

    UserService.existVerify({phone})
    .then((users)=>{
        if (users && users.length>0)
        {
            console.log("验证该数据存在:",{phone},users)
            res.send({error:"该手机号已经注册，请直接前往登录！",result:null});
            return;
        }

        phoneCode.send({
            "PhoneNumbers": phone,
            "TemplateCode": "SMS_176531048"
        })
        .then((result)=>
        {
            let {Code}=result
            if (Code === 'OK') {
                //处理返回参数
                console.log(result)
                /* let jwt = new JWT({newCode: result.newCode,phone:phone});
                let token = jwt.generateToken(60*5); */
                let token =  phoneCode.getToken(result.newCode, {phone});
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

function registerByPhone( req, res ) { 
    // let user = Object.assign(req.body);
    let {token} = req.body;
    let user = req.body;
    delete user.token;

    let jwt = new JWT(token);
    let ver = jwt.verifyToken();

    if(ver.error)
    {
        res.send({error:'验证码已过期或操作不合法', result:null});
        return;
    }

    if(!user.phone)
    {
        res.send({error:'请传入如有效的phone number', result:null});
        return;
    }
    user.registerBy = 1;
    user.state = 1;
    UserService.create({phone:user.phone},user)
    .then((result)=>{
        console.log("注册成功：", result.username);
        let jwt = new JWT({uid: result._id, phone:result.phone});
        let token = jwt.generateToken();
        res.send({error:null, result:{phone:result.phone, _id: result._id,token:token}});
    })
    .catch((err)=>{
        console.log("报错：", err);
        res.send({error:err, result:null});
    })
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
    /* let jwt = new JWT(token);

    let ver = jwt.verifyToken();

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
    }
 */
}