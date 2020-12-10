﻿if(typeof(storage)!='undefined'){
    //开始获取用户的基本信息
	var this_user = storage.getUser(username);//包含了用户的全部信息
	var user_id = this_user._id;
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
	var member_num=myRequest.member_num;
	var room_id=myRequest.room_id;
	var mypassword=myRequest.mypassword;
	var thisuser_identity=1;
	async function judge_user_identity(){
		result = await asyncAxios.get(url + "/myroom/myfind", {'_id':room_id});
		if(typeof(myRequest.mypassword)=='undefined'){
			thisuser_identity=0;ffff('欢迎您，创办者！');
		}else if(myRequest.mypassword==result.result[0].password1){
			thisuser_identity=1;ffff('欢迎您，参会者！');
		} else if(myRequest.mypassword==result.result[0].password2){
			thisuser_identity=2;ffff('欢迎您，演讲者！');
		} else if(myRequest.mypassword==result.result[0].password3){
			thisuser_identity=3;ffff('欢迎您，管理员！');
		}
		else {
			thisuser_identity=-1;
			alert('密码错误');
			window.location.href='../../myRoomJoin/roomJoin.html';
		}
	}judge_user_identity();
	//完成读取form表单提交的数据
}//if(typeof(storage)!='undefined')


//窗体
function document_color(color){//窗体颜色设置
	document.body.style.background=color;
}
//div面板
//function div(width,height){}
function div(width,height){
	var oPanel=document.createElement('div');
	oPanel.style.cssText='width:300px;'+
	   //'background:#01f;'+//背景颜色
	   'width:'+width+'px;height:'+height+'px;'+//面板大小
	   //'border:1px solid #fff;'+//显示边框
	   'margin:0px auto;'+//居于窗口中间
	   'text-align:center;'+//内部文本居中
					  'position:fixed;'+//到窗体的位置
		  			  'left:'+(window.innerWidth/2-80)+'px;'+//到部件左边距离
					  'top:'+10+'px;'; //到部件右边 距离
	   'overflow:hidden;';//超出部分隐藏
	document.body.appendChild(oPanel);//document.body浏览器窗口	
	return oPanel;
}
//文本
function h1(html,color,size,parentNode){
	var oText=document.createElement('h1');
	oText.innerHTML=html;
	oText.style.cssText='color:'+color+';'+//文字颜色
						//'background:#aff;'+//背景颜色
						'font-size:'+size+'px;'+//文字大小
						//'width:60px;height:40px;'+//文本大小
						'font-weight:normal;'
						//+'padding-top:50px;'//距离上一个对象的距离
					  //'position:fixed;'+//到窗体的位置
		  			  //'left:'+0+'px;'+//到部件左边距离
					  //'top:'+0+'px;'; //到部件右边 距离
						;
	parentNode.appendChild(oText);
	return oText;
}
function span(html,color,size,parentNode){
	var oText=document.createElement('span');
	oText.innerHTML=html;
	oText.style.cssText='position:absolute;'+
						'color:'+color+';'+//文字颜色
						//'background:#aff;'+//背景颜色
						'font-size:'+size+'px;'+//文字大小size
						//'width:60px;height:40px;'+//文本大小
						'font-weight:normal;'
					  'position:fixed;'+//到窗体的位置
		  			  'left:'+x+'px;'+//到部件左边距离
					  'top:'+y+'px;'; //到部件右边 距离
						//+'padding-top:50px;'//距离上一个对象的距离
						//'left:'+(-50)+'px;'+//到部件左边距离
					  //'top:'+(0)+'px;'; //到部件右边 距离
						;
	parentNode.appendChild(oText);
	return oText;
}
//按钮
function p(html,color,background,size,width,height,parentNode){
	var oButton=document.createElement('p');//按钮
	oButton.innerHTML=html;
	oButton.style.cssText='font-size:'+size+'px;'//字体大小
					+'width:'+width+'px;height:'+height+'px;'//按钮大小
					+'color:'+color+';'//字体颜色
					+'background:'+background+';'//按钮颜色
					+'margin:20px auto;'
					+'text-align:center;'
					+'line-height:40px;'
					//+'cursor:pointer;'
	parentNode.appendChild(oButton);
	return oButton;
}
//图片
function image(src,w,h,x,y,parent){
	var img=new Image();
	img.src=src;
	img.width=w;
	img.height=h;
	img.style.cssText='display:block;'+
		              'z-index:5'+
					  'position:fixed;'+//到窗体的位置
		  			  'left:'+x+'px;'+//到部件左边距离
					  'top:'+y+'px;'; //到部件右边 距离
	parent.appendChild(img);
	return img;
}
//构造函数
function Div(width,height){//面板
	this.panel=div(width,height);//div(width,height);
	this.w=width;
	this.h=height;
	//this.x=this.panel.offsetLeft;
	//this.y=this.panel.offsetTop; 
	this.border=this.panel.style.borderWidth;
	this.getX=function(){
		return this.panel.offsetLeft;
	}
	this.getY=function(){
		return this.y=this.panel.offsetTop; 
	}
}
function H1(html,color,size,parentNode){//文本
	this.html=html;this.color=color;this.size=size;
	this.oText=h1(html,color,size,parentNode);
	this.reText=function(text){
		this.text=text;
		this.oText=h1(html,color,size,parentNode);
	}	
}
function Span(html,color,size,parentNode){//文本
	this.html=html;this.color=color;this.size=size;
	this.span=span(html,color,size,parentNode);
	this.reHtml=function(text){
		this.html=text;
		this.span.innerHTML=text;
	}	
}
function ImageMove(src,w,h,x,y,parent){//添加的是image对象，而不是ImageMove对象

    if (typeof(parent) == "undefined") parent = document.body;
    this.w = w;
    this.h = h;
    this.x = x;//在parent中的位置
    this.y = y;//在parent中的位置
    this.ratio = w / h;

    this.img = new Image();
    this.img.src = src;
    this.img.width = w;
    this.img.height = h;
    this.img.style.cssText = 'display:block;' +
        'position:absolute;' +//位置可变
        'left:' + x + 'px;' +//到部件左边距离
        'top:' + y + 'px;'; //到部件右边 距离
    parent.appendChild(this.img);

	this.reImg=function(resrc,w1,h1){
		if(typeof(w1)!="undefined")this.setW(w1);
		if(typeof(h1)!= "undefined")this.setH(h1);
		this.img.parent.removeChild(this.img);
		this.img=image(resrc,this.w,this.h,thi.x,this.y,parent);
		this.ratio=this.w/this.h;
	}
	this.setX=function(x){
		this.x=x;
		this.img.style.left=x+'px';
	}
	this.setY=function(y){
		this.y=y;
		this.img.style.top=y+'px';
	}
	this.setXY=function(x,y){
        this.x=x;
        this.img.style.left=x+'px';
        this.y=y;
        this.img.style.top=y+'px';
	}
	this.move=function(direction,step){
   		if(typeof(step) == "undefined")step=0.1;
		if(direction<0){//字母与数字比较大小结果始终为false
	 	    step*=-1;
		    direction*=-1;
		}
    		if(direction=='x'||direction==1)this.setX(this.x+step);
    		else if(direction=='y'||direction==2)this.setY(this.y+step);
	}
	this.setW=function(w){
		this.w=w;
		this.img.width=w;
	}
	this.setH=function(h){
		this.h=h;
		this.img.height=h;
	}
	this.left=function(n){
        this.x=this.x-n;
        this.img.style.left=this.x+'px';
	}
	this.scale=function(direction,step){//direction为3意思是成比例的放缩,ratio是w/h
		if(typeof(step) == "undefined")step=0.1;
		if(direction<0){//字母与数字比较大小结果始终为false
	 	    step*=-1;
		    direction*=-1;
		}
    		if(direction=='w'||direction==1)this.setW(this.w+step);
    		else if(direction=='h'||direction==2)this.setH(this.h+step);
    		else if(direction==3){this.setW(this.w+step);this.setH(this.h+step/this.ratio);}
	}
	this.hide_w0=w;
	this.hide=function(){
		this.setW(0);this.setH(0);
		clearInterval(this.img.timer);
	}
	this.discover=function(){
		var obj=this;
		obj.img.timer=setInterval(function(){//计时器
			if(obj.w<obj.hide_w0)obj.scale(3,1);
			else clearInterval(obj.img.timer);
		},0.001);
	}
	this.pointOnImg=function(x,y){
		if(x>this.x&&x<this.x+this.w
				&&y>this.y&&y<this.y+this.h)
				return true;
		else return false;
	}
};
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}
//document_color('#0a0');//窗体
var oPanel=new Div(window.innerWidth/8,window.innerHeight/17);//div面板
//var oText1=new H1('会议尚未开始','#e00',25,oPanel.panel);
//var announcement=new ImageMove('../meeting/announcement.png',window.innerHeight/3.5,window.innerHeight/14,window.innerWidth/2-window.innerHeight/3.5/2,window.innerHeight/9,document.body);
var back         =new ImageMove('../meeting/back.png',      window.innerHeight/11,window.innerHeight/11,window.innerWidth/25,window.innerHeight/19,document.body);
//var help         =new ImageMove('../meeting/help.png',      window.innerHeight/13,window.innerHeight/13,window.innerWidth-80,window.innerHeight-80,document.body);
//var administrator=new ImageMove('../meeting/administration.png',      window.innerHeight/5,window.innerHeight/11,window.innerWidth-130,window.innerHeight/19,document.body);
var camera       =new ImageMove('../meeting/camera.png',      window.innerHeight/13,window.innerHeight/13,window.innerWidth/25,window.innerHeight-80,document.body);
var camera2       =new ImageMove('../meeting/camera2.png',      window.innerHeight/13,window.innerHeight/13,window.innerWidth/25,window.innerHeight-80,document.body);
camera2.img.style.display='none';//left(10*myW);
//var microphone=new ImageMove('../meeting/microphone.png',      window.innerHeight/14,window.innerHeight/14,window.innerWidth/15+window.innerHeight-80,window.innerHeight-80,document.body);
//var expression=new ImageMove('../meeting/expression.png',      window.innerHeight/14,window.innerHeight/14,window.innerWidth/15+window.innerHeight,window.innerHeight-80,document.body);

var nod  =new ImageMove('../meeting/expression/nod.png', window.innerHeight/11,window.innerHeight/11,window.innerWidth/15+window.innerHeight+window.innerHeight/11*0.5,window.innerHeight-128,document.body);
var smile=new ImageMove('../meeting/expression/smile.png',window.innerHeight/11,window.innerHeight/11,window.innerWidth/15+window.innerHeight+window.innerHeight/11*1.5,window.innerHeight-128,document.body);
var wave =new ImageMove('../meeting/expression/wave.png', window.innerHeight/11,window.innerHeight/11,window.innerWidth/15+window.innerHeight+window.innerHeight/11*2.5,window.innerHeight-128,document.body);
nod.hide();
smile.hide();
wave.hide();

document.body.onmouseup=function(e){
	var x=e.pageX;
	var y=e.pageY;
	
	if(back.pointOnImg(x,y)){
        dropAndBack(user_id)
		//drop({'user_id':user_id},4);
		//window.location.href='../../myAvatarSelect/avatarSelect.html';
    }/*else if(expression.pointOnImg(x,y)){
		nod.discover();smile.discover();wave.discover();
	}else if(announcement.pointOnImg(x,y)){
        if(typeof(member_num)== "undefined")alert('Welcome to WebVR meeting!');
		else alert('房间的规模为：'+member_num+'人');
	}*/else if(nod.pointOnImg(x,y)||smile.pointOnImg(x,y)||wave.pointOnImg(x,y)){alert(123);
	}else{
		nod.hide();
		smile.hide();
		wave.hide();
	}
};
//camera.img.onclick=function(){alert(112233);}
//////////////////////////////////////////下面开始过渡界面部分////////////////////////////
let mypanel10 = document.createElement('div');
mypanel10.style = 'position:fixed;left:0px;top:-20px;margin-top:20px;border:5px solid #0ff;width:1197px;height:700px;background: #ffffff;display:block;';
document.body.appendChild(mypanel10);
mypanel10.style.width=window.innerWidth-20+'px';
mypanel10.style.height=window.innerHeight-10+'px';
//天空盒开始
var myW=window.innerWidth,myH=window.innerHeight;
var bg1=new ImageMove('../meeting/bg.png',myW,myH,0,0,mypanel10);//new ImageMove('../meeting/1.png',myW,myH,0,0,mypanel10);
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
//if(typeof(myfirsttext)!='undefined')myfirsttext.innerHTML='资源已加载，正在布置场景！';
//if(typeof(mypanel10)!='undefined')mypanel10.style.display="none";
//////////////////////////////////////////过渡界面部分结束////////////////////////////