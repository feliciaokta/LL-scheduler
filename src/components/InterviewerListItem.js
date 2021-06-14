import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  
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