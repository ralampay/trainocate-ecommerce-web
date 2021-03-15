import React from "react";

export default class CoursesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: props.courses || [],
      course: {
        code: "",
        name: "",
        description: "",
        price: 0.00,
        num_days: 0
      }
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
