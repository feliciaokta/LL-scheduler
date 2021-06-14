import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  // console.log("props from InterviewerListItem: ", props);
  // when you click the add appointment button, props are the 5 interviewers available for the day, each in a separate object
  
  // this const is for the scss
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })
  
  return (
    <li
      id={props.id}
      className={InterviewerClass}
      onClick={props.setInterviewer}
      >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>

  )
};