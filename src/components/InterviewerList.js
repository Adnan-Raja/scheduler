import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

import PropTypes from "prop-types";

export default function InterviewerList(props) {
  // const interviewersItem = classNames('interviewers__item', {
  //   'interviewers__item--selected': props.selected
  // });
  //console.log(props.interviewers)
  const interviewerObj = props.interviewers.map((list) => {
    return (
      <InterviewerListItem
        key={list.id}
        name={list.name}
        avatar={list.avatar}
        selected={list.id === props.value}
        setInterviewer={() => props.onChange(list.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerObj}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
