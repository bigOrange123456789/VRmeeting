const express = require('express');
const User= require('../models/user.model');

var router = express.Router();
module.exports = router;

router.get('/myfind', myfind); 
router.get('/myupdate', myupdate); 
router.get('/mydelete', mydelete); 
router.get('/myinsert', myinsert); 

function myfind(req, res){
    let query= req.query; 
    User.find(query, function (err, myresult) {
        if (err)res.send({error:err, result:null});
        else res.send({error:null, result:myresult});
     })
}
function mydelete(req, res){
    let query=req.query;
    User.deleteMany(query).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}
function myupdate(req, res){
    let condition= req.query.condition;
    let set1=req.query.set;
    let set2={username:'orange11'};
    //console.log(set1);
    //console.log(set2);
    let set=set1;
    User.findOneAndUpdate(condition,set)
                    .exec(function (err, myresult){});
    res.send({error:null, result:null});
}
function myinsert(req, res){console.log('myinsert');
    let data=req.query; 
    User.insertMany(data).then(function (result) {
    }, function (err) {
    })
    res.send({result:null});
}


