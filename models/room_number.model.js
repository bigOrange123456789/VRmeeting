var mongoose = require('mongoose');

var room_numberSchema = new mongoose.Schema({
    room_id:{type:String, default:""},
    user_id:{type:String, default:""},
    x:{type:String, default:""},
    y:{type:String, default:""},
    angle1:{type:String, default:""},
    angle2:{type:String, default:""},
    angle3:{type:String, default:""},
    head_angle1:{type:String, default:""},
    head_angle2:{type:String, default:""},
    head_angle3:{type:String, default:""},
    animation:{type:String, default:""}
});


var Room_number=mongoose.model('room_number', room_numberSchema);
module.exports=Room_number;