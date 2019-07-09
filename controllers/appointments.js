const Doctor = require('../models/doctor');
const DateFormat = require('dateformat');


module.exports = {
    createAppointment,
    getSlots
}

const aSlots = ['8:00 am','8:30 am','9:00 am','9:30 am','10:00 am','10:30 am','11:00 am','11:30 am','12:00 am','12:30 am','1:00 am','1:30 am','2:00 am','2:30 am']

function createAppointment(req, res){
    console.log(req.params.id + " | " + req.body)
    let nAppointment = {}
    Doctor.findById(req.params.id,function(err,doctor){
        if(err) console.log(err);
        // code refactor
        doctor.appointment.map(app=>{
            if (!app.appointmentDate) return false;
            console.log('mongo: ' + DateFormat(app.appointmentDate,'isoDate'));
            console.log('req: ' + DateFormat(req.body.appointmentDate,'isoDate'));
            
           if (DateFormat(app.appointmentDate,'isoDate')===DateFormat(req.body.appointmentDate,'isoDate')){
               
                console.log('date match: ' + app.appointmentDate)
               app.appointmentDetails.push(req.body.appointmentDetails)
               nAppointment = app; 
               
           }
        })
        console.log(Object.keys(nAppointment).length)
        if (Object.keys(nAppointment).length === 0 ) {
            console.log('success')
            doctor.appointment.push(req.body)
            nAppointment= doctor.appointment[doctor.appointment.length-1]
            console.log(nAppointment)
        }
        
        doctor.save(function(err){
            
            if(err) console.log(err)
            res.json(nAppointment);
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
               
              if( elm.appointmentDetails.length > 0 && (DateFormat(elm.appointmentDate,'isoDate') === DateFormat(req.params.appointmentDate,'isoDate'))) {

                
                slotsArr=aSlots.filter(aslot=>!elm.appointmentDetails.map(d=>d.slot).includes(aslot))
               
              }
           })
           console.log('Line 66: ' + slotsArr)
                slotsArr.length===0?aSlots.map(aSlot=>slotsArr.push(aSlot)):false;
               console.log('Line 68: ' + slotsArr)
              res.json(slotsArr);
       })
    }catch (err) {
        console.log(err)
        res.send(err)
    }
}