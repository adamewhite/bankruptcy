import React, { Component } from 'react';

class TrustSelector extends Component {
	constructor (props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange (e) {
		e.preventDefault();
		this.props.handleChange(this.props.site_id, "trust_id", e.target.value);
	}
  	render () {
	  	const trust_list = this.props.allTrusts.map((t) => <option key={t._id} value={t._id}>{t.name}</option>);

	    return 	<select
	    					className={this.props.classes}
	    					disabled="true"
	    					name="trust_list"
	    					value={this.props.trust_id}
	    					onChange={this.handleChange}>
	    					{trust_list}
	    				</select>;
  	}
}

export default TrustSelector;
