import React from "react";

import "./styles.scss";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

export default function Appointment(props) {
  
  return (
    <main>
      {/* <article className="appointment">{props.time ?  props.time : "No Appointement" }</article> */}
       <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
      {/* {props.time === "5pm" ? <Header className="appointment :last-of-type __add"/> : props.time } */}
    </main>
    
  );
}

