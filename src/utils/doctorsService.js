import tokenService from './tokenService';

const BASE_URL = '/api/doctors/';

export default {
  // index,
  create,
  getDoctors,
  getDoctor
};

// function index() {
//   const options = {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + tokenService.getToken()
//     }
//   };
//   return fetch(BASE_URL, options).then(res => res.json());
// }

function getDoctors(dept) {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  };
  return fetch(BASE_URL + dept, options).then(res => res.json());
}

function getDoctor(doctorId) {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  };
  return fetch(BASE_URL + doctorId, options).then(res => res.json());
}

function create(doctor) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      // Add this header - don't forget the space after Bearer
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify(doctor)
  };
  return fetch(BASE_URL + 'signup', options).then(res => res.json());
}



