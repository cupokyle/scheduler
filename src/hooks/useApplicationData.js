import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put th>e line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

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
    const tempState = { ...state };
    const thisDay = tempState.day;
    const thisDayObject = tempState.days.find((day) => day.name === thisDay);
    const thisDayIndex = tempState.days.findIndex(
      (day) => day.name === thisDay
    );

    const emptyAppts = thisDayObject.appointments.filter((id) => {
      return !appointments[id].interview;
    });
    let spots = emptyAppts.length;
    const updatedDayObj = { ...thisDayObject, spots };
    let newDays = [...tempState.days];
    newDays[thisDayIndex] = updatedDayObj;
    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state, appointments);
    return axios.put(`api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state, appointments);
    return axios
      .delete(`api/appointments/${id}`, { interview: null })
      .then((res) => {
        setState({ ...state, appointments, days });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
