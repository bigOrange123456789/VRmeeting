var mongoose = require('mongoose');

var avatarSchema = new mongoose.Schema({
    user_id:{type:String, default:""},
    index:{type:String, default:""},
    bone0:{type:String, default:""},
    bone1:{type:String, default:""},
    bone2:{type:String, default:""},
    bone3:{type:String, default:""},
    bone4:{type:String, default:""},
    bone5:{type:String, default:""},
    bone6:{type:String, default:""},
    bone7:{type:String, default:""},
    bone8:{type:String, default:""},
    bone9:{type:String, default:""},
    bone10:{type:String, default:""},
    mapping:{type:String, default:""},
    colour:{type:String, default:""}

});


var Avatar=mongoose.model('avatars', avatarSchema);
module.exports=Avatar;