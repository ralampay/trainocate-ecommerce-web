import React from "react";
import ReactDOM from "react-dom";

// Include global jquery
import jquery from 'jquery';
import $ from 'jquery';

window.$ = window.jquery = jquery;

import App from "./App";

import "./stylesheets/application.scss";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
});
