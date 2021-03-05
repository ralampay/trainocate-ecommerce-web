import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from "./Navigation";
import Main from "./Main";
import CoursesIndex from "./CoursesIndex";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Navigation/>

        <Switch>
          <Route exact path="/">
            <Main
            /> 
          </Route>
          <Route exact path="/courses">
            <CoursesIndex
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}
