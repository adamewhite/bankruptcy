import React, { Component } from 'react';
import '../../stylesheets/trustPanel.css';

class TrustPanel extends Component {
	constructor (props) {
		super(props);
    this.state = {focused: false};
    this.selectSpecificSites = this.selectSpecificSites.bind(this);
	}

  selectSpecificSites (id) {
    // console.log("passed id", id);
    this.props.narrowSiteList(id);
  }

  determineIneligibleTrusts() {
    let eligibleTrusts = this.props.eligibleTrusts || [];
    let allTrusts = this.props.allTrusts || [];
    let ineligibleTrusts = [];


    if (eligibleTrusts.length === 0) {
      ineligibleTrusts = allTrusts;
      return ineligibleTrusts;
    }

    if (eligibleTrusts.length !== 0) {

      ineligibleTrusts = allTrusts.filter(trust => {
        return eligibleTrusts.map(trust => trust._id).indexOf(trust._id) === -1;
      });

      return ineligibleTrusts;
    }
  }

  compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  render () {

    let eligibleTrustList = [];
    let ineligibleTrustList = [];
    let eligibleTrusts = this.props.eligibleTrusts || [];
    let ineligibleTrusts = this.determineIneligibleTrusts();
    eligibleTrusts = eligibleTrusts.sort(this.compare);
    ineligibleTrusts = ineligibleTrusts.sort(this.compare);

    // console.log("eligibleTrusts", eligibleTrusts);

    if (eligibleTrusts.length !== 0) {
      eligibleTrustList = eligibleTrusts.map((trust) => {
                 return (<li
                           key={trust._id}
                           value={trust._id}
                           onClick={() => this.selectSpecificSites(trust._id)}
                         >
                           {trust.name}
                         </li>)
                });
  }

    if (ineligibleTrusts.length !== 0) {
      ineligibleTrustList = ineligibleTrusts.map((trust) => {
                 return (<li
                           key={trust._id}
                           value={trust._id}
                         >
                           {trust.name}
                         </li>)
                });
    }


    // if (this.props.allTrusts && this.props.allTrusts.length !== 0) {
    //   trustList = this.props.allTrusts.map((trust) => {
    // 	         return (<li
    //                      key={trust._id}
    //                      value={trust._id}
    //                      onClick={this.selectSpecificSites}
    //                    >
    //                      {trust.name}
    //                    </li>)})
    // } else {
    //   trustList = <li>No trusts found.</li>
    // }

    return (
      <section className="trusts">
        <h2>Trusts</h2>
          <h3 className="eligibleTrusts">Eligible Trusts</h3>
          <ul>
            {eligibleTrustList}
          </ul>
          <h3 className="eligibleTrusts">Ineligible Trusts</h3>
          <ul>
            {ineligibleTrustList}
          </ul>
      </section>
    );
  }
}

export default TrustPanel;

  // const classes = (this.props.searchConducted) ? "trusts" : "trusts invisible";
  // const eligibleTrustIds = this.props.eligibleTrusts.map((t) => t.id).sort((a,b) => a - b);
  // const ineligibleTrusts = this.props.allTrusts.filter((t) => eligibleTrustIds.indexOf(t.id) === -1);
  // const eligibleTrustList = this.props.eligibleTrusts.map((trust) => {
  //  return (<li
 //              key={trust.id}
 //              value={trust.id}
 //              onClick={this.selectSpecificSites}
 //            >
 //              {trust.name}
 //            </li>)
  // });
 //  const ineligibleTrustList = ineligibleTrusts.map((trust) => {
 //    return (<li key={trust.id} className="faded"><span>{trust.name}</span></li>)
 //  });


// <section className={classes}>
  // <h2>Trusts</h2>
  // {(eligibleTrustIds.length === 0) ? '' : <h3 className="eligibleTrusts" value="" onClick={this.selectSpecificSites}>Eligible Trusts</h3>}
  // <ul className={eligibleTrustIds.length === 0 ? 'displaynone' : ''}>
    // {eligibleTrustList}
  // </ul>
  // {(ineligibleTrusts.length === 0) ? '' : <h3>Ineligible Trusts</h3>}
  // <ul>
    // {ineligibleTrustList}
  // </ul>
// </section>
