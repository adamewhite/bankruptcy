import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/contact.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
  default_height: 20,
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const node = document.getElementsByName(`${e.target.name}`)[0];
    const targetedLabel = document.getElementById(`${e.target.name}Contact`);

    if (node.value !== '') {
      targetedLabel.style.opacity = 1;
    } else {
      targetedLabel.style.opacity = 0;
    }

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div className="contains">
        <div id="contactContainer">
          <form>
            <ul>
              <li>
                <span>Have any questions or comments?</span>
              </li>
              <li>
                <label htmlFor="name" id="nameContact">Full Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  name="name"
                  className="contact_name"
                  onChange={this.handleChange}
                  placeholder="Enter Your Full Name"
                />
              </li>
              <li>
                <label htmlFor="email" id="emailContact">Email Address</label>
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
                <label htmlFor="subject" id="subjectContact">Subject</label>
                <input
                  type="text"
                  value={this.state.subject}
                  name="subject"
                  className="contact_subject"
                  onChange={this.handleChange}
                  placeholder="Enter Your Subject"
                />
              </li>
              <li>
                <label htmlFor="message" id="messageContact">Message</label>
                <input
                  type="textarea"
                  value={this.state.message}
                  name="message"
                  className="contact_message"
                  onChange={this.handleChange}
                  placeholder="Enter Your Message"
                />
              </li>
              <li>
                <button
                  type="submit"
                  onSubmit={this.handleSubmit}>
                    Submit
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>

    );
  }
}

export default Contact;
