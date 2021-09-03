import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import Appointment from "./Appointment";
import DayList from "./DayList";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  );
});

  useEffect(() => {

    Promise.all([
  axios.get("http://localhost:8001/api/days"),
  axios.get("http://localhost:8001/api/appointments"),
  axios.get("http://localhost:8001/api/interviewers")
]).then((all) => {
  setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  console.log(all[2].data)
});

  }, [])

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
        
        {appointments.map(appointment => <Appointment key={appointment.id} {...appointment}/>)}
        <Appointment key="last" time="5pm"/>
        
      </section>
    </main>
  );
}
