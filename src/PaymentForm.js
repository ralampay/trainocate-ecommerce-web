import React from "react";

import ErrorNotification from "./ErrorNotification";

import "./xendit.min";

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 5000.00,
      ccNumber: "4000000000000002",
      ccExpiryMonth: "12",
      ccExpiryYear: "2025",
      ccCvn: "123",
      isMultipleUse: false,
      isLoading: false,
      errors: []
    }
  }

  handlePayClicked() {
    this.setState({
      isLoading: true,
      errors: []
    });

    Xendit.setPublishableKey(this.props.xenditToken);

    var dataCreateToken = {
      amount:           this.state.amount,
      card_number:      this.state.ccNumber,
      card_exp_month:   this.state.ccExpiryMonth,
      card_exp_year:    this.state.ccExpiryYear,
      card_cvn:         this.state.ccCvn,
      is_multiple_use:  this.state.isMultipleUse
    };

    Xendit.card.createToken(dataCreateToken, this.xenditResponseHandler.bind(this));
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
        
        $.ajax({
          url: context.props.urlPayment,
          method: 'POST',
          data: {
            token: paymentToken,
            external_id: "something",
            amount: context.state.amount,
            cvv: context.state.cvn
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
        var w = window.open(creditCardCharge.payer_authentication_url, 'sample-inline-window');
      } else if(creditCardCharge.status === 'FAILED') {
        errors.push(creditCardCharge.failure_reason);
      }

      this.setState({
        isLoading: false,
        errors: errors
      });
    }
  }

  handleAmountChanged(event) {
    this.setState({
      amount: event.target.value
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
      <div className="container">
        <ErrorNotification
          messages={this.state.errors}
        />
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                value={this.state.amount}
                onChange={this.handleAmountChanged.bind(this)}
                disabled={this.state.isLoading}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-12">
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
          <div className="col-md-2 col-xs-12">
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
          <div className="col-md-2 col-xs-12">
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
          <div className="col-md-2 col-xs-12">
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
        <hr/>
        <button
          className="btn btn-success"
          onClick={this.handlePayClicked.bind(this)}
          disabled={this.state.isLoading}
        >
          <span className="fa fa-check"></span>
          Make Payment
        </button>
      </div>
    );
  }
}
