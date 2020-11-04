

  //... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  
  const correctDay = state.days.find(d => {
    return d.name === day
  });
  
  if (!correctDay || !correctDay.appointments) {
    return []
  }

  return correctDay.appointments.map(appoitmentId => state.appointments[appoitmentId])  
};

//... returns an object that contains the interview data if it is passed an object that contains an interviewer
export function getInterview(state, interview) {
  if (!interview || !interview.interviewer) {
    return null
  }
  const result = {...interview};
  result.interviewer = state.interviewers[interview.interviewer];
  return result
}

//... returns an array of interviewers for that day
export function getInterviewersForDay(state, day) {
  
  const correctDay = state.days.find(d => {
    return d.name === day
  });
  
  if (!correctDay || !correctDay.appointments) {
    return [];
  }

  const correctInterviewers = correctDay.interviewers.map(interviewer => state.interviewers[interviewer]);

  return correctInterviewers
}