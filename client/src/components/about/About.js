import React, { Component } from 'react';
import '../../stylesheets/about.css';

class About extends Component {
  render() {
    return (
      <div className="contains">

      <section id="aboutDescription">
        <p>When a company is unable to pay its liabilities related to asbestos
        exposure, it may often end up filing for Chapter 11 bankruptcy protection.
        In such cases, courts have determined that companies must establish trust
        funds that have enough money to pay compensation to victims of
        asbestos-related diseases, such as mesothelioma.</p>

        <p>Bankruptcy trusts established under section 524(g) are set up to
        pay mesothelioma claims quickly with as little overhead cost as
        possible.</p>

        <p>To file a claim with a trust, generally you have to prove that
        you or your loved one was exposed at a particular worksite or that
        exposure resulted from a particular product. Most trusts use the same
        (or very similar) criteria to meet the
        minimum level of eligibility.</p>

        <p>This database was created to help plaintiffs identify the trusts
        for which they may be eligible.</p>
      </section>

      </div>

      );
  }
}

export default About;




