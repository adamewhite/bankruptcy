import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

// import { SignUpLink } from './SignUp';
// import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

class SignInPage extends Component {
  render() {
    return (<div>
              <SignInForm history={this.props.history} updateAuthUser={this.props.updateAuthUser} />
            </div>
          )
  }
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    let node = document.getElementsByName(`${e.target.name}`)[0];
    let targetedLabel = document.getElementById(`${e.target.name}Label`);

    if (node.value !== '') {
      targetedLabel.style.opacity = 1;
    } else {
      targetedLabel.style.opacity = 0;
    }

    if (e.target.name === "signInEmail") this.setState({ email: e.target.value });
    if (e.target.name === "signInPassword") this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const {
      history
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.updateAuthUser(authUser);
        history.push(routes.SEARCH);
      })
      .catch(error => {
        this.setState({ error: error });
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
      <form onSubmit={this.handleSubmit}>
        <ul>
          <li>
            <span>Have an account?</span>
          </li>
          <li>
            <label htmlFor="email" id="signInEmailLabel">Email Address</label>
            <input
              value={email}
              onChange={this.handleChange}
              type="text"
              name="signInEmail"
              placeholder="Enter Your Email Address"
            />
          </li>
          <li>
            <label htmlFor="password" id="signInPasswordLabel">Password</label>
            <input
              value={password}
              onChange={this.handleChange}
              type="password"
              name="signInPassword"
              placeholder="Enter Your Password"
            />
          </li>
          <li className="errorsAndButton">
            <div>{ error && <p className="error">{error.message}</p> }</div>
            <button disabled={isInvalid} id="tester" type="submit">
              Sign In
            </button>
          </li>
          <li>
            <NavLink to="/pw-forget">Forgot Your Password?</NavLink>
          </li>
        </ul>
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm
};
