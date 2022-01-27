export default function getAppointmentsForDay(state, dayName) {

  const filteredAppointments = state.days.filter(day=> day.name=== dayName).map(d=> d.appointments).flat();

  const appointments = [];

  for (const appointmentId of filteredAppointments ) {
    if(state.appointments[appointmentId]){
      appointments.push(state.appointments[appointmentId]);
    }
  }
  return appointments;
}

// function that gets interview
export function getInterview(state, interview) {
  let result = {};
    
  if (!interview) {
   return null;
  }
    for (let item in state.appointments) {
      if(state.appointments[item].interview) {        
        let id = state.appointments[item].interview.interviewer;        
        for (let key in state.interviewers) {       
          if (state.interviewers[key].id === id) {          
            result.student = state.appointments[item].interview.student;
            result.interviewer = state.interviewers[key];   
                 
          }
        }
      } 
    }
    //console.log(result)
    return result; 
  }

  //to get interviewer for the day
  export function getInterviewersForDay(state, dayName) {

    const filteredAppointments = state.days.filter(day=> day.name === dayName).map(d=> d.appointments).flat();
    
    //console.log(filteredAppointments)
    const interviewer = [];
  
    for (const appointmentId of filteredAppointments ) {
     // console.log(appointmentId)
      if(state.interviewers[appointmentId]){
        interviewer.push(state.interviewers[appointmentId]);
      }
    }
    //console.log(interviewer)
    return interviewer;
  }
