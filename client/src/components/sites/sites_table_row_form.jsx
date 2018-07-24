import React, { Component } from 'react';
import TrustSelector from '../trusts/trust_selector';
import CountrySelector from '../helper/country_selector';
import StateSelector from '../helper/state_selector';
// import DateSelector from '../helper/date_selector';


class SitesTableRowForm extends Component {
	constructor (props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleTrustChange = this.handleTrustChange.bind(this);
		this.handleSiteUpdate = this.handleSiteUpdate.bind(this);
	}

	// handling methods

	handleChange (e) {
		e.preventDefault();
		this.props.handleSiteChange(this.props.site._id, e.target.name, e.target.value);
	}
	handleTrustChange (site_id, name, trust_id) {
		this.props.handleSiteChange(this.props.site.id, name, trust_id);
	}
	handleSiteUpdate () {
		this.props.handleSiteUpdate(this.props.site._id);
	}

	// render

  	render () {
	    return (
	        <tr>
	        	 <td>
	              <TrustSelector
	            		name="trust"
	            		classes="grayedOut"
	            		site_id={this.props.site._id}
	            		trust_id={this.props.site.trust_id}
	            		allTrusts={this.props.allTrusts}
	            		handleChange={this.handleTrustChange}
	            	/>
	            </td>
	            <td>
	              <input
	               	type="text"
	               	className=""
	                name="name"
	                value={this.props.toTitleCase(this.props.site.name)}
	                onChange={this.handleChange}
	              />
	            </td>
	            <td>
	              <input
	              	type="text"
	              	className=""
	                name="city"
	                value={this.props.toTitleCase(this.props.site.city)}
	                onChange={this.handleChange}
	              />
	            </td>
	            <td>
	            	<StateSelector
	            		classes="pointable"
	            		name="state"
                  data={this.props.site.state}
                  handleChange={this.handleChange}
	            	/>
	            </td>
	            <td>
	            	<CountrySelector
	            		classes="pointable"
	            		name="country"
                  data={this.props.site.country}
                  handleChange={this.handleChange}
	            	/>
	            </td>
	            <td>
		            <a onClick={this.handleSiteUpdate}><i className="fa fa-check"></i></a>
		            <a onClick={this.props.toggleEdit}><i className="fa fa-undo"></i></a>
	            </td>
	        </tr>
	    );
	}
}

export default SitesTableRowForm;
