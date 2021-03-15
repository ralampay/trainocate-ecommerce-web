import React from "react";
import ReactDOM from "react-dom";

// Include global jquery
import jquery from 'jquery';
import $ from 'jquery';

window.$ = window.jquery = jquery;

import App from "./App";

import "./stylesheets/application.scss";

const envVariables = process.env;
const {
  XENDIT_TOKEN,
  XENDIT_BASE_URL,
  TRAINOCATE_PAYMENT_ENDPOINT,
  API_BASE_URL,
  ENDPOINT_ADMIN_SAVE_COURSE,
  ENDPOINT_FETCH_COURSES
} = envVariables;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App 
      xenditToken={XENDIT_TOKEN}
      xenditBaseUrl={XENDIT_BASE_URL}
      urlPayment={TRAINOCATE_PAYMENT_ENDPOINT}
      apiBaseUrl={API_BASE_URL}
      endpointAdminSaveCourse={ENDPOINT_ADMIN_SAVE_COURSE}
      endpointFetchCourses={ENDPOINT_FETCH_COURSES}
    />,
    document.getElementById('root')
  )
});
