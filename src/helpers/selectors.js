

  //... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  const correctAppointments = [];
  
  const correctDay = state.days.filter(d => {
    return d.name === day
  })[0];
  
  if (!correctDay || !correctDay.appointments) {
    return [];
  }

  for (let appointment in state.appointments) {
    if (correctDay.appointments.includes(state.appointments[appointment].id)){
      correctAppointments.push(state.appointments[appointment]);
    }
  }

  return correctAppointments;
}

//... returns an object that contains the interview data if it is passed an object that contains an interviewer
export function getInterview(state, interview) {
  if (!interview || !interview.interviewer) {
    return null;
  }
  const result = {...interview};
  result.interviewer = state.interviewers[interview.interviewer]
  return result;
}

//... returns an array of interviewers for that day
export function getInterviewersForDay(state, day) {
  const correctInterviewers = [];
  
  const correctDay = state.days.filter(d => {
    return d.name === day
  })[0];
  
  if (!correctDay || !correctDay.appointments) {
    return [];
  }

  for (let interviewer in state.interviewers) {
    if (correctDay.interviewers.includes(state.interviewers[interviewer].id)){
      correctInterviewers.push(state.interviewers[interviewer]);
    }
  }

  return correctInterviewers;
}