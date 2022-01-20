import React from 'react';



import "components/InterviewerList.scss";

import InterviewerListItem from './InterviewerListItem';



export default function InterviewerList(props) {
  // const interviewersItem = classNames('interviewers__item', {
  //   'interviewers__item--selected': props.selected
  // });
 
  const interviewerObj = props.interviewers.map((list)=> {
  return(
    <InterviewerListItem 
    key={list.id}
    name={list.name}
    avatar={list.avatar}
    setInterviewer= {() => props.onChange(list.id)}
    selected={list.id === props.value}      
    />
  )
  });
 

  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerObj}</ul>
  </section>
};