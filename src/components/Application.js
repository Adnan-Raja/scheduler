import React, { useState } from "react";

import axios from "axios";

import { useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import getAppointmentsForDay from "../helpers/selectors";

import { getInterview } from "../helpers/selectors";

import { getInterviewersForDay } from "../helpers/selectors";


export default function Application() {
 

const setDay = day => setState({ ...state, day });
  
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        //setState({...state , appointments} )
        console.log("RESSS",state)
      })
      .catch((err) => { console.log(err.message)});
  }


  function cancelInterview(id) {        
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        //setState({...state , appointments} )
        console.log("RESSS",state)
      })
      .catch((err) => { console.log(err.message)});
   }
  

const dailyInterviewers = (getInterviewersForDay(state, state.day)) 
 

const dailyAppointments = getAppointmentsForDay(state, state.day)

const schedule = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  return (
    <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview} 
    interviewers={dailyInterviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />
  )
});




  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
     // console.log(all[2].data)
       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
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
      <nav className="sidebar__menu"><DayList
      days={state.days}
      value={state.day}
      onChange={setDay}
      /></nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
       <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


