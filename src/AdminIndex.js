import React from "react";
import $ from 'jquery';

import AdminCourseForm from "./AdminCourseForm";
import ErrorNotification from "./ErrorNotification";

export default class AdminIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      currentCourseCode: "",
      currentCourseName: "",
      currentCourseDescription: "",
      currentCoursePrice: 0.00,
      currentCourseNumDays: 1,
      isSubmitting: false
    }
  }

  componentDidMount() {
    this.fetchCourses();
  }

  handleUpdateCurrentCourseCode(code) {
    this.setState({ currentCourseCode: code });
  }

  handleUpdateCurrentCourseName(name) {
    this.setState({ currentCourseName: name });
  }

  handleUpdateCurrentCourseDescription(description) {
    this.setState({ currentCourseDescription: description });
  }

  handleUpdateCurrentCoursePrice(price) {
    this.setState({ currentCoursePrice: price });
  }

  handleUpdateCurrentCourseNumDays(numDays) {
    this.setState({ currentCourseNumDays: numDays });
  }

  toggleIsSubmitting() {
    this.setState({ isSubmitting: !this.state.isSubmitting });
  }

  fetchCourses() {
    var context = this;

    context.toggleIsSubmitting();

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
        context.toggleIsSubmitting();
      },
      error: function(response) {
        alert("Error in fetching courses!");
        context.toggleIsSubmitting();
      }
    });
  }

  handleEditCourseClicked(code) {
    var result  = this.state.courses.filter(function(o) {
                    return o.code === code;
                  });

    if(result.length > 0) {
      var o = result[0];

      this.setState({
        currentCourseCode: o.code,
        currentCourseName: o.name,
        currentCourseDescription: o.description,
        currentCoursePrice: o.price,
        currentCourseNumDays: o.num_days
      });
    }
  }

  handleDeleteCourseClicked(code, name) {
    this.toggleIsSubmitting();

    var context = this;

    $.ajax({
      url: context.props.apiDestroyCourse,
      method: 'DELETE',
      data: JSON.stringify({ 'code': code, 'name': name }),
      headers: {
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      success: function(response) {
        context.toggleIsSubmitting();
        alert("Successfully deleted course " + code + "!");
        context.fetchCourses();
      },
      error: function(response) {
        context.toggleIsSubmitting();
        alert("Error in deleting course " + code + "!");
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
      var context = this;

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
                  <div className="btn-group">
                    <button
                      onClick={context.handleEditCourseClicked.bind(context, o.code)}
                      className="btn btn-info"
                      disabled={context.state.isSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      onClick={context.handleDeleteCourseClicked.bind(context, o.code, o.name)}
                      className="btn btn-danger"
                      disabled={context.state.isSubmitting}
                    >
                      Delete
                    </button>
                  </div>
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
              code={this.state.currentCourseCode}
              name={this.state.currentCourseName}
              description={this.state.currentCourseDescription}
              price={this.state.currentCoursePrice}
              numDays={this.state.currentCourseNumDays}
              handleUpdateCurrentCourseCode={this.handleUpdateCurrentCourseCode.bind(this)}
              handleUpdateCurrentCourseName={this.handleUpdateCurrentCourseName.bind(this)}
              handleUpdateCurrentCourseDescription={this.handleUpdateCurrentCourseDescription.bind(this)}
              handleUpdateCurrentCoursePrice={this.handleUpdateCurrentCoursePrice.bind(this)}
              handleUpdateCurrentCourseNumDays={this.handleUpdateCurrentCourseNumDays.bind(this)}
              toggleIsSubmitting={this.toggleIsSubmitting.bind(this)}
              isSubmitting={this.state.isSubmitting}
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
