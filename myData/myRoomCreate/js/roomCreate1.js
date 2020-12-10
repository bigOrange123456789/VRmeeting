var this_user=storage.getUser(username);//包含了用户的全部信息
var room_number=0;
var room_all;
function change1(){
    document.getElementById('btn0').style="font-size:25px;width:180px;height:55px";
    document.getElementById('btn1').style="font-size:20px;width:180px;height:35px";
    document.getElementById("container").innerHTML = tbl1;
}
function change2(){
    window.location.href='roomCreate2.html';
}
function mydrop(i){
    drop({_id:room_all[i]._id},3);
    change2();
}
function myclick(n){
    document.getElementById("mypanel2").style.display = "block";
    var myroom_type = document.getElementById('room_type');
    document.getElementById("mytext_name").innerHTML =name_myMeeting[n-1];
    if(n<10)  myroom_type.value="00"+n;
    else myroom_type.value="0"+n;
}
var tbl1 = "<table border='1'>";//可供挑选的场景
for (var i = 0; i < 4; i++) {
    var td = "";
    for (var j = 0; j < 4; j++) {
        if(i==0&&j==0)        td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting01.png' onclick=myclick(1)>" + "</td>";
        else if(i==0&&j==1) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting02.png' onclick=myclick(2)>" + "</td>";
        else if(i==0&&j==2) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting03.png' onclick=myclick(3)>" + "</td>";
        else if(i==0&&j==3) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting04.png' onclick=myclick(4)>" + "</td>";
        else if(i==1&&j==0) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting05.png'onclick=myclick(5)>" + "</td>";
        else if(i==1&&j==1) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting06.png'onclick=myclick(6)>" + "</td>";
        else if(i==1&&j==2) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting07.png'onclick=myclick(7)>" + "</td>";
        else if(i==1&&j==3) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting08.png'onclick=myclick(8)>" + "</td>"
        else if(i==2&&j==0) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting09.png'onclick=myclick(9)>" + "</td>"
        else if(i==2&&j==1) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting10.png' onclick=myclick(10)>" + "</td>"
        else if(i==2&&j==2) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting11.png'onclick=myclick(11)>" + "</td>"
        else if(i==2&&j==3) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting12.png'onclick=myclick(12)>" + "</td>"
        else if(i==3&&j==0) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting13.png'onclick=myclick(13)>" + "</td>"
        else if(i==3&&j==1) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting14.png' onclick=myclick(14)>" + "</td>"
        else if(i==3&&j==2) td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting15.png'onclick=myclick(15)>" + "</td>"
        else                           td = td + "<td>" + "<img id='img0' width='200' height='100' src='../myMeeting/meeting/myMeeting16.png'onclick=myclick(16)>" + "</td>";
    }
    tbl1 = tbl1 + "<tr>" + td+ "</tr>";
}
tbl1 = tbl1 + "</table>";
var tbl2;//我创建的房间

document.getElementById("container").innerHTML = tbl1;
var btn0=document.getElementById('btn0');
var btn1=document.getElementById('btn1');
btn0.onclick = function(){
    change1();
};
btn1.onclick = function(){
    change2();
};
function mysubmit(){//提交之前要先进行编码，不然中文会乱码
    var myname = document.getElementById('myname');
    myname.value=escape(myname.value);
}
