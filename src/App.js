import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from "./Navigation";
import Main from "./Main";
import CoursesIndex from "./CoursesIndex";
import PaymentForm from "./PaymentForm";
import AdminIndex from "./AdminIndex";

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
          <Route exact path="/make-payment">
            <PaymentForm
              xenditToken={this.props.xenditToken}
              xenditBaseUrl={this.props.xenditBaseUrl}
              urlPayment={this.props.urlPayment}
            />
          </Route>
          <Route exact path="/admin">
            <AdminIndex
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}
