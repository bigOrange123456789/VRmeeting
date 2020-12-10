const express = require('express');
const Avatar=require('../models/avatar.model');

var router = express.Router();
module.exports = router;

router.get('/myfind', myfind); 
router.get('/mydelete', mydelete); 
router.get('/myinsert', myinsert);
router.get('/myinsertAndUnique', myinsertAndUnique);
router.get('/myupdate', myupdate); 

function myfind(req, res){
    let query=req.query; 
    Avatar.find(query, function (err, myresult) {//�����ֻ���ص�һ��ʹ��findOne
        res.send({ result:myresult});
     })
}
function mydelete(req, res){
    let query=req.query;
    Avatar.deleteMany(query).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}
function myupdate(req, res){
    let condition= req.query.condition; 
    let set=req.query.set;
    Avatar.findOneAndUpdate(condition,set)
                    .exec(function (err, myresult){});
    res.send({result:null});
}
function myinsert(req, res){console.log('myinsert');
    let data=req.query;//data={user_id: "01",index: "01",bone0:"01",bone1:"01",bone2:"01",bone3:"01",bone4:"01",bone5:"01",bone6:"01",bone7:"01",bone8:"01",bone9:"01",bone10:"01",bone11:"01",bone12:"01",bone13:"01",bone14:"01",bone15:"01",bone16:"01",mapping:"01",colour:"01" };
    Avatar.insertMany(data).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}
function myinsertAndUnique(req, res){console.log('myinsert');
    let data=req.query;
    var condition={'user_id':data.user_id,'index':data.index};
    Avatar.deleteMany(condition).then(function (result) {
    }, function (err) {
    })
    Avatar.insertMany(data).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}