import React, { Component } from 'react';
import '../../stylesheets/access.css';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';


class LandingPage extends Component {
  render() {
    return (
      <div className="contains">

        <div id="sectionContainer">

          <section id="signin">
            <SignInPage updateAuthUser={this.props.updateAuthUser} />
          </section>

          <section id="signup">
            <SignUpPage updateAuthUser={this.props.updateAuthUser} />
          </section>


        </div>

      </div>

      );
  }
}

export default LandingPage;




