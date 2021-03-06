import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList(props) {

  // props = all the interviewers available for the day to select from when making a new appointment (after you click the plus button). 5 interviewers per day and their avatars in one array.

  const data = props.interviewers.map((interviewer) => {
    return (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={(event) => props.onChange(interviewer.id)}
    />)
  })

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{data}</ul>
    </section>
  )

};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;