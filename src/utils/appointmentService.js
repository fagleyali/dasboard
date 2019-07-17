import tokenService from './tokenService';

const BASE_URL = '/api/doctors/';

export default {
  createAppointment,
  getSlots
};


function createAppointment(doctorId,appointment) {
  console.log(doctorId + "|" + appointment)
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // Add this header - don't forget the space after Bearer
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
      body: JSON.stringify(appointment)
      
    };
    
    return fetch(BASE_URL+ doctorId + '/appointment', options).then(res => res.json());
  }

  function getSlots(doctorId,appointmentDate) {
    console.log("App Service: ",   doctorId,appointmentDate)
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    };
    return fetch(BASE_URL + doctorId + '/appointment/' + appointmentDate , options).then(res => res.json());
  }