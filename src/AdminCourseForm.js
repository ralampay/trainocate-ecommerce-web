import React from "react";

import ErrorNotification from "./ErrorNotification";

export default class AdminCourseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || "",
      code: props.code || "",
      description: props.description || "",
      cost: props.cost || 40000.00,
      isSubmitting: false,
      errors: []
    }
  }

  handleSaveClicked() {
    this.setState({
      isSubmitting: true,
      errors: []
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

  handleCostChanged(event) {
    this.updateState({
      cost: event.target.value
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
          <div className="col">
            <div className="form-group">
              <label>
                * Cost
              </label>
              <input
                value={this.state.cost}
                type="number"
                className="form-control"
                onChange={this.handleCostChanged.bind(this)}
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
