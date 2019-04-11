const mongoose = require('mongoose');
const Department = require('./departments');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema ({
    patient: {type:Schema.Types.ObjectId, ref:'User'},
    appDateTime:[{
        appDate: Date,
        slot: Boolean
    }]
})

const doctorSchema = new Schema({
    name: String,
    doctorId:{
        type:String,
        required:true,
    },
    department: String,
    appointment:[appointmentSchema]
},{
        timestamps:true
})


module.exports=mongoose.model('Doctor',doctorSchema);