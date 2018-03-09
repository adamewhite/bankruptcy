import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const {
      history
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("you're doing great", routes);
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        console.log("failing bigtime");
        this.setState(byPropKey('error', error));
      });
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <ul>
          <li>
            <span>Have an account?</span>
          </li>
          <li>
          <label for="email">Email Address</label>
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />

          </li>
            <li>
            <label for="password">Password</label>
            <input
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Password"
            />

          </li>
            <li>
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
          </li>
          <li>
            { error && <p>{error.message}</p> }
          </li>
          <li>
            <PasswordForgetLink />
          </li>
        </ul>
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
