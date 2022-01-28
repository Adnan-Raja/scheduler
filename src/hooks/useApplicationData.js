import { useState } from "react";

import axios from "axios";

import { useEffect } from "react";

import { updateSpots } from "../helpers/selectors";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // const getSpotsForDay = function (day, variable) {
  //   let spots = day.spots;
  //   //let day = day;
  //   //console.log("this is day and appointments", day, appointments);
  //  // console.log("")

  //   if(variable === "bookInterview") {
  //     day = {...day, spots: spots -1}
  //     console.log("This is an ify day", day)
  //   } else if(variable === "cancelInterview") {
  //     day = {...day, spots: spots +1}
  //     console.log("This is an ify day", day)
  //   }
  //   return day
  //   // //iterate the day's appointments id's
  //   // for (const id of day.appointments) {
  //   //   const appointment = appointments[id];
  //   //   if (!appointment.interview) {
  //   //     spots++;
  //   //   }
  //   // }
  //   // return spots;
  // };

  // function updateSpots(state, id, variable) {
  //   // Get the day Object
  //   const dayObj = state.days.find((day) => day.name === state.day);
  //   //console.log("This is dayobj=====", dayObj)
  //   //console.log("Thhis is Appointment data===", appointments)

  //   const spots = getSpotsForDay(dayObj, variable);
  //   console.log("Thhis is Spots===", spots)

  //   const day = { ...dayObj, spots };
  //   //console.log("This is day===", day)
  //   return
  //   const newDays = state.days.map((d) => (d.name === state.day ? day : d));

  //   // return an updated days array
  //   return newDays;
  // }

  const spotUpdate = (weekday, day, variable) => {
    let spot = day.spots;
    if (weekday === day.name && variable === "REMOVE_SPOT") {
      return spot - 1;
    } else if (weekday === day.name && variable === "ADD_SPOT") {
      return spot + 1;
    } else {
      return spot;
    }
  };
  const updateSpots = (weekday, days, variable) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable),
        };
      });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable),
        };
      });
      return updatedStateDayArray;
    }
  };

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      // console.log(all[2].data)
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({
      ...state,
      appointments,
    });

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      //updateSpots(state, state.appointments, id, "bookInterview");
      const spotUpdate = updateSpots(state.day, state.days, "REMOVE_SPOT");
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
      //console.log("RESSS", state);
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
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      //updateSpots(state, state.appointments, id, "cancelInterview");
      const spotUpdate = updateSpots(state.day, state.days, "ADD_SPOT");
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
      //console.log("RESSS", state);
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
