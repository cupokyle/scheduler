import { useState, useEffect } from "react";
import axios from "axios";

// ---- Store Key Application Data ---- //

const useApplicationData = () => {
  // Set Overall State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  // Gather data from API

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(state, appointments) {
    // Create state copy
    const tempState = { ...state };
    // Gather useful variables regarding current selected day
    const thisDay = tempState.day;
    const thisDayObject = tempState.days.find((day) => day.name === thisDay);
    const thisDayIndex = tempState.days.findIndex(
      (day) => day.name === thisDay
    );
    // Select array of appt ids with no interview scheduled
    const emptyAppts = thisDayObject.appointments.filter((id) => {
      return !appointments[id].interview;
    });
    // Set spots to the length of the empty appt array
    let spots = emptyAppts.length;
    // Update the day's spots property
    const updatedDayObj = { ...thisDayObject, spots };
    // Grab just the days from our State clone
    let newDays = [...tempState.days];
    // Replace the current day with spots update
    newDays[thisDayIndex] = updatedDayObj;
    // Return new array of days
    return newDays;
  }

  function bookInterview(id, interview) {
    // Clone appointments and appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Update the spots before Axios call
    const days = updateSpots(state, appointments);
    // Update database then render new State
    return axios.put(`api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    // Clone appointments and appointment
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Update the spots before Axios call
    const days = updateSpots(state, appointments);
    // Update database then render new State
    return axios
      .delete(`api/appointments/${id}`, { interview: null })
      .then((res) => {
        setState({ ...state, appointments, days });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
