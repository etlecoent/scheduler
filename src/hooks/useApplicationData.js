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
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const savedToDB = new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: `http://localhost:8001/api/appointments/${id}`,
        data: {interview}
      }).then((response) => {
        setState({...state, appointments});
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

    const deletedToDB = new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `http://localhost:8001/api/appointments/${id}`,
      }).then((response) => {
        setState({...state, appointments});
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    });
    return deletedToDB;
  }

  return {state, setDay, bookInterview, cancelInterview }
}