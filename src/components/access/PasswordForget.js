import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import '../../stylesheets/passwordForget.css';

import { auth } from '../../firebase';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    let node = document.getElementsByName(`${e.target.name}`)[0];
    let targetedLabel = document.getElementById(`${e.target.name}Reset`);

    if (node.value !== '') {
      targetedLabel.style.opacity = 1;
    } else {
      targetedLabel.style.opacity = 0;
    }

    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  render() {
    const {
      email,
      error
    } = this.state;

    const isInvalid = email === '';

    return (
      <div className="contains">
        <div id="passwordForgetContainer">
          <form onSubmit={this.handleSubmit}>
            <ul>
            <li>
              <span>Need to reset your password?</span>
            </li>
              <li>
                <label htmlFor="email" id="emailReset">Email Address</label>
                <input
                  type="text"
                  value={this.state.email}
                  name="email"
                  className="contact_email"
                  onChange={this.handleChange}
                  placeholder="Enter Your Email Address"
                />
              </li>
              <li>
                <button
                  type="submit"
                  onSubmit={this.handleSubmit}
                  disabled={isInvalid}>
                    Submit
                </button>
              </li>
              <li>
              { error && <p>{error.message}</p> }
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordForgetForm;


