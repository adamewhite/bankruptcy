import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../../stylesheets/navBar.css';

import { auth } from '../../firebase';

class Navbar extends Component {
  render() {
    return (
          <header>
            <nav>
              <div id="logo">
                <h3>Bankruptcy</h3>
                <h3>Trust</h3>
                <h3>Search</h3>
              </div>
              <div className="lists">
              <ul className="upperList">
                <li><a href="">Welcome, User!</a></li>
              </ul>
                <ul className="lowerList">
                  <li>
                    <a href="">About</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <p onClick={auth.doSignOut}>Log Out</p>
                  </li>
                </ul>
              </div>
              <ul id="redBox">
                <li>
                  <div className="cross"></div>
                </li>
                <li>
                  <a href="#">Email Results</a>
                </li>
              </ul>
            </nav>
          </header>
      );
  }
}

export default Navbar;
