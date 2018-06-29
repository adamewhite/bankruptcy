import React, { Component } from 'react';
import axios from 'axios';
import '../stylesheets/sites.css';

// import Navbar from './navigation/Navbar';
import SearchPanel from './search/search_panel';
import SitesPanel from './sites/sites_panel';
import TrustPanel from './trusts/trust_panel';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {searchObj: {name: '',
                              city: '',
                              state: '',
                              country: '',
                              },
                  paginationObj: {pageSize: 10,
                                  currentPageOfSites: [],
                                  currentPage: 1,
                                  unnarrowedSiteCount: 0,
                                  narrowedSiteCount: 0
                                },
                  sortCategory:'trust_id',
                  sortDirection: 1,
                  visible: false,
                  allTrusts: [],
                  eligibleTrustIds: [],
                  narrowedTrustId: '',
                  searchConducted: false
                  };

    this.fetchSites = this.fetchSites.bind(this);
    this.fetchTrusts = this.fetchTrusts.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.handleSearchObjChange = this.handleSearchObjChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleSiteUpdate = this.handleSiteUpdate.bind(this);
    this.handleSiteDelete = this.handleSiteDelete.bind(this);
    this.narrowSiteList = this.narrowSiteList.bind(this);
    this.resetSearchObject = this.resetSearchObject.bind(this);
    this.sortBy = this.sortBy.bind(this);

  }

  // component lifecycle methods

  componentDidMount () {
    this.fetchTrusts();
    this.fetchSites();
  }

  componentWillUnmount () {
  }

  // fetch sites

  fetchTrusts () {
    axios.get(this.props.trustsUrl)
        .then(res => {
          this.setState({allTrusts: res.data});
        })
        .catch(console.error);
  }

  fetchSites () {
    let queryObj = {};

    this.setState({ searchConducted: false });

    queryObj = this.createQueryObj();

    axios.get(this.props.sitesUrl, { params: queryObj })
      .then(res => {
        console.log("so fetched");
        let paginationObj = this.state.paginationObj;
        paginationObj.unnarrowedSiteCount = res.data.unnarrowedSiteCount;
        paginationObj.narrowedSiteCount = res.data.narrowedSiteCount;
        paginationObj.currentPageOfSites = res.data.sites;
        this.setState({eligibleTrustIds: res.data.trustList,
                        searchConducted: true,
                        paginationObj },
            this.determineEligibleTrusts);
      })
      .catch(console.error);
  }

    // handling state methods

  handleSearchObjChange (key, value) {
    const searchObj = this.state.searchObj;
    searchObj[key] = value;
    this.setState({ searchObj });
  }
  handleDateChange (title, key, value) {
    const searchObj = this.state.searchObj;
    searchObj[title][key] = value;
    this.setState({ searchObj }, console.log("date_from state", this.state.searchObj.date_from));

  }
  handleSiteChange(updatedSites) {
    this.setState({allSites: updatedSites});
  }
  narrowSiteList(id) {
    let paginationObj = this.state.paginationObj;
    paginationObj.currentPage = 1;
    this.setState({paginationObj, narrowedTrustId: id}, this.fetchSites);
  }

  // handling new fetch methods

  handlePaginate (currentPage) {
    let paginationObj = this.state.paginationObj;
    paginationObj.currentPage = currentPage;
    this.setState({ paginationObj });
    this.fetchSites();
  }
  sortBy (criterion) {
    let paginationObj = this.state.paginationObj;
    paginationObj.currentPage = 1;

    let sortCategory = this.state.sortCategory;
    let sortDirection = this.state.sortDirection;
    sortDirection = (sortCategory === criterion) ? this.state.sortDirection * -1 : 1;
    sortCategory = criterion;
    this.setState({sortCategory, sortDirection, paginationObj}, this.fetchSites);
  }
  handleSearchSubmit () {
    this.setState({narrowedTrustId: ''});
    this.setState({page: 1});
    this.fetchSites();
  }

  // handling update/delete ajax methods

  handleSiteUpdate (id) {
    const allSites = this.state.allSites || [];
    const updatedSite = allSites.filter((site) => {return site._id === id}).pop();


    axios.put(`${this.props.sitesUrl}/${id}`, updatedSite)
      .then(res => {
        console.log("put res", res);
      })
      .catch(console.error);
  }
  handleSiteDelete (id) {

    axios.delete(`${this.props.sitesUrl}/${id}`)
      .then(res => {
        console.log("site is deleted");
        this.fetchSites();
      })
      .catch(console.error);
  }

  // helper methods

  resetSearchObject() {
    const paginationObj = this.state.paginationObj;
    paginationObj.currentPage = 1;

    this.setState({
            searchConducted: false,
            narrowedTrustId: '',
            searchObj: {name: '',
                        city: '',
                        state: '',
                        country: '',
                        },
            paginationObj },
            this.fetchSites);
  }

  createQueryObj() {
    const fetchData = {};

    if (this.state.searchObj.page && this.state.searchObj.page.length !== 0) fetchData.page = this.state.page;
    if (this.state.searchObj.keyword && this.state.searchObj.keyword.length !== 0) fetchData.keyword = this.state.searchObj.keyword;
    if (this.state.searchObj.name && this.state.searchObj.name.length !== 0) fetchData.name = this.state.searchObj.name;
    if (this.state.searchObj.city && this.state.searchObj.city.length !== 0) fetchData.city = this.state.searchObj.city;
    if (this.state.searchObj.state && this.state.searchObj.state.length !== 0) fetchData.state = this.state.searchObj.state;
    if (this.state.searchObj.country && this.state.searchObj.country.length !== 0) fetchData.country = this.state.searchObj.country;
    if (this.state.paginationObj.currentPage && this.state.paginationObj.currentPage.length !== 0) fetchData.currentPage = this.state.paginationObj.currentPage;
    if (this.state.sortCategory && this.state.sortCategory !== 0) fetchData.sortCategory = this.state.sortCategory;
    if (this.state.sortDirection && this.state.sortDirection !== 0) fetchData.sortDirection = this.state.sortDirection;
    if (this.state.narrowedTrustId && this.state.narrowedTrustId.length !== 0) fetchData.trust_id = this.state.narrowedTrustId;

    fetchData.pageSize = this.state.paginationObj.pageSize;

    return fetchData;
  }

  determineEligibleTrusts() {
    let eligibleTrusts = [];

    eligibleTrusts = this.state.allTrusts.filter(trust => {
        return this.state.eligibleTrustIds.indexOf(trust._id) !== -1;
      });

    this.setState({ eligibleTrusts });

  }

  // render

    render () {
      return  <div className="contains">
                <div className="containsSearchAndTrusts">
                  <SearchPanel
                    searchObj={this.state.searchObj}
                    handleSearchObjChange={this.handleSearchObjChange}
                    handleDateChange={this.handleDateChange}
                    handleSearchSubmit={this.handleSearchSubmit}
                    resetSearchObject={this.resetSearchObject}
                  />
                  <TrustPanel
                    searchConducted={this.state.searchConducted}
                    eligibleTrusts={this.state.eligibleTrusts}
                    allTrusts={this.state.allTrusts}
                    narrowSiteList={this.narrowSiteList}
                    searchConducted={this.state.searchConducted}
                  />
                </div>
                <div className={this.state.searchConducted ? '' : 'invisible'}>
                  <SitesPanel
                    currentPageOfSites={this.state.paginationObj.currentPageOfSites}
                    narrowedSiteCount={this.state.paginationObj.narrowedSiteCount}
                    unnarrowedSiteCount={this.state.paginationObj.unnarrowedSiteCount}
                    narrowedTrustId={this.state.narrowedTrustId}
                    currentPage={this.state.paginationObj.currentPage}
                    pageSize={this.state.paginationObj.pageSize}
                    allTrusts={this.state.allTrusts}
                    searchConducted={this.state.searchConducted}
                    sortBy={this.sortBy}
                    handleSiteChange={this.handleSiteChange}
                    handleSiteUpdate={this.handleSiteUpdate}
                    handleSiteDelete={this.handleSiteDelete}
                    onChangePage={this.handlePaginate}
                  />
              </div>
            </div>
  }
}

export default Search;



