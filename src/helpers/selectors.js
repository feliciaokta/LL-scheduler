function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}


// export function getAppointmentsForDay(state, day) {
//   //... returns an array of appointments for that day
//   console.log("state: ", state); 
//   let answer = [];
  
//   for (let i = 0 ; i < state.days.length; i++) {
//     if(state.days[i].name === day) {
//       answer = state.days[i].appointments;
//     }
//   }

//   for (let j = 0; j < state.days.length; j++) {
//     let keys = Object.keys(state.appointments);
//     if(state.days[j].appointments === keys[j]) {
//       answer.push(state.appointments[j]);
//     }
//   }


//   return(answer);

// }


export const getAppointmentsForDay = (state, day) => {

  let filteredAppointments = state.days.filter(time => time.name === day)

  if (filteredAppointments.length === 0 || state.days.length === 0) {
    return [];
  }
  return filteredAppointments[0].appointments.map(id => state.appointments[id]);
};