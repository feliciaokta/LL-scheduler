import axios from 'axios';
import { useState, useEffect } from 'react';


export default function useApplicationData() {

    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    })


    useEffect(() => {
      const promiseDays = '/api/days';
      const promiseAppointments = '/api/appointments';
      const promiseInterviewers = '/api/interviewers';
      Promise.all([
        axios.get(promiseDays),
        axios.get(promiseAppointments),
        axios.get(promiseInterviewers)
      ])
      .then((all) => {
        setState(prev => (
          {...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data}));
      })
    }, []);
  
  
    // this is used in the return DayList tag
    const setDay = day => setState(prev => ({ ...prev, day}));
  
  
    // booking an interview
    function bookInterview(id, interview) {
  
      // the interview parameter is this object from the save fx in index.js
      // const interview = {
      //   student: name,
      //   interviewer      -- this is the interviewer id
      // };
      
      // const appointment is this object from the API/appointments
      // "3": {
      //    "id": 3,
      //    "time": "2pm",
      //    "interview": {
      //    "student": "Chad Takahashi",
      //    "interviewer": 8
      //    }
      // },
  
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment // reassigning appointment on 65
      };
  
      let promiseApptID = `/api/appointments/${id}`;
      return axios.put(promiseApptID, {interview})
        .then(() => {
          setState({
            ...state,
            appointments // reassigning const appointments on line 70
          })
        })
  
    }
  
  
  
    // deleting an interview
    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      let promiseApptID = `/api/appointments/${id}`;
      return axios.delete(promiseApptID, {interview: null})
        .then(() => {
          setState({
            ...state,
            appointments
          })
        })
    }

    return { state, setDay, bookInterview, cancelInterview };

}