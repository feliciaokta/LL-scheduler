import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import "components/Button.scss";
import "components/InterviewerList.scss";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  // function save () {
  //   props.onSave(name, interviewer)
  // }


  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");

    props.onSave(name, interviewer);
  }


  return(
  <main className="appointment__card appointment__card--create" data-testid="form">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name={props.name}
          value={name}
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
          /* This must be a controlled component */
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList
        interviewers={props.interviewers}
        value={interviewer}
        onChange={(value) => setInterviewer(value)} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  )
}