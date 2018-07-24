import React, { Component } from 'react';
import Loading from 'react-loading-components';
import '../../stylesheets/trustPanel.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class TrustPanel extends Component {
	constructor (props) {
		super(props);
    this.state = { copied: false };
    this.handleCopy = this.handleCopy.bind(this);
    this.parseList = this.parseList.bind(this);
    this.selectSpecificSites = this.selectSpecificSites.bind(this);
	}

  selectSpecificSites (id) {
    this.props.narrowSiteList(id);
  }

  handleCopy(e) {
    this.setState({copied: true});
  }

  parseList(trusts) {
    let trustList = trusts.map(trust => {
      return trust.name
    }).join('\n');
    return trustList;
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

  renderLists() {
    let eligibleTrustList = [];
    let ineligibleTrustList = [];
    let eligibleTrusts = this.props.eligibleTrusts || [];
    let ineligibleTrusts = this.determineIneligibleTrusts();
    eligibleTrusts = eligibleTrusts.sort(this.compare);
    ineligibleTrusts = ineligibleTrusts.sort(this.compare);

    if (eligibleTrusts.length !== 0) {
      eligibleTrustList = eligibleTrusts.map((trust) => {
                 return (<li
                            className="eligibleTrust"
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

    if (eligibleTrustList.length <= 0) {
      eligibleTrustList.push(<span key="emptyEligibleTrustList">None.</span>)
    }

    if (ineligibleTrustList.length <= 0) {
     ineligibleTrustList.push(<span key="emptyinEligibleTrustList">None.</span>)
    }

    return { eligibleTrustList, ineligibleTrustList };
  }


  render () {

    const { eligibleTrustList, ineligibleTrustList } = this.renderLists();
    let eligibleTrusts = this.props.eligibleTrusts || [];

    return (
      <section className="trusts">

        <div id="trustHeader">
           <h2>Trusts</h2>
           { (eligibleTrustList && eligibleTrustList.length > 0)
            ?  <CopyToClipboard onCopy={this.handleCopy} text={this.parseList(eligibleTrusts)}>
                  <h2 id="copy-button">{this.state.copied ? 'Copied to clipboard' : 'Copy eligible trusts'}</h2>
                </CopyToClipboard>
            : null
          }
        </div>

        <div>
        <h3 className="eligibleTrusts" onClick={() => this.selectSpecificSites(null)}>Eligible Trusts</h3>
        { this.props.searchConducted
          ? <ul id="eligibleTrustsToCopy">
              {eligibleTrustList}
            </ul>
          :<div id="loadingDiv"><Loading type='tail_spin' width={100} height={100} fill='#f44242' /></div>
        }
        </div>

        <div>
        <h3 className="ineligibleTrusts">Ineligible Trusts</h3>
        { this.props.searchConducted
          ? <ul id="eligibleTrustsToCopy">
              {ineligibleTrustList}
            </ul>
          :<div id="loadingDiv"><Loading type='tail_spin' width={100} height={100} fill='#f44242' /></div>
        }
        </div>

      </section>
    );
  }
}

export default TrustPanel;
