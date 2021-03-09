import React from "react";

export default class ErrorNotification extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.messages.length > 0) {
      var errorMessages = [];

      for(var i = 0; i < this.props.messages.length; i++) {
        errorMessages.push(
          <li key={"error-" + i}>
            {this.props.messages[i]}
          </li>
        )
      }

      return (
        <div className="alert alert-danger">
          <h3>
            Errors
          </h3>
          {errorMessages}
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}
