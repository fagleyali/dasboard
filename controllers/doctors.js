const Doctor = require ('../models/doctor');

module.exports={
    doctorssignup,
    getDeptWiseDoctors,
    getDoctor,
    getDoctors
}



async function doctorssignup(req, res){
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
        res.json(doctors);
    } catch (err) {
        console.log(err)
        res.send(err)
    }
};

async function getDoctor(req,res){
    try{
        await Doctor.findById(req.params.id,function(err,doctor){
            console.log("line 37:",req.params.id + " | " + doctor)
            res.json(doctor)
        })
        
    } catch (err) {
        console.log(err)
        res.send(err)
    }
};

async function getDeptWiseDoctors(req,res){
    try{
        const doctors = await Doctor.find({department:req.params.dept})
        // .sort({createdAt: -1})
        // .limit(req.query.limit || 20);
        res.json(doctors);
    } catch (err) {
        console.log(err)
        res.send(err)
    }
};




