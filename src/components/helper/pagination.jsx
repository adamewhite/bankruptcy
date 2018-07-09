import React, { Component } from 'react';
import '../../stylesheets/pagination.css'; 


const Arrow = require('../../assets/images/arrow.svg');

class Pagination extends Component {
  createNumberedLinks() {
      const currentPage = this.props.currentPage;
      const totalSiteCount = this.props.narrowedSiteCount;
      const pageSize = this.props.pageSize;
      const totalPages = Math.ceil(totalSiteCount / pageSize);
      let startPage, endPage;
      let paginationLinks = [];

      if (totalPages <= 10) {
         // less than 10 total pages so show all
         startPage = 1;
         endPage = totalPages;
     } else {
         // more than 10 total pages so calculate start and end pages
          if (currentPage <= 6) {
             startPage = 1;
             endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
             startPage = totalPages - 9;
             endPage = totalPages;
          } else {
             startPage = currentPage - 5;
             endPage = currentPage + 4;
          }
      }

      for (let i = startPage; i <= endPage; i++) {
          paginationLinks.push(<li key={i} className={this.props.currentPage === i ? 'disabled' : ''}>
                  <a onClick={() => this.setPage(i)}>{i}</a>
              </li>)
      }

      return paginationLinks;
  }

  setPage(page) {
    this.props.onChangePage(page);
  }

  render() {

    if (!this.props.narrowedSiteCount || this.props.narrowedSiteCount <= 10) {
     return null;
    }

    return (
      <ul id="pagination">

       <li className={this.props.currentPage === 1 ? 'disabled' : ''}>
        <a onClick={() => this.setPage(1)}>
          <i className="fa fa-arrow-left"></i>
          <i className="fa fa-arrow-left"></i>
        </a>
       </li>

       <li className={this.props.currentPage === 1 ? 'disabled' : ''}>
        <a onClick={() => this.setPage(this.props.currentPage - 1)}>
          <i className="fa fa-arrow-left"></i>
        </a>
       </li>

       {this.createNumberedLinks()}

       <li className={this.props.currentPage === Math.ceil(this.props.narrowedSiteCount / this.props.pageSize) ? 'disabled' : ''}>
        <a onClick={() => this.setPage(this.props.currentPage + 1)}>
          <i className="fa fa-arrow-right"></i>
        </a>
       </li>

       <li className={this.props.currentPage === Math.ceil(this.props.narrowedSiteCount / this.props.pageSize) ? 'disabled' : ''}>
        <a onClick={() => this.setPage(Math.ceil(this.props.narrowedSiteCount / this.props.pageSize))}>
          <i className="fa fa-arrow-right"></i>
          <i className="fa fa-arrow-right"></i>
        </a>
       </li>

    </ul>
   );
  }
}


export default Pagination;


{/*<li className={this.props.currentPage === 1 ? 'disabled' : ''}>
 <a onClick={() => this.setPage(1)}>
   <i className="fa fa-arrow-left"></i>
   <i className="fa fa-arrow-left"></i>
 </a>
</li>

<li className={this.props.currentPage === 1 ? 'disabled' : ''}>
 <a onClick={() => this.setPage(this.props.currentPage - 1)}>
   <i className="fa fa-arrow-left"></i>
 </a>
</li>

{this.createNumberedLinks()}

<li className={this.props.currentPage === Math.ceil(this.props.narrowedSiteCount / this.props.pageSize) ? 'disabled' : ''}>
 <a onClick={() => this.setPage(this.props.currentPage + 1)}>
   <i className="fa fa-arrow-right"></i>
 </a>
</li>

<li className={this.props.currentPage === Math.ceil(this.props.narrowedSiteCount / this.props.pageSize) ? 'disabled' : ''}>
 <a onClick={() => this.setPage(Math.ceil(this.props.narrowedSiteCount / this.props.pageSize))}>
   <i className="fa fa-arrow-right"></i>
   <i className="fa fa-arrow-right"></i>
 </a>
</li>*/}