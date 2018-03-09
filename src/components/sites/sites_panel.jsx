import React, { Component } from 'react';
import SitesTableHeader from './sites_table_header';
import SitesTable from './sites_table';
import Pagination from '../helper/pagination';
import '../../stylesheets/siteResults.css';


class SitesPanel extends Component {
	constructor (props) {
		super(props);
		this.getTrustName = this.getTrustName.bind(this);
		// this.getSiteCount = this.getSiteCount.bind(this);
	}
	getTrustName () {
		return (this.props.narrowedTrustId) ? this.props.allTrusts.filter(trust => trust._id === this.props.narrowedTrustId).pop().name : '';
	}
	// getSiteCount () {
	// 	if (this.props.narrowedTrustId && this.props.narrowedTrustId.length !== 0) {
	// 		return this.props.narrowedSiteCount;
	// 	}
	// 	return this.props.totalSiteCount;
	// }
	render () {
		// console.log("sites panel props", this.props);
    return 	(<section className="results">
    					<div className="results_banner">
    						<p>Site Results - {this.getTrustName()} - {this.props.narrowedSiteCount} site{this.props.narrowedSiteCount > 1 ? 's' : ''}</p>
    					</div>
			    		<table>
								<SitesTableHeader
									sortBy={this.props.sortBy}
								/>
								<SitesTable
									currentPageOfSites={this.props.currentPageOfSites}
									narrowedSites={this.props.narrowedSites}
									allTrusts={this.props.allTrusts}
									handleSiteChange={this.props.handleSiteChange}
									handleSiteUpdate={this.props.handleSiteUpdate}
									handleSiteDelete={this.props.handleSiteDelete}
								/>
							</table>
							<Pagination
								currentPageOfSites={this.props.currentPageOfSites}
								currentPage={this.props.currentPage}
								pageSize={this.props.pageSize}
								narrowedSiteCount={this.props.narrowedSiteCount}
								onChangePage={this.props.onChangePage}
							 />
						</section>);
	}
}

export default SitesPanel;






// <Pagination
// 	items={this.props.allSites}
// 	onChangePage={this.props.onChangePage}
// />
