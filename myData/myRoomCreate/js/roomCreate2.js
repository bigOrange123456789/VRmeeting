//开始读取form表单提交的数据
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
console.log(myRequest);
//完成读取form表单提交的数据

//开始向数据库中插入数据
var this_user=storage.getUser(username);//包含了用户的全部信息
var room_number=0;
var room_all;
if(typeof(myRequest.room_type)!= "undefined"){
    //console.log({name:myRequest.myname, user_id:this_user._id, room_type:myRequest.room_type, begin_time:myRequest.mybegin_time, end_time:myRequest.myend_time, member_num:myRequest.mymember_num, password1:myRequest.mypassword1, password2:myRequest.mypassword2, password3: myRequest.mypassword3});
    insert( {name:myRequest.myname, user_id:this_user._id, room_type:myRequest.room_type, begin_time:myRequest.mybegin_time, end_time:myRequest.myend_time, member_num:myRequest.mymember_num, password1:myRequest.mypassword1, password2:myRequest.mypassword2, password3: myRequest.mypassword3} ,3);
}
//完成向数据库中插入数据


var showRoom=0;//记录已经在房间上显示的房间个数
var onePageRoomNumber=10;//一个页面最多可以显示的行数
var thisPageRoomNumber=0;//当前页面的行数
var pageNum=1;
var pageNum_max=1;//=Math.ceil();
function change1(){
    window.location.href='roomCreate.html';
}
async function myinit(){//主要功能是从数组中读取一页显示出来
    console.log('myinit:',showRoom);
    var result=await asyncAxios.get(url + "/myroom/myfind",{"user_id":this_user._id});
    room_all=result.result;
    room_number=result.result.length;
    pageNum_max=Math.ceil(room_number/onePageRoomNumber);
    page_num.innerHTML='第'+pageNum+'/'+pageNum_max+'页';
    var btn_up_div= document.getElementById('btn_up_div');
    var btn_down_div= document.getElementById('btn_down_div');
    if(pageNum==1)btn_up_div.style.display="none";
    else btn_up_div.style.display="";
    if(pageNum==pageNum_max)btn_down_div.style.display="none";
    else btn_down_div.style.display="";

    if(room_number==0){
        alert("您还没有创建房间！");window.location.href='roomCreate.html';
    }else{
        tbl2 = "<font color='white'><table border='1'align='center'>";
        var td = "";
        td =td + "<td>" +'快速加入'+ "</td>";
        td =td + "<td><div style='width:100px;height:20px;' align='center'>房间ID</div></td>";
        td =td + "<td><div style='width:110px;height:20px;' align='center'>房间名称</div></td>";
        td =td + "<td><div style='width:70px;height:20px;'>会议规模</div></td>";
        td =td + "<td><div style='width:100px;height:20px;'>普通参会密码</div></td>";
        td =td + "<td><div style='width:85px;height:20px;'>演讲者密码</div></td>";
        td =td + "<td><div style='width:85px;height:20px;'>管理员密码</div></td>";
        td =td + "<td><div style='width:70px;height:20px;'>房间设置</div></td>";
        td =td + "<td><div style='width:70px;height:20px;'>删除房间</div></td>";
        tbl2 = tbl2 +"<tr>"+td +"</tr>";
        thisPageRoomNumber=0;
        for (var i=0; i<onePageRoomNumber&&showRoom<room_number; i++,showRoom++,thisPageRoomNumber++) {
            var condition={_id:result.result[showRoom]._id};
            td = "";
            if(result.result[showRoom].room_type=='001')td =td + "<td>" + "<a href='../myMeeting/myMeeting01/index.html?member_num="+room_all[showRoom].member_num+"'><img width='100' height='50' src='../myMeeting/meeting/myMeeting01.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='002')td =td + "<td>" + "<a href='../myMeeting/myMeeting02/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting02.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='003')td =td + "<td>" + "<a href='../myMeeting/myMeeting03/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting03.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='004')td =td + "<td>" + "<a href='../myMeeting/myMeeting04/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting04.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='005')td =td + "<td>" + "<a href='../myMeeting/myMeeting05/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting05.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='006')td =td + "<td>" + "<a href='../myMeeting/myMeeting06/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting06.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='007')td =td + "<td>" + "<a href='../myMeeting/myMeeting07/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting07.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='008')td =td + "<td>" + "<a href='../myMeeting/myMeeting08/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting08.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='009')td =td + "<td>" + "<a href='../myMeeting/myMeeting09/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting09.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='010')td =td + "<td>" + "<a href='../myMeeting/myMeeting10/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting10.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='011')td =td + "<td>" + "<a href='../myMeeting/myMeeting11/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting11.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='012')td =td + "<td>" + "<a href='../myMeeting/myMeeting12/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting12.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='013')td =td + "<td>" + "<a href='../myMeeting/myMeeting13/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting13.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='014')td =td + "<td>" + "<a href='../myMeeting/myMeeting14/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting14.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='015')td =td + "<td>" + "<a href='../myMeeting/myMeeting15/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting15.png'></a>" + "</td>";
            else if(result.result[showRoom].room_type=='016')td =td + "<td>" + "<a href='../myMeeting/myMeeting16/index.html'><img width='100' height='50' src='../myMeeting/meeting/myMeeting16.png'></a>" + "</td>";
            td =td + "<td>" +room_all[showRoom]._id+ "</td>";//房间id
            td =td + "<td>" +room_all[showRoom].name+ "</td>";//房间名称
            td =td + "<td>" +room_all[showRoom].member_num+ "人</td>";//房间名称
            td =td + "<td>" +room_all[showRoom].password1+ "</td>";//普通参会密码
            td =td + "<td>" +room_all[showRoom].password2+ "</td>";//演讲者密码
            td =td + "<td>" +room_all[showRoom].password3+ "</td>";//管理员密码
            td =td + "<td  align='center'>" + "<img width='50' height='50' src='roomCreate/set.jpg' onclick=myupdateRoom("+showRoom+")>" + "</td>";//房间设置
            td =td + "<td  align='center'>" + "<img width='50' height='50' src='roomCreate/delete.png'onclick=mydrop("+showRoom+")>" + "</td>";//HTML部分会被先执行//问题是这里的i只会被加载一次
            tbl2 = tbl2 +"<tr>"+td +"</tr>";
        }
        tbl2 = tbl2 + "</table></font>";
        btn0.style="font-size:20px;width:180px;height:35px";
        btn1.style="font-size:25px;width:180px;height:55px";
        document.getElementById("container").innerHTML = tbl2;
    }
}
myinit();
function mydrop(showRoom0){
    drop({_id:room_all[showRoom0]._id},3);
    showRoom=showRoom-thisPageRoomNumber;
    if(thisPageRoomNumber==1&&pageNum!=1){
        showRoom=showRoom-onePageRoomNumber;
        pageNum--;pageNum_max--;
        page_num.innerHTML='第'+pageNum+'/'+pageNum_max+'页';
    }
    myinit();
}
function myupdateRoom(showRoom0){
    document.getElementById("my_id").value=room_all[showRoom0]._id;
    //console.log(room_all[showRoom0]._id);
    document.getElementById("myroom_type").value=room_all[showRoom0].room_type;
    document.getElementById("myname").value=room_all[showRoom0].name;
    document.getElementById("mymember_num").value=room_all[showRoom0].member_num;
    document.getElementById("mybegin_time").value=room_all[showRoom0].begin_time;
    document.getElementById("myend_time").value=room_all[showRoom0].end_time;
    document.getElementById("mypassword1").value=room_all[showRoom0].password1;
    document.getElementById("mypassword2").value=room_all[showRoom0].password2;
    document.getElementById("mypassword3").value=room_all[showRoom0].password3;
    document.getElementById("myupdatePanel").style.display="block";
    //alert(showRoom0);
}
function mymakeUpdate(){
    var my_id=document.getElementById("my_id").value;
    var myroom_type=document.getElementById("myroom_type").value;
    var myname=document.getElementById("myname").value;
    var mymember_num=document.getElementById("mymember_num").value;
    var mybegin_time=document.getElementById("mybegin_time").value;
    var myend_time=document.getElementById("myend_time").value;
    var mypassword1=document.getElementById("mypassword1").value;
    var mypassword2=document.getElementById("mypassword2").value;
    var mypassword3=document.getElementById("mypassword3").value;

    update(my_id,'name',myname,3);
    update(my_id,'room_type',myroom_type,3);
    update(my_id,'member_num',mymember_num,3);
    update(my_id,'begin_time',mybegin_time,3);
    update(my_id,'end_time',myend_time,3);
    update(my_id,'password1',mypassword1,3);
    update(my_id,'password2',mypassword2,3);
    update(my_id,'password3',mypassword3,3);
    document.getElementById("myupdatePanel").style.display="none";

    showRoom=showRoom-thisPageRoomNumber;
    myinit();
}
var tbl1;//可供挑选的场景
var tbl2;//我创建的房间

document.getElementById("container").innerHTML = tbl1;
var btn0=document.getElementById('btn0');
var btn1=document.getElementById('btn1');
var btn_up=document.getElementById('btn_up');
var btn_down=document.getElementById('btn_down');
var page_num=document.getElementById('page_num');


btn0.onclick = function(){
    change1();
};
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