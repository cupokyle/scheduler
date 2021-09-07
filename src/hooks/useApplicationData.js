// import { useState } from "react";

// export default function useApplicationData() {

// function bookInterview(id, interview) {
//   const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview },
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment,
//   };
//   return axios
//     .put(`api/appointments/${id}`, { interview })
//     .then(setState({ ...state, appointments }));
// }

// function cancelInterview(id) {
//   const appointment = {
//     ...state.appointments[id],
//     interview: null,
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment,
//   };
//   return axios
//     .delete(`api/appointments/${id}`)
//     .then(setState({ ...state, appointments }));
// }

// useEffect(() => {
//   Promise.all([
//     axios.get("http://localhost:8001/api/days"),
//     axios.get("http://localhost:8001/api/appointments"),
//     axios.get("http://localhost:8001/api/interviewers"),
//   ]).then((all) => {
//     setState((prev) => ({
//       ...prev,
//       days: all[0].data,
//       appointments: all[1].data,
//       interviewers: all[2].data,
//     }));
//   });
// }, []);
// };
