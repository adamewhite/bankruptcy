import React, { Component } from 'react';
import dateFormat from 'dateformat';

class SitesTableRowDisplay extends Component {
	constructor (props) {
		super(props);
		this.state = {showModal: false};
    // this.determineClasses = this.determineClasses.bind(this);
		this.handleSiteDelete = this.handleSiteDelete.bind(this);
		// this.open = this.open.bind(this);
		// this.close = this.close.bind(this);
	}

	// handling methods

	handleSiteDelete () {
		this.props.handleSiteDelete(this.props.site._id);
	}

	findTrustName (trustId) {
    let trustName;

    if (this.props.allTrusts && this.props.allTrusts.length !== 0) {
      trustName = "Computing ...";
      trustName = this.props.allTrusts.filter((t) => {return t._id === trustId}).pop().name;
    } else {
      trustName = "Loading ...";
    }
    return trustName;
	}

  formatDate (dateStr) {
    var date = new Date(dateStr);

    return dateFormat(date, "mmm d, yyyy");
  }

	// render

    render () {
        return (
	            <tr>
	           		<td>{this.findTrustName(this.props.site.trust_id)}</td>
	              <td>{this.props.toTitleCase(this.props.site.name)}</td>
	             	<td>{this.props.toTitleCase(this.props.site.city)}</td>
	             	<td>{this.props.site.state}</td>
	             	<td>{this.props.toTitleCase(this.props.site.country)}</td>
              	<td>{this.formatDate(this.props.site.start_date)}</td>
              	<td>{this.formatDate(this.props.site.end_date)}</td>
              	<td>
	                <a onClick={this.props.toggleEdit}><i className="fa fa-pencil"></i></a>
	                <a><i onClick={this.handleSiteDelete} className="fa fa-trash"></i></a>
              	</td>
	            </tr>
           );
  	}
}

export default SitesTableRowDisplay;

// this.findTrustName(this.props.site.trust_id)
