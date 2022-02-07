export default function getAppointmentsForDay(state, dayName) {
  const filteredAppointments = state.days
    .filter((day) => day.name === dayName)
    .map((d) => d.appointments)
    .flat();

  const appointments = [];

  for (const appointmentId of filteredAppointments) {
    if (state.appointments[appointmentId]) {
      appointments.push(state.appointments[appointmentId]);
    }
  }
  return appointments;
}

// function that gets interview
export function getInterview(state, interview) {
  let result = {};
  //console.log("Interview data is", interview)
  if (!interview) {
    return null;
  }
  result.student = interview.student;
  result.interviewer = state.interviewers[interview.interviewer];
  return result;
}

//to get interviewer for the day
export function getInterviewersForDay(state, dayName) {
  const filteredAppointments = state.days
    .filter((day) => day.name === dayName)
    .map((d) => d.interviewers)
    .flat();
  //console.log(filteredAppointments)
  const interviewer = [];
  for (const interviewerId of filteredAppointments) {
    // console.log(appointmentId)
    if (state.interviewers[interviewerId]) {
      interviewer.push(state.interviewers[interviewerId]);
    }
  }
  //console.log(interviewer)
  return interviewer;
}
