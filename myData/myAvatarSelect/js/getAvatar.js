//开始获取用户的基本信息
var this_user=storage.getUser(username);//包含了用户的全部信息
//结束获取用户的基本信息
async function findAllAvatar(){//查
    var result=await asyncAxios.get(url + "/myavatar/myfind",{'user_id':this_user._id});
    for(var i=0;i<result.result.length;i++){
        if(result.result[i].index=='1'){
            avatar1.resrc('avatarSelect/avatar0.png');
            avatar1.resrc('../user_resource/avatar1_'+this_user._id+'.jpg');
            //avatar1.resrc('../user_resource/avatar1_'+this_user._id+'.png');
            avatar1.setScalePosition(myW/5.5,myH/2,myX0-myW/5,myY0);
            avatar1.rePosition();
            determine1.down(myH+1000);
            close1.down(myH+1000);
        }else if(result.result[i].index=='2'){
            avatar2.resrc('avatarSelect/avatar0.png');
            avatar2.resrc('../user_resource/avatar2_'+this_user._id+'.jpg');
            //avatar2.resrc('../user_resource/avatar2_'+this_user._id+'.png');
            avatar2.setScalePosition(myW/5.5,myH/2,myX0,myY0);
            avatar2.rePosition();
            determine2.down(myH+1000);
            close2.down(myH+1000);
        }else if(result.result[i].index=='3'){
            avatar3.resrc('avatarSelect/avatar0.png');
            avatar3.resrc('../user_resource/avatar3_'+this_user._id+'.jpg');
            //avatar3.resrc('../user_resource/avatar3_'+this_user._id+'.png');
            avatar3.setScalePosition(myW/5.5,myH/2,myX0+myW/5,myY0);
            avatar3.rePosition();
            determine3.down(myH+1000);
            close3.down(myH+1000);
        }
    }
}findAllAvatar();

document.body.onmousemove=function(e){
    var x=e.pageX;
    var y=e.pageY;
    if(roomJoin.pointOnImg(x,y))roomJoin.resrc('avatarSelect/roomJoin2.png');
    else roomJoin.resrc('avatarSelect/roomJoin.png');
    if(roomCreate.pointOnImg(x,y))roomCreate.resrc('avatarSelect/roomCreate2.png');
    else roomCreate.resrc('avatarSelect/roomCreate.png');
    if(determine1.pointOnImg(x,y))determine1.resrc('avatarSelect/determine2.png');
    else determine1.resrc('avatarSelect/determine.png');
    if(determine2.pointOnImg(x,y))determine2.resrc('avatarSelect/determine2.png');
    else determine2.resrc('avatarSelect/determine.png');
    if(determine3.pointOnImg(x,y))determine3.resrc('avatarSelect/determine2.png');
    else determine3.resrc('avatarSelect/determine.png');
};
document.body.onmouseup=function(e){
    var x=e.pageX;
    var y=e.pageY;
    if(!panel0.pointOnImg(x,y)){
        panel0.setScale(0,0);
        roomJoin.setScale(0,0);
        roomCreate.setScale(0,0);
    }

    if(roomJoin.pointOnImg(x,y))window.location.href='../myRoomJoin/roomJoin.html?myIndex='+determine_index;
    else if(roomCreate.pointOnImg(x,y))window.location.href='../myRoomCreate/roomCreate.html?myIndex='+determine_index;
    else if(panel0.pointOnImg(x,y));//点到窗口中的空白部分
    else if(back.pointOnImg(x,y))window.location.href='../myLogin/index.html';
    else if(card.pointOnImg(x,y))window.location.href='../myCard/card.html';
    else if(determine1.pointOnImg(x,y)){
        panel0.setScale(myW/4,myH/4);
        roomJoin.setScale(myW/15,myH/15);
        roomCreate.setScale(myW/15,myH/15);
        determine_index=1;
    }else if(determine2.pointOnImg(x,y)){
        panel0.setScale(myW/4,myH/4);
        roomJoin.setScale(myW/15,myH/15);
        roomCreate.setScale(myW/15,myH/15);
        determine_index=2;
    }else if(determine3.pointOnImg(x,y)){
        panel0.setScale(myW/4,myH/4);
        roomJoin.setScale(myW/15,myH/15);
        roomCreate.setScale(myW/15,myH/15);
        determine_index=3;
    }else if(close1.pointOnImg(x,y)){
        drop({'user_id':this_user._id,'index':1},2);
        window.location.href='avatarSelect.html';
    }else if(close2.pointOnImg(x,y)){
        drop({'user_id':this_user._id,'index':2},2);
        window.location.href='avatarSelect.html';
    }else if(close3.pointOnImg(x,y)){
        drop({'user_id':this_user._id,'index':3},2);
        window.location.href='avatarSelect.html';
    }else if(avatar1.pointOnImg(x,y))window.location.href='../myAvatarCustomization/index.html?myIndex=1';
    else if(avatar2.pointOnImg(x,y))window.location.href='../myAvatarCustomization/index.html?myIndex=2';
    else if(avatar3.pointOnImg(x,y))window.location.href='../myAvatarCustomization/index.html?myIndex=3';


};