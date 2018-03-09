import React, { Component } from 'react';
import SitesTableRow from './sites_table_row';
// import Pagination from '../helper/pagination';

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
    // console.log("this.props on sites table", this.props);
    // let narrowedSites = this.props.narrowedSites ? this.props.narrowedSites : [];
		let currentPageOfSites = this.props.currentPageOfSites ? this.props.currentPageOfSites : [];
    let siteRows = [];

    // if (narrowedSites.length > 0) {
    //   siteRows = narrowedSites.map((site) => {
    //     return (
    //         <SitesTableRow
    //           site={site}
    //           allTrusts={this.props.allTrusts}
    //           key={site._id}
    //           handleSiteChange={this.handleSiteChange}
    //           handleSiteUpdate={this.props.handleSiteUpdate}
    //           handleSiteDelete={this.props.handleSiteDelete}
    //         />
    //     );
    //   });
    // } else {
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
    // }

  //   currentPageOfSites.map((site) => {
		//   	return (
		//       	<SitesTableRow
		//       		site={site}
		//       		allTrusts={this.props.allTrusts}
		//       		key={site._id}
		//       		handleSiteChange={this.handleSiteChange}
		//       		handleSiteUpdate={this.props.handleSiteUpdate}
		//       		handleSiteDelete={this.props.handleSiteDelete}
		//       	/>
		//     );
		// });
    return 	(	<tbody>
    					{siteRows}
    					</tbody>
    				);
  }
}

/*    	<tr>
    		<td>
	    		<Pagination
	    			items={this.props.allSites}
	    			onChangePage={this.props.onChangePage}
	    		/>
    		</td>
    	</tr>
    	*/

export default SitesTable;
