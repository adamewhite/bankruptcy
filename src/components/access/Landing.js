import React, { Component } from 'react';
import '../../stylesheets/access.css';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';

class LandingPage extends Component {
  render() {
    return (
      <div id="contains">

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

      <div id="sectionContainer">
        <section id="signup">
          <SignUpPage />
        </section>

        <section id="signin">
          <SignInPage />
        </section>
      </div>

      </div>

      );
  }
}

export default LandingPage;




