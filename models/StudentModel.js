let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema(
    {
        name : String,
        age : Number,
        hobbies : {type:Array,of:String}
    }
);

let studentModel = mongoose.model('student',studentSchema);

module.exports = studentModel;