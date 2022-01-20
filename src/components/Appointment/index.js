import React from "react";

import "./styles.scss";

import classNames from "classnames";

export default function Appointment(props) {
  
  return (
    <article className="appointment">{props.time ? "Appointement at " + props.time : "No Appointement" }</article>
  );
}