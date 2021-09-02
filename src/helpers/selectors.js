

export function getAppointmentsForDay(state, day) {
  // Find the day in state.days
  const selectedDayApps = state.days.filter(thisDay => thisDay.name === day);
  // Ensure that it has truthy length
  if (selectedDayApps.length){
    const appIds = selectedDayApps[0].appointments;
    // Convert appointments objec to array
    const myAppointmentsArray = [...Object.values(state.appointments)];
    // Compare ID's from day appointments to appointment ids.
    const selectedAppts = myAppointmentsArray.filter(appt => appIds.includes(appt.id))
    return selectedAppts;
  }
  // If no appointments that day, return empty []
  return [];
}