import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

export default function Form(props) {

  const data = props.interviewers.map((interviewer) => {
    return (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)}
    />)
  })

  return(
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
        />
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger>Cancel</Button>
        <Button confirm>Save</Button>
      </section>
    </section>
  </main>
  )
}