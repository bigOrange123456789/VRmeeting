//窗体
function document_color(color){//窗体颜色设置
    document.body.style.background=color;
}
//div面板
function div(width,height,x,y,colour,border_colour,border_w){
    if(typeof(x)=='undefined')x=0;
    if(typeof(y)=='undefined')y=0;
    if(typeof(colour)=='undefined')colour='#01f';
    if(typeof(border_colour)=='undefined')border_colour='#01f';
    if(typeof(border_w)=='undefined')border_w=0;
    var oPanel=document.createElement('div');
    oPanel.style.cssText='width:300px;'+
        'background:'+colour+';'+//背景颜色
        'width:'+width+'px;height:'+height+'px;'+//面板大小
        'position:absolute;'+//位置可变
        'left:'+x+'px;'+//到部件左边距离
        'top:'+y+'px;'; //到部件右边 距离
        'border:100px solid '+'#0ff'+';'+//显示边框
        'margin:50px auto;'+//居于窗口中间
        'text-align:center;'+//内部文本居中
        'position:relative;';
        //'overflow:hidden;';//超出部分隐藏
    document.body.appendChild(oPanel);//document.body浏览器窗口
    return oPanel;
}
function Div(width,height,x,y,colour){//面板
    if(typeof(x)=='undefined')x=0;
    if(typeof(y)=='undefined')y=0;
    if(typeof(colour)=='undefined')colour='#01f';
    this.panel=div(width,height,x,y,colour);//div(width,height);
    this.x=x;
    this.y=y;
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
    'left:'+(-10)+'px;'+//到部件左边距离
    'top:'+(-10)+'px;'; //到部件右边 距离
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
    //+'padding-top:50px;'//距离上一个对象的距离
    //'left:'+(-50)+'px;'+//到部件左边距离
    //'top:'+(0)+'px;'; //到部件右边 距离
    ;
    parentNode.appendChild(oText);
    return oText;
}
function H1(html,color,size,parentNode){//构造函数//文本
    this.html=html;this.color=color;this.size=size;
    this.oText=h1(html,color,size,parentNode);
    this.reText=function(text){
        this.text=text;
        this.oText=h1(html,color,size,parentNode);
    }
}
function Span(html,color,size,parentNode){//构造函数//文本
    this.html=html;this.color=color;this.size=size;
    this.span=span(html,color,size,parentNode);
    this.reHtml=function(text){
        this.html=text;
        this.span.innerHTML=text;
    }
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
    if(typeof(parent)=='undefined')parent=document.body;
    var img=new Image();
    img.src=src;
    img.width=w;
    img.height=h;
    img.style.cssText='display:block;'+
        'position:absolute;'+//位置可变
        'left:'+x+'px;'+//到部件左边距离
        'top:'+y+'px;'; //到部件右边 距离
    parent.appendChild(img);
    //parent.appendChild(img);
    return img;
}
function validateImage(url)
    {    
        var xmlHttp ;
        if (window.ActiveXObject)
         {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
         }
         else if (window.XMLHttpRequest)
         {
          xmlHttp = new XMLHttpRequest();
         } 
        xmlHttp.open("Get",url,false);
        xmlHttp.send();
        if(xmlHttp.status==404)
        return false;
        else
        return true;
    }

function ImageMove(src,w,h,x,y,parent){//构造函数//添加的是image对象，而不是ImageMove对象
    if(typeof(parent)=='undefined')parent=document.body;
    this.w=w;
    this.h=h;
    this.x=x;//在parent中的位置
    this.y=y;//在parent中的位置
    this.img=image(src,w,h,x,y,parent);
    this.reImg=function(resrc){
             this.img.parentNode.removeChild(this.img);
             this.img=image(resrc,w,h,x,y);
        //this.img.src='img/death/sj.png';
    }
    this.resrc=function(src2){
        if(validateImage(src2))this.img.src=src2;//如果资源存在才进行操作
    }
    this.up=function(){this.up(1);}
    this.up=function(n){
        this.y-=n;
        this.img.style.top=this.y+'px';
    }
    this.down=function(){this.down(1);}
    this.down=function(n){this.up(-n);}
    this.left=function(n){
        this.x-=n;
        this.img.style.left=this.x+'px';
    }
    this.right=function(n){this.left(-n);}
    this.setXY=function(x,y){
        this.x=x;
        this.y=y;
        this.img.style.left=x+'px';
        this.img.style.top=y+'px';
    }
    this.setScale=function(w,h){
        this.w=w;
        this.h=h;
        this.img.width=w;
        this.img.height=h;
    }
    this.setScalePosition=function(w,h,x,y){
        this.w=w;
        this.h=h;
        this.img.width=w;
        this.img.height=h;
        this.x=x;
        this.y=y;
        this.img.style.left=x+'px';
        this.img.style.top=y+'px';
    }
    this.pointOnImg=function(x,y){
        if(x>this.x&&x<this.x+this.w
            &&y>this.y&&y<this.y+this.h)
            return true;
        else return false;
    }
    this.rePosition=function(){
        this.up(this.h/2);
        this.left(this.w/2);
    }
};