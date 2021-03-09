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
  XENDIT_BASE_URL
} = envVariables;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App 
      xenditToken={XENDIT_TOKEN}
      xenditBaseUrl={XENDIT_BASE_URL}
    />,
    document.getElementById('root')
  )
});
