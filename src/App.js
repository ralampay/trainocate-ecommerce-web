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
import Enroll from "./Enroll";
import AdminIndex from "./AdminIndex";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiSaveCourse: props.apiBaseUrl + props.endpointAdminSaveCourse,
      apiFetchCourses: props.apiBaseUrl + props.endpointFetchCourses,
      apiDestroyCourse: props.apiBaseUrl + props.endpointDestroyCourse,
      apiMakeCreditCardPayment: props.apiBaseUrl + props.endpointMakeCreditCardPayment,
      course: false
    }
  }

  setCurrentCourse(course) {
    this.setState({ course: course });
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
              apiFetchCourses={this.state.apiFetchCourses}
              setCurrentCourse={this.setCurrentCourse.bind(this)}
            />
          </Route>
          <Route exact path="/enroll">
            <Enroll
              apiMakeCreditCardPayment={this.state.apiMakeCreditCardPayment}
              course={this.state.course}
              xenditToken={this.props.xenditToken}
            />
          </Route>
          <Route exact path="/admin">
            <AdminIndex
              apiSaveCourse={this.state.apiSaveCourse}
              apiFetchCourses={this.state.apiFetchCourses}
              apiDestroyCourse={this.state.apiDestroyCourse}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}
