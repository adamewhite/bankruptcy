import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../../constants/routes';

class Navigation extends Component {
  render() {
    return (<div>
              { this.props.authUser
                  ? <NavigationAuth />
                  : <NavigationNonAuth />
              }
            </div>)
  }
}

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    <li><h1>Not authorized.</h1></li>
  </ul>

export default Navigation;
