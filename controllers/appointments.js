const Doctor = require('../models/doctor');


module.exports = {
    createAppointment,
    getSlots
}


function createAppointment(req, res){
    Doctor.findById(req.params.id,function(err,doctor){
        if(err) console.log(err);
        doctor.appointment.push(req.body);
        doctor.save(function(err){
            if(err) console.log(err)
            res.json(doctor.appointment[doctor.appointment.length-1]);
        })
    })
}




async function getSlots(req,res){
    console.log(req.params.id)
    console.log(req.params.appointmentDate)
    
    var slotsArr=[];
    try{
         Doctor.findById(req.params.id, async function(err,doctor){
           if(err) console.log(err);
           await   doctor.appointment.map(elm=>{
               console.log(typeof(new Date(elm.appointmentDate)) + " | " + typeof(new Date(parseInt(req.params.appointmentDate)))  )
              if( new Date(elm.appointmentDate).getTime() === new Date(parseInt(req.params.appointmentDate)).getTime()) {
               slotsArr.push(elm.slot)
              }
              
           })
               
              res.json(slotsArr);
       })
    }catch (err) {
        console.log(err)
        res.send(err)
    }
}