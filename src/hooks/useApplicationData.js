import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {},
    interviewers: {}
  });

  
  const setDay = day => setState(prev => ({...prev, day}));
  

  const recreateDays = (days, appointments) => {
    
    return days.map(day => {
      // Calculate nb of spots remaining for a day
      const spotsPerDay  = day.appointments.filter(appointmentId => {
          return appointments[appointmentId].interview === null 
      }).length
      // Return the the updated day
      return {...day, spots:spotsPerDay}      
    })
  }


  useEffect(() => {
    const urlDays="http://localhost:8001/api/days";
    const urlAppointments="http://localhost:8001/api/appointments";
    const urlInterviews="http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviews)
    ]).then((all) => {
      const [daysData, appointmentsData, interviewersData] = all;
      const days = daysData.data;
      const appointments = appointmentsData.data;
      const interviewers = interviewersData.data;
      setState(prev => ({...prev, days, appointments, interviewers}));
    })
  }, []);

  function bookInterview(id, interview) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = recreateDays(state.days, appointments);
    
    const savedToDB = new Promise((resolve, reject) => {
      axios.put(
        `http://localhost:8001/api/appointments/${id}`,
        {interview}
      ).then((response) => {
        setState({...state, appointments, days});
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    });
    return savedToDB;
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = recreateDays(state.days, appointments);

    const deletedToDB = new Promise((resolve, reject) => {
      axios.delete(
        `http://localhost:8001/api/appointments/${id}`
      ).then((response) => {
        setState({...state, appointments, days});
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    });
    return deletedToDB;
  }

  return {state, setDay, bookInterview, cancelInterview }
}