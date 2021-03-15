import React from "react";
import {
  Link
} from "react-router-dom";
import Iframe from "react-iframe";

import ErrorNotification from "./ErrorNotification";

import "./xendit.min";

export default class Enroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "Raphael",
      middleName: "B",
      lastName: "Alampay",
      email: "raphael.alampay@trainocate.com",
      company: "Trainocate PH",
      contactNumber: "09770510274",
      ccNumber: "4000000000000002",
      ccExpiryMonth: "01",
      ccExpiryYear: "2025",
      ccCvn: "123",
      isMultipleUse: false,
      isLoading: false,
      urlValidatePayment: "#",
      iFrameDisplay: "none",
      errors: []
    }
  }

  validateClientParameters() {
    var errors = [];

    if(!this.state.firstName) {
      errors.push("First name required");
    }

    if(!this.state.lastName) {
      errors.push("Last name required");
    }

    if(!this.state.email) {
      errors.push("Email required");
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!re.test(String(this.state.email).toLowerCase())) {
        errors.push("Invalid email format");
      }
    }

    if(!this.state.contactNumber) {
      errors.push("Contact number required");
    }

    if(!this.state.ccNumber) {
      errors.push("Credit card number required");
    }

    if(!this.state.ccExpiryMonth) {
      errors.push("Expiry month required");
    }

    if(!this.state.ccExpiryYear) {
      errors.push("Expiry year required");
    }

    if(!this.state.ccCvn) {
      errors.push("CVN number required");
    }

    return errors;
  }

  handleEnrollClicked() {
    this.setState({
      errors: [],
      isLoading: true
    });

    var errors = this.validateClientParameters();

    if(errors.length > 0) {
      this.setState({
        errors: errors,
        isLoading: false
      });
    } else {
      Xendit.setPublishableKey(this.props.xenditToken);

      var dataCreateToken = {
        amount:           this.props.course.price,
        card_number:      this.state.ccNumber,
        card_exp_month:   this.state.ccExpiryMonth,
        card_exp_year:    this.state.ccExpiryYear,
        card_cvn:         this.state.ccCvn,
        is_multiple_use:  this.state.isMultipleUse
      }

      Xendit.card.createToken(dataCreateToken, this.xenditResponseHandler.bind(this));
    }
  }

  xenditResponseHandler(err, creditCardCharge) {
    var context = this;
    var errors  = [];

    if(err) {
      errors.push(err.message);

      this.setState({
        isLoading: false,
        errors: errors
      });
    } else {
      if(creditCardCharge.status === 'VERIFIED') {
        var paymentToken = creditCardCharge.id;

        this.setState({
          isLoading: false,
          errors: [],
          urlValidatePayment: "#",
          iFrameDisplay: "none"
        });
        
        $.ajax({
          url: context.props.urlPayment,
          method: 'POST',
          data: {
            token: paymentToken
          },
          success: function(response) {
            console.log(response);
            alert("Successfully made payment!");
          },
          error: function(response) {
            console.log(response);
            errors.push("Something went wrong!");
          },
          complete: function(response) {
            context.setState({
              isLoading: false,
              errors: errors
            });
          }
        });
      } else if(creditCardCharge.status === 'IN_REVIEW') {
        this.setState({
          urlValidatePayment: creditCardCharge.payer_authentication_url,
          iFrameDisplay: "initial"
        });
      } else if(creditCardCharge.status === 'FAILED') {
        errors.push(creditCardCharge.failure_reason);
      }

      this.setState({
        isLoading: false,
        errors: errors
      });
    }
  }

  handleFirstNameChanged(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleMiddleNameChanged(event) {
    this.setState({
      middleName: event.target.value
    });
  }

  handleLastNameChanged(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  handleEmailChanged(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleContactNumberChanged(event) {
    this.setState({
      contactNumber: event.target.value
    });
  }

  handleCompanyChanged(event) {
    this.setState({
      company: event.target.value
    });
  }

  handleCreditCardNumberChanged(event) {
    this.setState({
      ccNumber: event.target.value
    });
  }

  handleCreditCardExpiryMonthChanged(event) {
    this.setState({
      ccExpiryMonth: event.target.value
    });
  }

  handleCreditCardExpiryYearChanged(event) {
    this.setState({
      ccExpiryYear: event.target.value
    });
  }

  handleCreditCardCvnChanged(event) {
    this.setState({
      ccCvn: event.target.value
    })
  }

  render() {
    if(this.props.course) {
      var years = [];
      var currentYear = (new Date()).getFullYear()

      for(var i = currentYear; i < currentYear + 5; i++) {
        years.push(
          <option value={i} key={"year-" + i}>
            {i}
          </option>
        );
      }

      return (
        <div className="container-fluid">
          <h1>
            Enrollment
          </h1>
          <h2>
            Course: {this.props.course.name} ({this.props.course.code})
          </h2>
          <ErrorNotification
            messages={this.state.errors}
          />
          <Iframe
            url={this.state.urlValidatePayment}
            display={this.state.iFrameDisplay}
            width="550"
            height="450"
          />
          <div className="row">
            <div className="col-md-8 col-xs-12">
              <h2>
                Personal Information
              </h2>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-5 col-xs-12">
                      <div className="form-group">
                        <label>
                          * First Name
                        </label>
                        <input
                          value={this.state.firstName}
                          onChange={this.handleFirstNameChanged.bind(this)}
                          className="form-control"
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                    <div className="col-md-2 col-xs-12">
                      <div className="form-group">
                        <label>
                          * Middle Name
                        </label>
                        <input
                          value={this.state.middleName}
                          onChange={this.handleMiddleNameChanged.bind(this)}
                          className="form-control"
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                    <div className="col-md-5 col-xs-12">
                      <div className="form-group">
                        <label>
                          * Last Name
                        </label>
                        <input
                          value={this.state.lastName}
                          onChange={this.handleLastNameChanged.bind(this)}
                          className="form-control"
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>
                          Company
                        </label>
                        <input
                          value={this.state.company}
                          onChange={this.handleCompanyChanged.bind(this)}
                          className="form-control"
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <div className="form-group">
                        <label>
                          * Email
                        </label>
                        <input
                          value={this.state.email}
                          onChange={this.handleEmailChanged.bind(this)}
                          className="form-control"
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <div className="form-group">
                        <label>
                          * Contact Number
                        </label>
                        <input
                          value={this.state.contactNumber}
                          onChange={this.handleContactNumberChanged.bind(this)}
                          className="form-control"
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-12">
              <h2>
                Payment Details
              </h2>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h4>
                        Amount: {this.props.course.price}
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>
                          Credit Card Number:
                        </label>
                        <input
                          value={this.state.ccNumber}
                          className="form-control"
                          onChange={this.handleCreditCardNumberChanged.bind(this)}
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 col-xs-12">
                      <div className="form-group">
                        <label>
                          Exp Month
                        </label>
                        <select
                          className="form-control"
                          value={this.state.ccExpiryMonth}
                          onChange={this.handleCreditCardExpiryMonthChanged.bind(this)}
                          disabled={this.state.isLoading}
                        >
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 col-xs-12">
                      <div className="form-group">
                        <label>
                          Exp Year
                        </label>
                        <select
                          className="form-control"
                          value={this.state.ccExpiryYear}
                          onChange={this.handleCreditCardExpiryYearChanged.bind(this)}
                          disabled={this.state.isLoading}
                        >
                          {years}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>
                          CVN
                        </label>
                        <input
                          className="form-control"
                          value={this.state.ccCvn}
                          onChange={this.handleCreditCardCvnChanged.bind(this)}
                          disabled={this.state.isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <button
            className="btn btn-success btn-block"
            onClick={this.handleEnrollClicked.bind(this)}
            disabled={this.state.isLoading}
          >
            Enroll Now
          </button>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          No course selected. Go back to <Link to="/courses">courses</Link>.
        </div>
      );
    }
  }
}
