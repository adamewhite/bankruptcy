import React, { Component } from 'react';
import SitesTableRowDisplay from './sites_table_row_display';
import SitesTableRowForm from './sites_table_row_form';


class SitesTableRow extends Component {
	constructor (props) {
		super(props);
		this.state = {edit: false};
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleSiteUpdate = this.handleSiteUpdate.bind(this);
		this.toTitleCase = this.toTitleCase.bind(this);
	}

	// handling state/update methods

	toggleEdit () {
		this.setState({edit: !this.state.edit});
	}
	handleSiteUpdate (id) {
		this.toggleEdit();
		this.props.handleSiteUpdate(id);
	}

	// helper methods

	toTitleCase(str)	{
		if (str !== 'USA') {
			return str.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
		} else {
			return 'USA';
		}
	}

	// render

  	render () {
       	if (this.state.edit) {
	      return 	<SitesTableRowForm
		      			site={this.props.site}
		      			allTrusts={this.props.allTrusts}
		      			toggleEdit={this.toggleEdit}
		      			handleSiteChange={this.props.handleSiteChange}
		      			handleSiteUpdate={this.handleSiteUpdate}
		      			toTitleCase={this.toTitleCase}
	      			/>
	    } else {
	      return 	<SitesTableRowDisplay
	      				site={this.props.site}
	      				allTrusts={this.props.allTrusts}
	      				toggleEdit={this.toggleEdit}
	      				handleSiteDelete={this.props.handleSiteDelete}
	      				toTitleCase={this.toTitleCase}
	      			/>
	    }
 	}
}

export default SitesTableRow;
