import React from "react";
import $ from 'jquery';

import ErrorNotification from "./ErrorNotification";

export default class AdminCourseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || "New Course",
      code: props.code || "NC",
      description: props.description || "Some Description",
      price: props.price || 40000.00,
      numDays: props.numDays || 1,
      isSubmitting: false,
      apiSaveCourse: props.apiSaveCourse,
      errors: []
    }
  }

  handleSaveClicked() {
    this.setState({
      isSubmitting: true,
      errors: []
    });

    var context = this;

    var data = {
      code:         context.state.code,
      name:         context.state.name,
      description:  context.state.description,
      price:        context.state.price,
      num_days:     context.state.numDays
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

        context.setState({
          isSubmitting: false
        });
      },
      error: function(response) {
        console.log(response);
        alert("Something went wrong!");

        context.setState({
          isSubmitting: false
        });
      }
    });
  }

  handleNameChanged(event) {
    this.updateState({
      name: event.target.value
    });
  }

  handleCodeChanged(event) {
    this.updateState({
      code: event.target.value
    });
  }

  handleDescriptionChanged(event) {
    this.updateState({
      description: event.target.value
    });
  }

  handlePriceChanged(event) {
    this.updateState({
      price: event.target.value
    });
  }

  handleNumDaysChanged(event) {
    this.updateNumDays({
      numDays: event.target.value
    });
  }

  render() {
    return (
      <div>
        <ErrorNotification
          messages={this.state.errors}
        />
        <div className="row">
          <div className="col-md-9 col-xs-12">
            <div className="form-group">
              <label>
                * Name
              </label>
              <input
                value={this.state.name}
                className="form-control"
                onChange={this.handleNameChanged.bind(this)}
                disabled={this.state.isSubmitting}
              />
            </div>
          </div>
          <div className="col-md-3 col-xs-12">
            <div className="form-group">
              <label>
                * Code
              </label>
              <input
                value={this.state.code}
                className="form-control"
                onChange={this.handleCodeChanged.bind(this)}
                disabled={this.state.isSubmitting}
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
                value={this.state.description}
                className="form-control"
                onChange={this.handleDescriptionChanged.bind(this)}
                disabled={this.state.isSubmitting}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-xs-12">
            <div className="form-group">
              <label>
                * Price
              </label>
              <input
                value={this.state.price}
                type="number"
                className="form-control"
                onChange={this.handlePriceChanged.bind(this)}
                disabled={this.state.isSubmitting}
              />
            </div>
          </div>
          <div className="col-md-3 col-xs-12">
            <div className="form-group">
              <label>
                * Number of Days
              </label>
              <input
                value={this.state.numDays}
                type="number"
                className="form-control"
                onChange={this.handleNumDaysChanged.bind(this)}
                disabled={this.state.isSubmitting}
              />
            </div>
          </div>
        </div>
        <hr/>
        <button 
          className="btn btn-success btn-block"
          disabled={this.state.isSubmitting}
          onClick={this.handleSaveClicked.bind(this)}
        >
          Save Record
        </button>
      </div>
    );
  }
}
