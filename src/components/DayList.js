import React from 'react';

import DayListItem from 'components/DayListItem'

export default function DayList(props) {
  // obejct destructure to define children of DayListItem
  const {days, day, setDay} = props;
  // Declare variable that will be passed in ul
  const listItems = days.map((items) => {
    return (
      // Array of DayListItem 
      <DayListItem 
      key={items.id}
      name={items.name}
      spots={items.spots} 
      selected={items.name === props.day}
      {...items}
      setDay={setDay}  
    />      
    )
  });
  // Render the new day list item inside a ul tag
  return <ul>{listItems}</ul>;
};