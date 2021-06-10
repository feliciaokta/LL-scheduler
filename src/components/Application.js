import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointments";
import getAppointmentsForDay from "../helpers/selectors"



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Acacia Kovacs",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Dominic Kovacs",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Victoria Kovacs",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   }
// ];




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day}));

  const setDays = days => setState(prev => ({ ...prev, days}));

  console.log("state:", state);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const data = dailyAppointments.map(appointment => {
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      />
    )
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
        {data}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
