var bcrypt   = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var SALT_FACTOR = 10;

var userSchema = new mongoose.Schema({
    username:{type:String, default:""},
    thumbnail:{type:String, default:""},
    email:{type:String, default:""},
    password:{type:String, default:""},
    phone:{type:String, default:''},//电话号码
    tagline:{type:String, default:''},//个性签名
    realname:{type:String, default:''},//真实姓名
    checker:{type:mongoose.Schema.Types.ObjectId, ref:'User'},//绑定的审核的管理员
    state: {type:Number, default:0},//账号状态，0:未激活，1：正常，2:封号
    level:{type:Number, default: 0 },//0：普通用户， 1：超级管理员(super)， 2：系统管理员(system)， 3：一半管理员(general)，4：审核员(checker)
    birthday:{type:Date, default:Date.now},//生日
    hobby:{type:String, default:''},//爱好
    birthplace:{type:String, default:''},//籍贯
    price:{type:Number, default:0},//充值总金额
    score:{type:Number, default:0},//剩余积分
    registerBy:{type:Number, default:0},//注册来源, 0: 未知, 1: 手机号(密码), 2: 手机号(验证码), 3: 邮箱
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
});

var noop = function(){};

userSchema.pre('save', function(done){
    var user = this;

    if(!user.isModified('password')){
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) {return done(err);}
        bcrypt.hash(user.password, salt, noop, function(err, hashedPssword) {
            if(err) {return done(err);}
            user.password = hashedPssword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.methods.changePassword = function(password, done) {
    var user = this;
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) {return done(err);}
        bcrypt.hash(password, salt, noop, function(err, hashedPssword) {
            if(err) {return done(err);}
            done(err,hashedPssword);
        });
    });
};


userSchema.methods.uploadPath = function() {
    var p = '';
    if (this.photo) {
        p = '/assets/user/' + this.photo;
    }
    return p;
};

userSchema.plugin(mongoosePaginate);

var User = mongoose.model('User', userSchema);

module.exports = User;