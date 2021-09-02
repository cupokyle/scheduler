import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import { getAppointmentsForDay } from "helpers/selectors";

import Appointment from "./Appointment";
import DayList from "./DayList";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  useEffect(() => {
    // axios.get("/api/days")
    // .then(response => {
    //   // setDays([...response.data])
    // })
    Promise.all([
  axios.get("http://localhost:8001/api/days"),
  axios.get("http://localhost:8001/api/appointments"),
]).then((all) => {
  setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
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
        
        {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment}/>)}
        <Appointment key="last" time="5pm"/>
        
      </section>
    </main>
  );
}
