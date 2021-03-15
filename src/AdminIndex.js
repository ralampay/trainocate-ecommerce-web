import React from "react";
import $ from 'jquery';

import AdminCourseForm from "./AdminCourseForm";
import ErrorNotification from "./ErrorNotification";

export default class AdminIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses() {
    var context = this;

    $.ajax({
      url: context.props.apiFetchCourses,
      method: 'GET',
      data: {},
      headers: {
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      success: function(response) {
        context.setState({
          courses: response.courses
        });
      },
      error: function(response) {
        alert("Error in fetching courses!");
      }
    });
  }

  renderCourses() {
    if(this.state.courses.length == 0) {
      return (
        <div>
          No courses found.
        </div>
      );
    } else {
      console.log(this.state.courses);
      return (
        <div>
          {
            this.state.courses.map(function(o) {
              return (
                <div key={"course-" + o.code}>
                  <h2>
                    {o.name}
                  </h2>
                  <h5>
                    Code: {o.code}
                  </h5>
                  <h5>
                    Price: {o.price}
                  </h5>
                  <h5>
                    Duration: {o.num_days} Days
                  </h5>
                  <p>
                    {o.description}
                  </p>
                  <hr/>
                </div>
              )
            })
          }
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>
          Admin
        </h1>
        <div className="row">
          <div className="col-md-4 col-xs-12">
            <AdminCourseForm
              apiSaveCourse={this.props.apiSaveCourse}
              fetchCourses={this.fetchCourses.bind(this)}
            />
          </div>
          <div className="col-md-8 col-xs-12">
            {this.renderCourses()}
          </div>
        </div>
      </div>
    );
  }
}
