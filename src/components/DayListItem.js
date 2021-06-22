import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

const formatSpots = (spots) => {
  let result = "";
  if (!spots) {
    result = "no spots remaining";
  } else if (spots > 1) {
    result = `${spots} spots remaining`;
  } else if (spots === 1) {
    result = "1 spot remaining";
  }
  return result;
}

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--full": props.spots === 0,
    "day-list__item--selected": props.selected,
  })


  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

// unselected turns orange on hover
// selected is white
// full is grey
// clickable turns orange on hover & sends message on click