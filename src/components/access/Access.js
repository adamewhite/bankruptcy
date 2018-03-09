import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { firebase } from '../../firebase';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import App from '../App';

import * as routes from '../../constants/routes';

class Access extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (<Router>
              <div>

                <Route
                  exact path={routes.LANDING}
                  component={() => <LandingPage />}
                />
                <Route
                  exact path={routes.SIGN_UP}
                  component={() => <SignUpPage />}
                />
                <Route
                  exact path={routes.SIGN_IN}
                  component={() => <SignInPage />}
                />
                <Route
                  exact path={routes.PASSWORD_FORGET}
                  component={() => <PasswordForgetPage />}
                />
                <Route exact path={routes.HOME} render={() => (
                          this.state.authUser
                              ? <App
                                  trustsUrl='http://localhost:3001/api/trusts'
                                  sitesUrl='http://localhost:3001/api/sites'
                                />
                              : <Redirect to={{
                                  pathname: '/'
                                }} />
                          )}
                />
              </div>
            </Router>)
  }
}

export default Access;
