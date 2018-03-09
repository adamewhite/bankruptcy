import React, { Component } from 'react';
import CountrySelector from '../helper/country_selector';
import StateSelector from '../helper/state_selector';
import DateSelector from '../helper/date_selector';
import '../../stylesheets/searchPanel.css';

class SearchPanel extends Component {
	constructor (props) {
		super(props);
        this.state = {invalid: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
	}

 // handling methods

 handleChange (e) {
  e.preventDefault();
  this.props.handleSearchObjChange(e.target.name, e.target.value);
 }

 handleSearchSubmit(e) {
  e.preventDefault();
  if (this.props.searchObj.name === '' &&
    this.props.searchObj.city === '' &&
    this.props.searchObj.state === '' &&
    this.props.searchObj.country === '') {
    this.setState({invalid: true});
  } else {
    this.setState({invalid: false});
    this.props.handleSearchSubmit();
  }
 }

 handleReset (e) {
  e.preventDefault();
  this.props.resetSearchObject();
  this.setState({invalid: false});
 }
// render

	render () {
		return (
    <form className="search" onSubmit={this.handleSearchSubmit}>
     <span></span>
     <ul>
      <li>
       <label className={this.state.invalid ? 'invalid' : ''} htmlFor="name">Site Name</label>
       <input
        type="text"
        name="name"
        className={this.state.invalid ? 'invalid' : ''}
        value={this.props.searchObj.name}
        // placeholder="Site Name"
        onChange={this.handleChange}
       />
      </li>
      <li>
       <label htmlFor="city">City</label>
       <input
        type="text"
        name="city"
        className={this.state.invalid ? 'invalid' : ''}
        value={this.props.searchObj.city}
        // placeholder="City"
        onChange={this.handleChange}
       />
      </li>
      <li>
       <label htmlFor="state">State</label>
       <StateSelector
        classes={this.state.invalid ? 'invalid' : ''}
        data={this.props.searchObj.state}
        handleChange={this.handleChange}
       />
      </li>
      <li>
       <label htmlFor="country">Country</label>
       <CountrySelector
        classes={this.state.invalid ? 'invalid' : ''}
        data={this.props.searchObj.country}
        handleChange={this.handleChange}
       />
      </li>
      <li>
        <label htmlFor="date_from">Date From</label>
        <DateSelector
          className=""
          classes="fulldatefield"
          name="date_from"
          date={this.props.searchObj.date_from}
          handleDateChange={this.props.handleDateChange}
        />
      </li>
      <li>
        <label htmlFor="date_to">Date To</label>
        <DateSelector
          className=""
          classes="fulldatefield"
          name="date_to"
          date={this.props.searchObj.date_to}
          handleDateChange={this.props.handleDateChange}
        />
      </li>
      <li className="button_container">
       <input
        type="submit"
        className="button"
        value="Search"
        onSubmit={this.handleSearchSubmit}
       />
       <input
        type="button"
        className="button"
        value="Reset"
        onClick={this.handleReset}
       />
      </li>
     </ul>
    </form>
   );
	}
}

export default SearchPanel;
