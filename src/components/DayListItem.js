import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--full": props.spots === 0,
    "day-list__item--selected": props.selected,
  })

  const formatSpots = (spots) => {
    let result = "";
    if (!spots) {
      result = "no spots remaining";
    } else if (spots > 1) {
      result = `${spots} spots remaining`;
    } else if (spots === 1) {
      result = `${spots} spot remaining`;
    }
    return result;
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

// unselected turns orange on hover
// selected is white
// full is grey
// clickable turns orange on hover & sends message on click