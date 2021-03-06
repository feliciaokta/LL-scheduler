import React from "react";

import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";



afterEach(cleanup);



describe("Application", () => {
  
  
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

  const { getByText } = render(<Application />);
    
  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});



it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  
  const appointment = appointments[0];
  
  fireEvent.click(getByAltText(appointment, "Add"));
  
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
  fireEvent.click(getByText(appointment, "Save"));
  
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  // from DayListItem.js
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  ); 

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  // debug(); // this is the same as console.log("1. ", prettyDOM(container));

})



it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.

  expect(
    getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.

  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.

  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  // debug();
})



it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. display the form with Archie Cohen on the input textbox
  fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 5. make sure Tori Malcolm is the interviewer and it's selected
  fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

  // 6. click save
  fireEvent.click(getByText(appointment, "Save"));
  
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  // from DayListItem.js
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  ); 

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

});



it("shows the save error when failing to save an appointment", async () => {
  // error message: name cannot be blank
  axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  
  const appointment = appointments[0];
  
  fireEvent.click(getByAltText(appointment, "Add"));
  
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "" }
  });

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Student name cannot be blank")).toBeInTheDocument();

});



it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  // 1. render app
  const { container, debug } = render(<Application />);

  // 2. wait for Archie to appear
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. find Archie & delete his appt
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. show confirmation toggle
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  // 5. press confirm
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. "deleting" circle loading going around
  await waitForElement(() => getByText(appointment, "Deleting"));
  
  // 7. pop up "could not delete appt"

  expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();

});



});