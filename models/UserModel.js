let mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
    {
        name : {type:String,required:true},
        email : {type:String,required:true,unique:true},
        password : {type:String,required:true,minlength:5,maxlength:1024},
        role : {type:String,enum:['user','admin'],default:'user'}
    }
);

let userModel = mongoose.model('user',userSchema);

module.exports = userModel;