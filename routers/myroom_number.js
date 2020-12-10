const express = require('express');
const Room_number= require('../models/room_number.model');

var router = express.Router();
module.exports = router;

router.get('/myfind', myfind); 
router.get('/mydelete', mydelete); 
router.get('/myupdate', myupdate);
router.get('/myupdateUser_id', myupdateUser_id);
router.get('/myinsert', myinsert); 
function myfind(req, res){
    //let {id} = req.query;
    let query = req.query;
    Room_number.find(query, function (err, myresult) {//�����ֻ���ص�һ��ʹ��findOne
        res.send({ result:myresult});
     })
}
function mydelete(req, res){
    let query=req.query;
    Room_number.deleteMany(query).then(function (result) {
        res.send({ result:null});
    }, function (err) {
        res.send({ result:null});
    })
}
function myupdate(req, res){
    let condition= req.query.condition; 
    let set=req.query.set;
    Room_number.findOneAndUpdate(condition,set)
                    .exec(function (err, myresult){});
    res.send({result:null});
}
function myupdateUser_id(req, res){//{user_id:mycondition_id,setName:myset_name,setValue:myset_value};
    let condition= {'user_id':req.query.user_id};
    let set={};//req.query.set;
    if(req.query.setName=='x')set={'x':req.query.setValue};
    else if(req.query.setName=='y')set={'y':req.query.setValue};
    else if(req.query.setName=='room_id')set={'room_id':req.query.setValue};
    else if(req.query.setName=='user_id')set={'user_id':req.query.setValue};
    else if(req.query.setName=='angle1')set={'angle1':req.query.setValue};
    else if(req.query.setName=='angle2')set={'angle2':req.query.setValue};
    else if(req.query.setName=='angle3')set={'angle3':req.query.setValue};
    else if(req.query.setName=='head_angle1')set={'head_angle1':req.query.setValue};
    else if(req.query.setName=='head_angle2')set={'head_angle2':req.query.setValue};
    else if(req.query.setName=='head_angle2')set={'head_angle2':req.query.setValue};
    else if(req.query.setName=='animation')set={'animation':req.query.setValue};
    //if(req.query.setName=='animation')console.log(set);
    //animation
    Room_number.findOneAndUpdate(condition,set)
        .exec(function (err, myresult){});
    res.send({result:null});
}
function myinsert(req, res){console.log('myinsert');
    let data=req.query; 
    Room_number.insertMany(data).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}