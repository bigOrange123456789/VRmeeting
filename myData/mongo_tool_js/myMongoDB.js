async function insert(data,tablename){//增    //data里面需要包含新增的这条记录的所有信息
    //var data1={username: "", thumbnail: "", email: "", password: "", phone: "", tagline: "", realname : "", state : 1, level : 0, hobby: "", birthplace: "", price: 0, score: 0, registerBy: 1, birthday: ISODate("1970-01-01T00:00:00.000Z"), createdAt: ISODate("2020-07-15T11:01:39.597Z"), updatedAt: ISODate("2020-07-15T11:01:39.597Z"), __v: 0}
    //var data2=
    //var data3={name: "",user_id: "", room_type: "", begin_time: "", end_time: "", member_num: "", password1: "", password2: "", password3: ""}
    //var data4={room_id: "",user_id: "", room_type: "", x: "", y: "",angel: "", head_angel1: "",head_angel2: "",animation:"001"}
    //insert(data1,1);insert(data2,2);insert(data3,3);insert(data4,4);
    if(tablename==1||tablename=='user')await asyncAxios.get(url + "/myuser/myinsert",data);
    else if(tablename==2||tablename=='avatar')await asyncAxios.get(url + "/myavatar/myinsert",data);
    else if(tablename==3||tablename=='room')await asyncAxios.get(url + "/myroom/myinsert",data);
    else if(tablename==4||tablename=='room_number')await asyncAxios.get(url + "/myroom_number/myinsert",data);
}
async function drop(condition,tablename){//删
    if(tablename==1||tablename=='user')await asyncAxios.get(url + "/myuser/mydelete",condition);
    else if(tablename==2||tablename=='avatar')await asyncAxios.get(url + "/myavatar/mydelete",condition);
    else if(tablename==3||tablename=='room')await asyncAxios.get(url + "/myroom/mydelete",condition);
    else if(tablename==4||tablename=='room_number')await asyncAxios.get(url + "/myroom_number/mydelete",condition);
}
/*async function update(mycondition,myset,tablename){//改   //data:{condition,set}里面包含条件语句和设置语句
    var data={condition:mycondition,set:myset};
    if(tablename==1||tablename=='user')await asyncAxios.get(url + "/myuser/myupdate",data);
    else if(tablename==2||tablename=='avatar')await asyncAxios.get(url + "/myavatar/myupdate",data);
    else if(tablename==3||tablename=='room')await asyncAxios.get(url + "/myroom/myupdate",data);
    else if(tablename==4||tablename=='room_number')await asyncAxios.get(url + "/myuser/myupdate",data);
}*/
async function update(mycondition_id,myset_name,myset_value,tablename){//改   //data:{condition,set}里面包含条件语句和设置语句
    var data={condition_id:mycondition_id,setName:myset_name,setValue:myset_value};
    if(tablename==1||tablename=='user')await asyncAxios.get(url + "/myuser/myupdate",data);
    else if(tablename==2||tablename=='avatar')await asyncAxios.get(url + "/myavatar/myupdate",data);
    else if(tablename==3||tablename=='room')await asyncAxios.get(url + "/myroom/myupdate",data);
    else if(tablename==4||tablename=='room_number')await asyncAxios.get(url + "/myroom_number/myupdate",data);
}
async function find(condition,tablename){//查
    var result;
    if(tablename==1||tablename=='user')result=await asyncAxios.get(url + "/myuser/myfind",condition);
    else if(tablename==2||tablename=='avatar')result=await asyncAxios.get(url + "/myavatar/myfind",condition);
    else if(tablename==3||tablename=='room')result=await asyncAxios.get(url + "/myroom/myfind",condition);
    else if(tablename==4||tablename=='room_number')result=await asyncAxios.get(url + "/myroom_number/myfind",condition);
    //console.log(result);
    return result ;
}
//find({},2);
///专门为创建房间界面制作的方法
/*async function find_roomNumber(condition){//查
    var result;
    result=await asyncAxios.get(url + "/myroom/myfind",condition);
    console.log(result.result.length);
    return result.result.length;
}*/
//专门为room_number表制作的方法
async function updateRoom_numberUser_id(myuser_id,myset_name,myset_value){//改   //data:{condition,set}里面包含条件语句和设置语句
    var data={user_id:myuser_id,setName:myset_name,setValue:myset_value};
    await asyncAxios.get(url + "/myroom_number/myupdateUser_id",data);
}
//以下是专门为场景中的返回按钮制作的函数
async function dropAndBack(myuser_id){//删
    var condition={'user_id':myuser_id};
    await asyncAxios.get(url + "/myroom_number/mydelete",condition);
    window.location.href='../../myAvatarSelect/avatarSelect.html';
}
//为化身定制中更新数据制作的函数
async function insertAndUnique(data){//增    //data里面需要包含新增的这条记录的所有信息
    await asyncAxios.get(url + "/myavatar/myinsertAndUnique",data);
}
