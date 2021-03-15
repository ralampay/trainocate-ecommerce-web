import React from "react";
import {
  Link
} from "react-router-dom";


export default class CoursesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: props.courses || []
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

  setCurrentCourse(course) {
    this.props.setCurrentCourse(course);
  }

  renderCourses() {
    var context = this;

    if(context.state.courses.length == 0) {
      return (
        <div>
          No courses found.
        </div>
      );
    } else {
      return (
        <div>
          {
            context.state.courses.map(function(o) {
              return (
                <div key={"course-" + o.code}>
                  <h1>
                    {o.name}
                  </h1>
                  <h3>
                    {o.code}
                  </h3>
                  <h4>
                    Price {o.price} Duration: {o.num_days} Days
                  </h4>
                  <p>
                    {o.description}
                  </p>
                  <Link 
                    to="/enroll" 
                    className="btn btn-info"
                    onClick={context.setCurrentCourse.bind(context, o)}
                  >
                    Enroll
                  </Link>
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
        <div className="row">
          <div className="col">
            <h1>
              Courses
            </h1>
            {this.renderCourses()}
          </div>
        </div>
      </div>
    );
  }
}
