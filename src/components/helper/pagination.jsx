import React, { Component } from 'react';

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
        // if (this.props.currentPage < Math.ceil(this.props.totalSiteCount / this.props.pageSize)) {
            this.props.onChangePage(page);
        // }
        // return;
    }

    render() {

        if (!this.props.narrowedSiteCount || this.props.narrowedSiteCount <= 10) {
            return null;
        }

        // console.log("props", this.props);

        return (
            <ul className="pagination">

                <li className={this.props.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}><i className="fa fa-arrow-left"></i><i className="fa fa-arrow-left"></i></a>
                </li>

                <li className={this.props.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(this.props.currentPage - 1)}><i className="fa fa-arrow-left"></i></a>
                </li>

                {this.createNumberedLinks()}

                <li className={this.props.currentPage === Math.ceil(this.props.narrowedSiteCount / this.props.pageSize) ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(this.props.currentPage + 1)}><i className="fa fa-arrow-right"></i></a>
                </li>

                <li className={this.props.currentPage === Math.ceil(this.props.narrowedSiteCount / this.props.pageSize) ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(Math.ceil(this.props.narrowedSiteCount / this.props.pageSize))}><i className="fa fa-arrow-right"></i><i className="fa fa-arrow-right"></i></a>
                </li>

            </ul>
        );
    }
}

/*
<li className={pager.currentPage === 1 ? 'disabled' : ''}>
    <a onClick={() => this.setPage(1)}>First</a>
</li>
<li className={pager.currentPage === 1 ? 'disabled' : ''}>
    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
</li>

{pager.pages.map((page, index) =>
    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
        <a onClick={() => this.setPage(page)}>{page}</a>
    </li>
)}

<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
</li>
<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
</li>
*/


export default Pagination;
