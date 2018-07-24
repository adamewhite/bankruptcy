import React, { Component } from 'react';

class DateSelector extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // handling methods

  handleChange (e) {
    e.preventDefault();
    console.log("handleDateChange", this.props.name, e.target.name, e.target.value);
    this.props.handleDateChange(this.props.name, e.target.name, e.target.value);
  }

  // helper methods

  createMonthOptions () {
    let monthOptions = [];

    for (let i = 1; i <= 28; i++) {
      monthOptions.push(<option key={i} value={i}>{i}</option>)
    }

    if (this.props.date.month === "4" ||
        this.props.date.month === "6" ||
        this.props.date.month === "9" ||
        this.props.date.month === "11") {
      monthOptions.push(<option key="29" value="29">29</option>);
      monthOptions.push(<option key="30" value="30">30</option>);
    }

    if (this.props.date.month === "1" ||
        this.props.date.month === "3" ||
        this.props.date.month === "5" ||
        this.props.date.month === "7" ||
        this.props.date.month === "8" ||
        this.props.date.month === "10" ||
        this.props.date.month === "12") {
      monthOptions.push(<option key="29" value="29">29</option>);
      monthOptions.push(<option key="30" value="30">30</option>);
      monthOptions.push(<option key="31" value="31">31</option>);
    }

    if (this.props.date.month === "2" && parseInt(this.props.date.year, 10) % 4 === 0) {
      monthOptions.push(<option key="29" value="29">29</option>);
    }

    return monthOptions;

  }

  createYearOptions () {
    let yearOptions = [];

    for (let i = 2018; i >= 1900; i--) {
      yearOptions.push(<option key={i} value={i}>{i}</option>)
    }

    return yearOptions;

  }

  // render

  render () {

    const monthOptions = this.createMonthOptions();
    const yearOptions = this.createYearOptions();

    return (
        <div className={this.props.classes}>
          <select
            placeholder="Month"
            className="month"
            name="month"
            value={this.props.date.month}
            onChange={this.handleChange}>
              <option key="0" disabled></option>
              <option key="1" value="1">January</option>
              <option key="2" value="2">February</option>
              <option key="3" value="3">March</option>
              <option key="4" value="4">April</option>
              <option key="5" value="5">May</option>
              <option key="6" value="6">June</option>
              <option key="7" value="7">July</option>
              <option key="8" value="8">August</option>
              <option key="9" value="9">September</option>
              <option key="10" value="10">October</option>
              <option key="11" value="11">November</option>
              <option key="12" value="12">December</option>
          </select>

          <select
            placeholder="Day"
            className="month"
            name="day"
            value={this.props.date.day}
            onChange={this.handleChange}
          >
            <option disabled hidden></option>
            {monthOptions}
          </select>

          <select
            placeholder="Year"
            className="month"
            name="year"
            value={this.props.date.year}
            onChange={this.handleChange}
          >
            <option disabled hidden></option>
            {yearOptions}
          </select>

        </div>
    );
  }
}

export default DateSelector;
