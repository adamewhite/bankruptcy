import React, { Component } from 'react';
import SitesTableRow from './sites_table_row';

class SitesTable extends Component {
	constructor (props) {
		super(props);
		this.handleSiteChange = this.handleSiteChange.bind(this);
	}

	// handling methods

	handleSiteChange (id, key, value) {
		const currentPageOfSites = this.props.currentPageOfSites ? this.props.currentPageOfSites : [];
		const updatedPageOfSites = currentPageOfSites.map((site) => {
			if (site._id !== id) {
				return site;
			} else {
				site[key] = value;
				return site;
			}});

		this.props.handleSiteChange(updatedPageOfSites);
	}

	// render

	render () {
		let currentPageOfSites = this.props.currentPageOfSites ? this.props.currentPageOfSites : [];
    let siteRows = [];

    siteRows = currentPageOfSites.map((site) => {
      return (
          <SitesTableRow
            site={site}
            allTrusts={this.props.allTrusts}
            key={site._id}
            handleSiteChange={this.handleSiteChange}
            handleSiteUpdate={this.props.handleSiteUpdate}
            handleSiteDelete={this.props.handleSiteDelete}
          />
      );
    });

    return 	(	<tbody>
    					{siteRows}
    					</tbody>
    				);
  }
}

export default SitesTable;
