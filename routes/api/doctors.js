const express = require('express');
const router = express.Router();
const doctorsCtrl = require('../../controllers/doctors');

/*---------- Public Routes ----------*/
router.post('/signup', doctorsCtrl.doctorssignup);



/*---------- Protected Routes ----------*/




module.exports = router;