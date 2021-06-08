import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {

  console.log("props: ", props);
  console.log("props.days: ", props.days);

  const data = props.days.map((day, index) => {
    return (
      <DayListItem 
      key={index}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
    )
  })

  return(
    <ul>
      {data}
    </ul>
  )
}