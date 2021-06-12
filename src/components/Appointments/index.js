import React from "react";

import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Form from "components/Appointments/Form";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Status from "components/Appointments/Status";
import Confirm from "components/Appointments/Confirm";
import useVisualMode from "../../hooks/useVisualMode.js";
import Error from "components/Appointments/Error";

// :last-of-type CSS selector in the last appointment



export default function Appointment(props) {

  // console.log("props from index.js: ", props);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVE);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(() => {
      transition(ERROR_SAVE);
    })
    
  };

  function deleteInterview() {
    transition(DELETE);

    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(() => {
      transition(ERROR_DELETE);
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
            onEdit={() => {transition(EDIT)}}
          />)
        }
        
        {mode === CREATE &&
          (<Form 
            interviewers={props.interviewers} 
            onCancel={back}
            onSave={save}
          />)
        }
        
        {mode === SAVE && 
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
          (<Form 
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers} 
            onCancel={back}
            onSave={save}
          />)
        }
        {mode === ERROR_SAVE && (
          <Error
            message="Could not save appointment"
            onClose={() => transition(EMPTY)}
          />
          )
        }
        {mode === ERROR_DELETE && (
          <Error
            message="Could not delete appointment"
            onClose={() => transition(SHOW)}
          />
          )
        }
        
    </article>
  )

}

