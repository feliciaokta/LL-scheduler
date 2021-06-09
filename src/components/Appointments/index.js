import React from "react";
import classNames from 'classnames';
import "components/Appointments/styles.scss";



export default function Appointment(props) {

  return (
    <article className="appointment">{props.time}</article>
  )

}

