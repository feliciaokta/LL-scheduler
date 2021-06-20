# Interview Scheduler

Just like the project name says, this app is used to schedule and organize interviews. Pretty straightforward, except that this was built using React, which was quite a challenge for me, but I somehow survived.

Here's how to use it:
1. Users are given 5 slots each day from Monday to Friday.
2. Book an appointment for an interview by clicking the plus button in the desired time slot.
3. A form will appear, then enter student name, and select the interviewer.
4. Press save.
5. If a typo occured, edit the appointment by clicking the edit button on the bottom right of the slot.
6. If an appointment is cancelled, press the delete button, which is located right next to the edit button.

Components built separately using Storybook.
App built using React.
Tested using Jest and Cypress.

## Screenshots

!["Index Page"](https://github.com/feliciaokta/LL-scheduler/blob/master/Screenshots/FrontPage.png?raw=true)

!["Add An Interview"](https://github.com/feliciaokta/LL-scheduler/blob/master/Screenshots/AddInterview.png?raw=true)

!["Delete Interview Confirmation"](https://github.com/feliciaokta/LL-scheduler/blob/master/Screenshots/DeleteConfirm.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

1. Go to your terminal, cd to the `scheduler-api` directory, then run:
```sh
npm start
```

2. Make a new tab in your terminal, cd to the root directory of the project (mine is named `scheduler`), then run:
```sh
npm start
```

3. To reset the database after some tests, run `localhost:8001/api/debug/reset`

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
