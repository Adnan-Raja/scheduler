

export default function getAppointmentsForDay(state, dayName) {

  const filteredAppointments = state.days.filter(day=> day.name=== dayName).map(d=> d.appointments).flat();

  const appointments = [];

  for(const appointmentId of filteredAppointments ){
    if(state.appointments[appointmentId]){
      appointments.push(state.appointments[appointmentId]);
    }
  }
  return appointments;
}
