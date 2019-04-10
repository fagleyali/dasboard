const mongoose = require('mongoose');
const Department = require('./departments');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: String,
    doctorId:{
        type:String,
        required:true,
    },
    // department: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Department"
    // }
    department: String
},{
        timestamps:true
})


module.exports=mongoose.model('Doctor',doctorSchema);