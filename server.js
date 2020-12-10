const express = require('express');
var https = require('https');
const path = require('path');
const http = require('http');
const myParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const  Q    = require('q');
const xml = require('xml2js');

const config = require('./config.json');
const UserRouter = require("./routers/user");
const UserService = require("./service/user.service");
const eamil = require("./service/email");
const JWT = require("./service/jwt.verify");
const DB_URL = config.DB_URL;
const port = config.port;
const isSwitch = config.isSwitch;

var xmlBuilder = new xml.Builder({
    headless: true,
    rootName: 'xml'
});

var xmlParser = new xml.Parser({
    explicitArray: false
});
require("body-parser-xml")(myParser);

app.use(myParser.xml({
        limit: "1MB",   // Reject payload bigger than 1 MB
        xmlParseOptions: {
        normalize: true,     // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false // Only put nodes in array if >1
    },
    verify: function(req, res, buf, encoding) {
        if(buf && buf.length) {
        // Store the raw XML
        req.rawBody = buf.toString(encoding || "utf8");
        }
        }
}));


app.use(myParser.json());
app.use(myParser.urlencoded({ extended: false }));

//开放给客户端的一些地址
app.use(express.static(path.join(__dirname+'/myData/myLogin')));/////////////////////////////////////////////////index.html的路径/////////////////////////////
app.use(express.static(path.join(__dirname+'/myData')));

app.use('/assets',express.static(path.join(__dirname+'/assets')));

let mongoErr = false;

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: true,useFindAndModify: true, useUnifiedTopology:true  });

mongoose.connection
.on('connected', function () {
    console.log('** Mongoose connection open to ' + DB_URL);
})
.on('disconnected', function () {
    console.log('！！！Mongoose connection disconnected');
    mongoErr = "Database not connected"
});

// mail.js 可用发送邮件验证
// user下的操作需要验证登录状态

app.all('*', function (req, res, next) {
    console.log("有请求：",mongoErr,req.method,req.path);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("X-Powered-By", ' 3.2.1');
    if (mongoErr)
    {
        console.log("!!!数据库报错：", mongoErr);
    }
    next();
});  

var server = http.createServer(app);


app.get("/",function(req, res,next){
    console.log("首页加载？",req.url,req.query);
    if( req.query.code ){
        let {code,state} = req.query;
        
    }
    else
    {
        next();
    }
});

///响应的一些请求
app.use('/user',UserRouter);
app.use('/login',require('./routers/login'));
app.use('/signup', require('./routers/signup'));
app.use('/myuser',require('./routers/myuser'));
app.use('/myroom',require('./routers/myroom'));
app.use('/myavatar',require('./routers/myavatar'));
app.use('/myroom_number',require('./routers/myroom_number'));



let tempUser = {
    username:"测试用户",
    email:"123@163.com",
    password:"123"
}

function login( req, res )
{
    let {email, password} = req.body;
 
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
    UserService.login(param)
    .then(function(user){
        if (user && user.state==1){
            let jwt = new JWT({uid: user._id,email:user.email});
            let token = jwt.generateToken();
            console.log("登陆成功: ", token);
            res.send({error: null, result:user,token:token});
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

function register ( req, res )
{
    let user = Object.assign(req.body);
    console.log("有数据吗：", req.body);
    // user.thumbnail 
    UserService.create(user)
    .then((result)=>{
        console.log("注册成功：", result.username);
        let jwt = new JWT({uid: result._id,email:result.email});
        let token = jwt.generateToken();
        comfirmEmail(result.username,token,result.email)
        .then(()=>{
            res.send({error:null, result:{username:result.username, _id: result._id,token:token}});
        })
        .catch((e)=>{
            res.send({error:e, result:null, state:404});
        });
    })
    .catch((err)=>{
        console.log("报错：", err);
        res.send({error:err, result:null});4
    })
}


function comfirmEmail(username,token, useremail) {
    var deferred = Q.defer();

    // let comfirmUrl = "http://106.15.124.119:8808/confirm";
    let comfirmUrl = "http://127.0.0.1:8080/confirm";

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
///////////////////////图片上传功能的实现部分的开始//////////////
///配置部分
//var express = require('express');
var multer = require('multer');//用于上传图片
var bodyParser = require('body-parser');// 如果使用POST方法，就必须导入bodyParser,body-parser请求体解析模块
var web =app;// express();

web.use(express.static('myData'));// 设置服务器静态文件夹,里面的文件都是呈现给人们看的网页
web.use(bodyParser.urlencoded({extended:false}));// 插入中间件 ,bodyParser.urlencoded 用来解析 request 中的body中的urlencoded字符
///上传下载部分
var fullName = '';
var headerConfig = multer.diskStorage({
    destination: 'myData/user_resource',// destination目的地//设置存储的地方
    filename: function (req, file, callback) {// fliename 文件名 后面跟函数// file为当前上传的图片 

        var nameArray = file.originalname.split('.');//  1.选找到图片的名字,并进行分割
        var type = nameArray[nameArray.length - 1];// 先获取原来图片的后缀名
        fullName =req.query.pic_name+'.jpg';// '.' + type;// 新的名字
        callback(null, fullName)// 设置回调的内容,参数1：错误信息，参数2：图片新的名字
    }
});
var upload = multer({storage:headerConfig});// 上传完照片后要使用的配置信息
web.post('/upload',upload.single('photo'),function(req,res){//photo 为前端上传图像的input标签的name值
    res.send('');
})
web.get('/getMyHeader',function(req,res){
    res.send('headers/'+ fullName)
})
function deleteFolder(path) {// 删除指定文件夹的图片
  var files = [];//path='myData/user_resource';
  if (fs.existsSync(path)) {console.log(path);console.log(fs.existsSync(path));
    if (fs.statSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
    } 
  }
}
///发布部分
server.listen(port,config.ip,() => {
    console.log(`App listening at port:` + config.ip +':'+ port);
});
///////////////////////图片上传功能的实现部分的结束//////////////