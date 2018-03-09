import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = () => (Component) => {

  class WithAuthorization extends React.Component {

    constructor(props) {
      super(props);
      this.state = { authUser: null };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));

        if (!authUser) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.state.authUser ? <Component /> : null;
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
