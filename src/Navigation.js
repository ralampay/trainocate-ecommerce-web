import React from "react";
import {
  Link
} from "react-router-dom";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>
          Navigation
        </h2>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/admin">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
