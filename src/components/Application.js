import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



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



  const setDay = day => setState(prev => ({ ...prev, day}));

  // const setDays = days => setState(prev => ({ ...prev, days}));

  // helpers/selectors.js
  const appointments = getAppointmentsForDay(state, state.day);



  // booking an interview
  function bookInterview(id, interview) {

    // the interview parameter is this object from the save fx in index.js
    // const interview = {
    //   student: name,
    //   interviewer      -- this is the interviewer id
    // };
    
    // this object
    // "2":{"id":2,"time":"1pm","interview":{"student":"Archie Cohen","interviewer":6}}



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

  

  const schedule = appointments.map(appointment => {
    // helpers/selectors.js
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    )
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
