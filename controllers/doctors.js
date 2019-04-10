const Doctor = require ('../models/doctor');

module.exports={
    doctorssignup
}

async function doctorssignup(req, res){
    console.log(req.body)
    const doctor = new Doctor(req.body);
    try{
        await doctor.save();
        console.log('You are signed up')
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
}


