import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = function(props) {
    // 'no spots remaining'
    // '1 spot remaining'
    if (props === 0) {
    return 'no spots remaining'; 
  } else if (props === 1) {
    return '1 spot remaining';
    } else {
      return `${props} spots remaining`;
    } 
  };

  return (
    <li class={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className={"text--regular"}>{props.name}</h2>
      <h3 className="text--light"> {formatSpots(props.spots)} </h3>
    </li>
  );
}