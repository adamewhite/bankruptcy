import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { auth } from '../../firebase';

import * as routes from '../../constants/routes';

class SignUpPage extends Component {
  render() {
    return (<SignUpForm history={this.props.history} updateAuthUser={this.props.updateAuthUser} />)
  }
 }


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    let node = document.getElementsByName(`${e.target.name}`)[0];
    let targetedLabel = document.getElementById(`${e.target.name}SignUpLabel`);

    if (node.value !== '') {
      targetedLabel.style.opacity = 1;
    } else {
      targetedLabel.style.opacity = 0;
    }

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      username,
      email,
      passwordOne
    } = this.state;

    const {
      history
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.updateAuthUser(authUser);
        history.push('/search');
      })
      .catch(error => {
        this.setState({error: error});
      });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
        <li>
          <span>Need to create an account?</span>
        </li>
        <li>
          <label htmlFor="username" id="usernameSignUpLabel">Full Name</label>
          <input
            value={username}
            onChange={this.handleChange}
            type="text"
            name="username"
            placeholder="Enter Your Full Name"
          />
          </li>
          <li>
          <label htmlFor="email" id="emailSignUpLabel">Email Address</label>
          <input
            value={email}
            onChange={this.handleChange}
            type="text"
            name="email"
            placeholder="Enter Your Email Address"
          />
          </li>
          <li>
          <label htmlFor="passwordOne" id="passwordOneSignUpLabel">Password</label>
          <input
            value={passwordOne}
            onChange={this.handleChange}
            type="password"
            name="passwordOne"
            placeholder="Enter Your Password"
          />
          </li>
          <li>
          <label htmlFor="passwordTwo" id="passwordTwoSignUpLabel">Confirm Password</label>
          <input
            value={passwordTwo}
            onChange={this.handleChange}
            type="password"
            name="passwordTwo"
            placeholder="Confirm Your Password"
          />
          </li>
          <li className="errorsAndButton">
            <div>{ error && <p className="error">{error.message}</p> }</div>
            <button disabled={isInvalid} type="submit">
              Sign Up
            </button>
          </li>
        </ul>
      </form>
    );
  }
}

export default withRouter(SignUpPage);

export {
  SignUpForm
};
