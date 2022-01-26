const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 1 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};




 function getInterview(state, interview) {
  let result = {};
  
  //console.log(interview)
    for (let item in state.appointments) {
      if(state.appointments[item].interview) {
        //console.log(state.appointments[item].interview.interviewer)
        //console.log(state.appointments[item].interview.student)

        //result.student = state.appointments[item].interview.student;
        let id = state.appointments[item].interview.interviewer;
        //console.log(id)
      //}
      for (let key in state.interviewers) {
        //console.log(state.interviewers[key])
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
  
console.log(getInterview(state, state.appointments["3"].interview))