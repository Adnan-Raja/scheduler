import { useState } from "react";

import axios from "axios";

import { useEffect } from "react";


export default function useApplicationData(initial) {
  
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
  });

const setDay = day => setState({ ...state, day });

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
  }


function cancelInterview(id) {        
  return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      //setState({...state , appointments} )
      console.log("RESSS",state)
    })   
 }

    return { state, setDay, bookInterview, cancelInterview };
};

