var myW=window.innerWidth,myH=window.innerHeight;
var back=new ImageMove('avatarEdit/back.png',       myH/11, myH/11,myW/25, myH/19 );

/*var body   =new ImageMove('avatarEdit/select/body.png',    myH/11, myH/12, myW/15, myH/4 );
var arm   =new ImageMove('avatarEdit/select/arm.png',    myH/11, myH/12, myW/15, myH/4+ myH/11 );
var leg   =new ImageMove('avatarEdit/select/leg.png',    myH/11, myH/12, myW/15, myH/4+2* myH/11 );
var weather=new ImageMove('avatarEdit/select/weather.png', myH/11, myH/12, myW/15, myH/4+3* myH/11 );*/

var determine=new ImageMove('avatarEdit/determine.png', myH/11, myH/11, myW/2- myH/5/2  +350, myH- myH/8 );
//var random=new ImageMove('avatarEdit/random.png'	  , myH/11, myH/11, myW/2- myW/5.5/2+300,50 );
//var revoke=new ImageMove('avatarEdit/revoke.png'	  , myH/11, myH/11, myW/2- myW/5.5/2+400,50 );


/*var myBodyPanel=div(myH/3, myH/2, myW/7, myH/4.2,'#0ff','#eff',10);//document.createElement('div');
var myArmPanel=div(myH/3, myH/2, myW/7, myH/4.2,'#0ff','#eff',10);
var myLegPanel=div(myH/3, myH/2, myW/7, myH/4.2,'#0ff','#eff',10);
document.body.appendChild(myBodyPanel);
document.body.appendChild(myArmPanel);
document.body.appendChild(myLegPanel);
function displayBodyPanel(){
    myBodyPanel.style.visibility="visible";
    myArmPanel.style.visibility="hidden";
    myLegPanel.style.visibility="hidden";
    body.reImg('avatarEdit/select/body2.png');
    arm.reImg('avatarEdit/select/arm.png');
    leg.reImg('avatarEdit/select/leg.png');
}displayBodyPanel();
function displayArmPanel(){
    myBodyPanel.style.visibility="hidden";
    myArmPanel.style.visibility="visible";
    myLegPanel.style.visibility="hidden";
    body.reImg('avatarEdit/select/body.png');
    arm.reImg('avatarEdit/select/arm2.png');
    leg.reImg('avatarEdit/select/leg.png');
}
function displayLegPanel(){
    myBodyPanel.style.visibility="hidden";
    myArmPanel.style.visibility="hidden";
    myLegPanel.style.visibility="visible";
    body.reImg('avatarEdit/select/body.png');
    arm.reImg('avatarEdit/select/arm.png');
    leg.reImg('avatarEdit/select/leg2.png');
}*/


/*document.body.onmousedown=function(e){
    var x=e.pageX;
    var y=e.pageY;
    if(body.pointOnImg(x,y)){
        displayBodyPanel();
    }else if(arm.pointOnImg(x,y)){
        displayArmPanel();
    }else if(leg.pointOnImg(x,y)){
        displayLegPanel();
    }else if(weather.pointOnImg(x,y)){
    }
};*/
//开始获取用户的基本信息
var this_user=storage.getUser(username);//包含了用户的全部信息
//var user_id=this_user._id;
//结束获取用户的基本信息
//开始地址栏中的参数
function UrlSearch()
{
    var name,value;
    var str=unescape(location.href); //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=unescape(value);
        }
    }
}
var myRequest=new UrlSearch(); //实例化
//alert(myRequest.myIndex);
//完成读取地址栏中的数据

//////////////////////////////////////////下面开始过渡界面部分////////////////////////////
//// if(typeof(mypanel10)!='undefined')mypanel10.style.display="none"; 
let mypanel10 = document.createElement('div');
mypanel10.style = 'position:fixed;left:0px;top:-20px;margin-top:20px;border:5px solid #0ff;width:1197px;height:700px;background: #ffffff;display:block;';
document.body.appendChild(mypanel10);
mypanel10.style.width=window.innerWidth-20+'px';
mypanel10.style.height=window.innerHeight-10+'px';
//天空盒开始
var myW=window.innerWidth,myH=window.innerHeight;

var bg1=new ImageMove('avatarEdit/bg.png',myW,myH,0,0,mypanel10);
/*var bg2=new ImageMove('avatarEdit/2.png',myW,myH,myW,0,mypanel10);
var bg3=new ImageMove('avatarEdit/3.png',myW,myH,myW*2,0,mypanel10);
var bg4=new ImageMove('avatarEdit/4.png',myW,myH,myW*3,0,mypanel10);
document.body.timer=setInterval(function(){//计时器
    bg1.left(5);if(bg1.x<=-myW)bg1.setXY(myW*3,0);
    bg2.left(5);if(bg2.x<=-myW)bg2.setXY(myW*3,0);
    bg3.left(5);if(bg3.x<=-myW)bg3.setXY(myW*3,0);
    bg4.left(5);if(bg4.x<=-myW)bg4.setXY(myW*3,0);
},10);*/
//天空盒结束
let mypanel12 = document.createElement('div');
mypanel12.style = 'position:fixed;left:0px;top:-20px;margin-top:20px;border:10px solid #0ff;width:1197px;height:700px;display:block;';
document.body.appendChild(mypanel12);
mypanel12.style.width=window.innerWidth-23+'px';
mypanel12.style.height=window.innerHeight-20+'px';
mypanel10.appendChild(mypanel12);

var myfirsttext=document.createElement('h1');
myfirsttext.innerHTML='正在加载3D资源，请稍等！';
myfirsttext.style="font-size:30px;color:#e00;position:fixed;top:"+(myH/2-60)+"px;left:"+(myW/2-150)+"px;";
mypanel12.appendChild(myfirsttext);
function ffff(str){
    var mysecondtext=document.createElement('h1');
    mysecondtext.innerHTML=str;
    mysecondtext.style="font-size:50px;color:#e00;position:fixed;top:"+(myH/2-150)+"px;left:"+(myW/2-150)+"px;";
    mypanel12.appendChild(mysecondtext);
}
//////////////////////////////////////////过渡界面部分结束////////////////////////////