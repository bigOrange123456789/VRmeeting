const express = require('express');
const Room= require('../models/room.model');

var router = express.Router();
module.exports = router;

router.get('/myfind', myfind); 
router.get('/mydelete', mydelete); 
router.get('/myupdate', myupdate); 
router.get('/myinsert', myinsert); 

function myfind(req, res){
    //let {id} = req.query;
    let query =req.query;
    Room.find(query, function (err, myresult) {//�����ֻ���ص�һ��ʹ��findOne
        res.send({ result:myresult});
     })
}
function mydelete(req, res){
    let query=req.query;
    Room.deleteMany(query).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}
function myupdate(req, res){
    let data=req.query;
    var condition={'_id':req.query.condition_id};//data[0];//

    var setName=req.query.setName;
    var setValue=req.query.setValue;
    var set={};
    if(setName=='name')set={'name':setValue};
    else if(setName=='user_id')set={'user_id':setValue};
    else if(setName=='room_type')set={'room_type':setValue};
    else if(setName=='begin_time')set={'begin_time':setValue};
    else if(setName=='end_time')set={'end_time':setValue};
    else if(setName=='member_num')set={'member_num':setValue};
    else if(setName=='password1')set={'password1':setValue};
    else if(setName=='password2')set={'password2':setValue};
    else if(setName=='password3')set={'password3':setValue};/**/

    console.log(condition,set);
    Room.findOneAndUpdate(condition,set)
                    .exec(function (err, myresult){});
    res.send({result:null});
}
function myinsert(req, res){console.log('myinsert');
    let data=req.query;
    console.log(data);
    //data={name: '',user_id: '5f0ee213a7f73b3d64377d79',room_type: '001',begin_time: ' ',end_time: ' ',member_num: ' ',password1: '1',password2: '1',password3: '1'};
    Room.insertMany(data).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}