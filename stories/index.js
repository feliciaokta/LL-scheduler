import React from "react";
import { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointments/index";
import Header from "components/Appointments/Header";
import Empty from "components/Appointments/Empty";
import Show from "components/Appointments/Show";
import Confirm from "components/Appointments/Confirm";
import Status from "components/Appointments/Status";
import Error from "components/Appointments/Error";
import Form from "components/Appointments/Form";



// components/Button
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));



// components/DayListItem
storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));



// components/DayList
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));



// global const to populate InterviewerListItem
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};



// components/InterviewerListItem
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));



// global const to populate InterviewerList
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];



// components/InterviewerList
storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ));



// from index.js in Appointments folder
storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Header", () => <Header time="12pm" />)

  .add("Appointment", () => <Appointment />)

  .add("Appointment with Time", () => <Appointment time="12pm" />)

  // Appointments/index.js
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment className=":last-of-type" id="last" time="1pm" />
    </Fragment>
  ))

  // Appointments/index.js
  // :last-of-type CSS selector in the last appointment
  // not sure if this is "style" or "className"
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment className=":last-of-type" id="last" time="1pm" />
    </Fragment>
  ))

// components/Appointments/Empty
  .add("Add an appointment", () => (
    <Empty onAdd={action("onAdd")} />
  ))

// components/Appointments/Show
  .add("Student", () => (
    <Show student={"Lydia Miller-Jones"}
    interviewer={interviewers}
    onEdit={action("onEdit")}
    onDelete={action("onDelete")}
    />
  ))

// components/Appointments/Confirm
  .add("Confirm an appointment", () => (
    <Confirm
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))

// components/Appointments/Status
  .add("Show status", () => (<Status message="Deleting" /> ))

// components/Appointments/Error.js
  .add("Error message", () => (
    <Error
      message="Could not delete appointment"
      onClose={action("onClose")}
    />
  ))

//components/Appointments/Form
  .add("Edit", () => (
    <Form
    name=""
    interviewers={interviewers}
    interviewer={3}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
    setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ))
  .add("Create", () => (
    <Form
    interviewers={interviewers}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
    setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ))
