import React from "react";

import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Form from "components/Appointments/Form";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Status from "components/Appointments/Status";
import Confirm from "components/Appointments/Confirm";
import useVisualMode from "../../hooks/useVisualMode.js";

// :last-of-type CSS selector in the last appointment



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    
  };

  function deleteInterview() {
    transition(DELETE);

    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })

  };


  return (
    <article className="appointment">

      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => {transition(CONFIRM)}}
          />)
        }
        
        {mode === CREATE &&
          (<Form 
            interviewers={props.interviewers} 
            onCancel={back}
            onSave={save}
          />)
        }
        
        {mode === SAVING && 
          (<Status message="Saving" />)
        }
        
        {mode === DELETE &&
          (<Status message="Deleting" />)
        }

        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={back}
            onConfirm={deleteInterview}
          />
        )}

        {mode === EDIT &&
          (transition(CREATE))
        }
    </article>
  )

}

