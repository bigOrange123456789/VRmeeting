var wantJoinRoom=0;
var result;
var room_all;
var room_number;
async function myinit() {
    var myquery={};
    if(typeof(myRequest.search)!="undefined"){
        if(myRequest.search=="_id")myquery={_id:unescape(myRequest.condition)};
        else if(myRequest.search=="name")myquery={name:unescape(myRequest.condition)};
        else {
            var result0 = await asyncAxios.get(url + "/myuser/myfind", {username:unescape(myRequest.condition)});
            if(result0.result.length==0)myquery={_id:""};
            else myquery={user_id:result0.result[0]._id};
        }//myquery={user_name:Request.condition};
        console.log(myquery);
    }

    result = await asyncAxios.get(url + "/myroom/myfind", myquery);
    room_all = result.result;
    room_number=result.result.length;

    pageNum_max=Math.ceil(room_number/onePageRoomNumber);
    page_num.innerHTML='第'+pageNum+'/'+pageNum_max+'页';
    if(pageNum==1)btn_up_div.style.display="none";
    else btn_up_div.style.display="";
    if(pageNum==pageNum_max)btn_down_div.style.display="none";
    else btn_down_div.style.display="";

    var data0 = ['会议ID', '会议名称','会议类型','会议开始时间','会议结束时间', '创建者用户名','进入大会'];
    var tbl = "<table border='1'>";

    thisPageRoomNumber=0;
    var td = "";
    for (var j=0;j<data0.length; j++){td = td + "<td>" + data0[j] + "</td>";}
    tbl+=td;
    for (var i = 0;i<onePageRoomNumber&&showRoom<room_all.length; i++,showRoom++,thisPageRoomNumber++) {
        td = "";
            //console.log('showRoom:',showRoom);
            td = td + "<td>" + room_all[showRoom]._id + "</td>";//会议ID
            td = td + "<td>" + room_all[showRoom].name + "</td>";//会议名称
            if(room_all[showRoom].room_type=='001')td = td + "<td>" +name_myMeeting[0] + "</td>";
            else if(room_all[showRoom].room_type=='002')td = td + "<td>" +name_myMeeting[1] + "</td>";
            else if(room_all[showRoom].room_type=='003')td = td + "<td>" +name_myMeeting[2] + "</td>";
            else if(room_all[showRoom].room_type=='004')td = td + "<td>" +name_myMeeting[3] + "</td>";
            else if(room_all[showRoom].room_type=='005')td = td + "<td>" +name_myMeeting[4] + "</td>";
            else if(room_all[showRoom].room_type=='006')td = td + "<td>" +name_myMeeting[5] + "</td>";
            else if(room_all[showRoom].room_type=='007')td = td + "<td>" +name_myMeeting[6] + "</td>";
            else if(room_all[showRoom].room_type=='008')td = td + "<td>" +name_myMeeting[7] + "</td>";
            else if(room_all[showRoom].room_type=='009')td = td + "<td>" +name_myMeeting[8] + "</td>";
            else if(room_all[showRoom].room_type=='010')td = td + "<td>" +name_myMeeting[9] + "</td>";
            else if(room_all[showRoom].room_type=='011')td = td + "<td>" +name_myMeeting[10] + "</td>";
            else if(room_all[showRoom].room_type=='012')td = td + "<td>" +name_myMeeting[11] + "</td>";
            else if(room_all[showRoom].room_type=='013')td = td + "<td>" +name_myMeeting[12] + "</td>";
            else if(room_all[showRoom].room_type=='014')td = td + "<td>" +name_myMeeting[13] + "</td>";
            else if(room_all[showRoom].room_type=='015')td = td + "<td>" +name_myMeeting[14] + "</td>";
            else td = td + "<td>" +name_myMeeting[15]+ "</td>";
            td = td + "<td>" + room_all[showRoom].begin_time + "</td>";//会议开始时间
            td = td + "<td>" + room_all[showRoom].end_time + "</td>";//会议结束时间
            var result2 = await asyncAxios.get(url + "/myuser/myfind", {_id:room_all[showRoom].user_id});
            if(!result2.result||result2.result.length===0)td = td + "<td></td>";
            else td = td + "<td>" + result2.result[0].username + "</td>";

        tbl = tbl + "<tr>" + td
            + "<th>"
            +"<button onclick='joinMeeting("+showRoom+")'style='font-size:20px;width:100px;height:40px';>加入会议</button>"//这里不能传送中文，也不能传送%
            + "</th>"
            + "</tr>";
    }
    tbl = tbl + "</table>";
    document.getElementById("container").innerHTML = tbl;
}
//以下为点击加入会议按钮后的响应事件
async function joinMeeting(thisShowRoom){//(mytext1,mytext2,mytext3,mytext4,mytext5,mytext6,mytext7,member_num){
    document.getElementById("mytext1").innerHTML ="房间名称："+room_all[thisShowRoom].name;
    document.getElementById("mytext2").innerHTML ="场景类型："+room_all[thisShowRoom].room_type;
    if(room_all[thisShowRoom].room_type=='001')document.forms['form1'].action="../myMeeting/myMeeting01/index.html"
    else if(room_all[thisShowRoom].room_type=='002')document.forms['form1'].action="../myMeeting/myMeeting02/index.html"
    else if(room_all[thisShowRoom].room_type=='003')document.forms['form1'].action="../myMeeting/myMeeting03/index.html"
    else if(room_all[thisShowRoom].room_type=='004')document.forms['form1'].action="../myMeeting/myMeeting04/index.html"
    else if(room_all[thisShowRoom].room_type=='005')document.forms['form1'].action="../myMeeting/myMeeting05/index.html"
    else if(room_all[thisShowRoom].room_type=='006')document.forms['form1'].action="../myMeeting/myMeeting06/index.html"
    else if(room_all[thisShowRoom].room_type=='007')document.forms['form1'].action="../myMeeting/myMeeting07/index.html"
    else if(room_all[thisShowRoom].room_type=='008')document.forms['form1'].action="../myMeeting/myMeeting08/index.html"
    else if(room_all[thisShowRoom].room_type=='009')document.forms['form1'].action="../myMeeting/myMeeting09/index.html"
    else if(room_all[thisShowRoom].room_type=='010')document.forms['form1'].action="../myMeeting/myMeeting10/index.html"
    else if(room_all[thisShowRoom].room_type=='011')document.forms['form1'].action="../myMeeting/myMeeting11/index.html"
    else if(room_all[thisShowRoom].room_type=='012')document.forms['form1'].action="../myMeeting/myMeeting12/index.html"
    else if(room_all[thisShowRoom].room_type=='013')document.forms['form1'].action="../myMeeting/myMeeting13/index.html"
    else if(room_all[thisShowRoom].room_type=='014')document.forms['form1'].action="../myMeeting/myMeeting14/index.html"
    else if(room_all[thisShowRoom].room_type=='015')document.forms['form1'].action="../myMeeting/myMeeting15/index.html"
    else if(room_all[thisShowRoom].room_type=='016')document.forms['form1'].action="../myMeeting/myMeeting16/index.html"
    document.getElementById("mytext3").innerHTML ="会议规模："+room_all[thisShowRoom].member_num+"人";
    document.getElementById("mytext4").innerHTML ="开始时间："+room_all[thisShowRoom].begin_time;
    document.getElementById("mytext5").innerHTML ="结束时间："+room_all[thisShowRoom].end_time;

    var result2 = await asyncAxios.get(url + "/myuser/myfind", {_id:room_all[thisShowRoom].user_id});
    document.getElementById("mytext6").innerHTML ="创建者名称："+result2.result[0].username;
    document.getElementById("mytext7").innerHTML ="创建者ID："+room_all[thisShowRoom].user_id;


    document.getElementById("room_id").value=room_all[thisShowRoom]._id;
    document.getElementById("member_num0").value=room_all[thisShowRoom].member_num;
    document.getElementById("thisShowRoom").value=thisShowRoom;

    document.getElementById("mypanel2").style.display="block";
}
function myJoinRoomSubmit(){
    var thisShowRoom=document.getElementById("thisShowRoom").value;
    if(document.getElementById("mypassword").value==room_all[thisShowRoom].password1)document.getElementById("member_num0").value=1;
    else if(document.getElementById("mypassword").value==room_all[thisShowRoom].password2)document.getElementById("member_num0").value=2;
    else if(document.getElementById("mypassword").value==room_all[thisShowRoom].password3)document.getElementById("member_num0").value=3;
    else document.getElementById("member_num0").value=-1;
    alert(document.getElementById("member_num0").value);
}
//以下为正式开始执行的代码
var showRoom=0;//记录已经在房间上显示的房间个数
var onePageRoomNumber=13;//一个页面最多可以显示的行数
var thisPageRoomNumber=0;//当前页面的行数
var pageNum=1;
var pageNum_max=1;//=Math.ceil();
myinit();
btn_up.onclick = function(){
    showRoom=showRoom-onePageRoomNumber-thisPageRoomNumber;
    myinit();
    pageNum--;
    page_num.innerHTML='第'+pageNum+'/'+pageNum_max+'页';
};
btn_down.onclick = function(){
    myinit();
    pageNum++;
    page_num.innerHTML='第'+pageNum+'/'+pageNum_max+'页';
};

