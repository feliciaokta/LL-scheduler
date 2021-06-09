import React from "react";
import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";

// :last-of-type CSS selector in the last appointment

export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )
    }
    </article>
  )

}

