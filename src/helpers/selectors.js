export function getAppointmentsForDay(state, day) {
  // Find the day in state.days
  const selectedDayApps = state.days.filter((thisDay) => thisDay.name === day);
  // Ensure that it has truthy length
  if (selectedDayApps.length) {
    const appIds = selectedDayApps[0].appointments;
    // Convert appointments objec to array
    const myAppointmentsArray = [...Object.values(state.appointments)];
    // Compare ID's from day appointments to appointment ids.
    const selectedAppts = myAppointmentsArray.filter((appt) =>
      appIds.includes(appt.id)
    );
    return selectedAppts;
  }
  // If no appointments that day, return empty []
  return [];
}

export function getInterview(state, interview) {
  if (interview) {
    // console.log("this interview:", interview);
    // console.log("state interviewers:", state.interviewers);
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  // Find the day in state.days
  const selectedDay = state.days.filter((thisDay) => thisDay.name === day);
  // Ensure that it has truthy length
  if (selectedDay.length) {
    const intIds = selectedDay[0].interviewers;
    // Convert interviewers objec to array
    const myInterviewersArray = [...Object.values(state.interviewers)];
    // Compare ID's from day interviewers to interviewer ids.
    const selectedInts = myInterviewersArray.filter((int) =>
      intIds.includes(int.id)
    );
    return selectedInts;
  }
  // If no interviewers that day, return empty []
  return [];
}
