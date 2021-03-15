import React from "react";
import $ from 'jquery';

import ErrorNotification from "./ErrorNotification";

export default class AdminCourseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiSaveCourse: props.apiSaveCourse,
      errors: []
    }
  }

  handleSaveClicked() {
    this.setState({
      errors: []
    });

    this.props.toggleIsSubmitting();

    var context = this;

    var data = {
      code:         context.props.code,
      name:         context.props.name,
      description:  context.props.description,
      price:        context.props.price,
      num_days:     context.props.numDays
    }

    console.log(data);

    var payload = JSON.stringify(data);
    console.log(payload);

    $.ajax({
      url: context.props.apiSaveCourse,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      data: payload,
      success: function(response) {
        console.log(response);
        alert("Successfully saved course!");

        context.props.toggleIsSubmitting();

        context.props.fetchCourses();
      },
      error: function(response) {
        console.log(response);
        alert("Something went wrong!");

        context.props.toggleIsSubmitting();
      }
    });
  }

  handleNameChanged(event) {
    this.props.handleUpdateCurrentCourseName(event.target.value);
  }

  handleCodeChanged(event) {
    this.props.handleUpdateCurrentCourseCode(event.target.value);
  }

  handleDescriptionChanged(event) {
    this.props.handleUpdateCurrentCourseDescription(event.target.value);
  }

  handlePriceChanged(event) {
    this.props.handleUpdateCurrentCoursePrice(event.target.value);
  }

  handleNumDaysChanged(event) {
    this.props.handleUpdateCurrentCourseNumDays(event.target.value);
  }

  render() {
    return (
      <div>
        <ErrorNotification
          messages={this.state.errors}
        />
        <div className="row">
          <div className="col-md-8 col-xs-12">
            <div className="form-group">
              <label>
                * Name
              </label>
              <input
                value={this.props.name}
                className="form-control"
                onChange={this.handleNameChanged.bind(this)}
                disabled={this.props.isSubmitting}
              />
            </div>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="form-group">
              <label>
                * Code
              </label>
              <input
                value={this.props.code}
                className="form-control"
                onChange={this.handleCodeChanged.bind(this)}
                disabled={this.props.isSubmitting}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>
                * Description
              </label>
              <input
                value={this.props.description}
                className="form-control"
                onChange={this.handleDescriptionChanged.bind(this)}
                disabled={this.props.isSubmitting}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-xs-12">
            <div className="form-group">
              <label>
                * Price
              </label>
              <input
                value={this.props.price}
                type="number"
                className="form-control"
                onChange={this.handlePriceChanged.bind(this)}
                disabled={this.props.isSubmitting}
              />
            </div>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="form-group">
              <label>
                * Number of Days
              </label>
              <input
                value={this.props.numDays}
                type="number"
                className="form-control"
                onChange={this.handleNumDaysChanged.bind(this)}
                disabled={this.props.isSubmitting}
              />
            </div>
          </div>
        </div>
        <hr/>
        <button 
          className="btn btn-success btn-block"
          disabled={this.props.isSubmitting}
          onClick={this.handleSaveClicked.bind(this)}
        >
          Save Record
        </button>
      </div>
    );
  }
}
