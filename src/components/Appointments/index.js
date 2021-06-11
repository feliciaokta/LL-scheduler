import React from "react";
import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Form from "components/Appointments/Form";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import useVisualMode from "../../hooks/useVisualMode.js";

// :last-of-type CSS selector in the last appointment



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CANCEL = "CANCEL";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log("mode: ", mode);

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />)
        }
        {mode === CREATE &&
          <Form interviewers={props.interviewers} onCancel={() => back(CANCEL)} />
        }
    </article>
  )

}

