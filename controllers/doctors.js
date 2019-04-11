const Doctor = require ('../models/doctor');

module.exports={
    doctorssignup,
    getDeptWiseDoctors
}

async function doctorssignup(req, res){
    console.log(req.body)
    const doctor = new Doctor(req.body);
    try{
        await doctor.save();
        getDoctors(req, res);
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
}

async function getDoctors(req,res){
    try{
        const doctors = await Doctor.find({})
        .sort({createdAt: -1})
        .limit(req.query.limit || 20);
        console.log(doctors);
        res.json(doctors);
    } catch (err) {
        console.log(err)
        res.send(err)
    }
};

async function getDeptWiseDoctors(req,res){
    console.log(req.params.dept)
    try{
        const doctors = await Doctor.find({department:req.params.dept})
        .sort({createdAt: -1})
        .limit(req.query.limit || 20);
        console.log(doctors);
        res.json(doctors);
    } catch (err) {
        console.log(err)
        res.send(err)
    }
};


