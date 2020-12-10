var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
    name:{type:String, default:""},
    user_id:{type:String, default:""},
    room_type:{type:String, default:""},
    begin_time:{type:String, default:""},
    end_time:{type:String, default:""},
    member_num:{type:String, default:""},
    password1:{type:String, default:""},
    password2:{type:String, default:""},
    password3:{type:String, default:""}
});


var Room= mongoose.model('rooms', roomSchema);
module.exports = Room;