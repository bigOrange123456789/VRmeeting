var myW=window.innerWidth,
    myH=window.innerHeight,
    myX0=window.innerWidth/2,myY0=window.innerHeight/2;
var determine_index=1;



var avatar1=new ImageMove('avatarSelect/add.png',myH/7,myH/7,myX0-myW/5,myY0);//new ImageMove('avatarSelect/avatar0.png',myW/5.5,myH/2,myX0,myY0);
var avatar2=new ImageMove('avatarSelect/add.png',myH/7,myH/7,myX0,myY0);
var avatar3=new ImageMove('avatarSelect/add.png',myH/7,myH/7,myX0+myW/5,myY0);

var close1=new ImageMove('avatarSelect/icon_close.png',myH/25,myH/25,myX0-myW/5,myY0);
var close2=new ImageMove('avatarSelect/icon_close.png',myH/25,myH/25,myX0 ,myY0);
var close3=new ImageMove('avatarSelect/icon_close.png',myH/25,myH/25,myX0+myW/5,myY0);

var back=new ImageMove('avatarSelect/back.png',      myH/11,myH/11,myW/25,myH/19);
var card=new ImageMove('avatarSelect/card.png',      myH/11,myH/15,myX0,myY0-myH/3);

var determine1=new ImageMove('avatarSelect/determine.png',myH/5,myH/11,myW/2-myW/5,myH-myH/7);
var determine2=new ImageMove('avatarSelect/determine.png',myH/5,myH/11,myW/2,myH-myH/7);
var determine3=new ImageMove('avatarSelect/determine.png',myH/5,myH/11,myW/2+myW/5,myH-myH/7);



var panel0=new ImageMove('avatarSelect/panel.png',myW/4,myH/4,myX0,myY0);
var roomJoin    =new ImageMove('avatarSelect/roomJoin.png',myW/15,myH/15,myX0-myW/15,myY0+myH/13);
var roomCreate=new ImageMove('avatarSelect/roomCreate.png',myW/15,myH/15,myX0+myW/15,myY0+myH/13);

avatar1.rePosition();
avatar2.rePosition();
avatar3.rePosition();
//back.rePosition();
card.rePosition();
determine1.rePosition();
determine2.rePosition();
determine3.rePosition();

panel0.rePosition();
roomJoin.rePosition();
roomCreate.rePosition();

close1.up(myH/4+myH+1000);
close2.up(myH/4+myH+1000);
close3.up(myH/4+myH+1000);
close1.right(myW/11-myH/25);
close2.right(myW/11-myH/25);
close3.right(myW/11-myH/25);

determine1.up(myH+1000);
determine2.up(myH+1000);
determine3.up(myH+1000);

panel0.setScale(0,0);
roomJoin.setScale(0,0);
roomCreate.setScale(0,0);