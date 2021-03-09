import React from "react";

import AdminCourseForm from "./AdminCourseForm";

export default class AdminIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: []
    }
  }

  render() {
    return (
      <div className="container">
        <h1>
          Admin
        </h1>
        <AdminCourseForm
        />
      </div>
    );
  }
}
