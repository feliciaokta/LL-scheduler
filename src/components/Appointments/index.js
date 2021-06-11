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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
  }

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
          <Form 
            interviewers={props.interviewers} 
            onCancel={back} 
            onSave={save}
          />
          
        }
    </article>
  )

}

