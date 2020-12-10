var myW=window.innerWidth,myH=window.innerHeight;

var bg1=new ImageMove('avatarSelect/1.jpg',myW,myH,0,0);
var bg2=new ImageMove('avatarSelect/2.jpg',myW,myH,myW,0);
var bg3=new ImageMove('avatarSelect/3.jpg',myW,myH,myW*2,0);
var bg4=new ImageMove('avatarSelect/4.jpg',myW,myH,myW*3,0);

document.body.timer=setInterval(function(){//计时器
    bg1.left(1);if(bg1.x<=-myW)bg1.setXY(myW*3,0);
    bg2.left(1);if(bg2.x<=-myW)bg2.setXY(myW*3,0);
    bg3.left(1);if(bg3.x<=-myW)bg3.setXY(myW*3,0);
    bg4.left(1);if(bg4.x<=-myW)bg4.setXY(myW*3,0);
},10);
