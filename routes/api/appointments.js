const express = require('express');
const router = express.Router();
const appointmentsCtrl = require('../../controllers/appointments');

/*---------- Public Routes ----------*/

router.post('/doctors/:id/appointment', appointmentsCtrl.createAppointment)
router.get('/doctors/:id/appointment/:appointmentDate', appointmentsCtrl.getSlots)



/*---------- Protected Routes ----------*/




module.exports = router;