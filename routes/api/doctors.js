const express = require('express');
const router = express.Router();
const doctorsCtrl = require('../../controllers/doctors');

/*---------- Public Routes ----------*/
router.get('/',doctorsCtrl.getDoctors)
router.get('/:dept',doctorsCtrl.getDeptWiseDoctors)
router.get('/:id', doctorsCtrl.getDoctor)
router.post('/signup', doctorsCtrl.doctorssignup);

/*---------- Protected Routes ----------*/




module.exports = router;