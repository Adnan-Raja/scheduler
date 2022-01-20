import React from 'react';

import classNames from "classnames";

import "components/InterviewerListItem.scss";



export default function InterviewerListItem(props) {
  const interviewersItem = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });
 
  let name = props.selected ? props.name : " ";

  return <li className={interviewersItem} onClick={props.setInterviewer}>
  {<img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />}
   {name}
  </li>;
};