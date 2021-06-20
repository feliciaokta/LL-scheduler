
export const getAppointmentsForDay = (state, day) => {
  // Find the current day -- elm is the object from the api
  const currentDay = state.days.find(dayObj => day === dayObj.name)

  // Get appointments.id array from the day
  const currentAppointments = currentDay ? currentDay.appointments : [];

  // Create an empty array of full appointments
  const parsedAppointments = [];

  // Push each appointment object
  currentAppointments.map(id =>
    parsedAppointments.push(state.appointments[id])
  )

  return parsedAppointments;
};


export const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID]
  
  return {...interview, interviewer};
};



export const getInterviewersForDay = (state, day) => {
  // Find the current day -- elm is the object from the api
  const currentDay = state.days.find(dayObj => day === dayObj.name)

  // Get interviewers.id array from the day
  const currentInterviewers = currentDay ? currentDay.interviewers : [];

  // Create an empty array of interviewers
  const parsedInterviewers = [];

  // Push each appointment object
  currentInterviewers.map(id =>
    parsedInterviewers.push(state.interviewers[id])
  )

  return parsedInterviewers;
};
