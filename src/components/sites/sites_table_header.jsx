import React, { Component } from 'react';

class SitesTableHeader extends Component {
  render () {
    return  <thead>
              <tr>
                <th onClick={() => this.props.sortBy('trust_id')}><a>Trust Name</a></th>
                <th onClick={() => this.props.sortBy('name')}><a>Name</a></th>
                <th onClick={() => this.props.sortBy('city')}><a>City</a></th>
                <th onClick={() => this.props.sortBy('state')}><a>State</a></th>
                <th onClick={() => this.props.sortBy('country')}><a>Country</a></th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
  }
}

export default SitesTableHeader;
