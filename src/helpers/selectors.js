

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