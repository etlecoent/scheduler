import React from 'react';

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  

  const dayList = props.days.map(e => {
    return (
      <DayListItem
        key={e['id']}
        name={e['name']} 
        spots={e['spots']} 
        selected={e['name'] === props.day}
        setDay={props.setDay}
      ></DayListItem>
    )
  })
  
  return (

    <ul>{dayList}</ul>
  )

}