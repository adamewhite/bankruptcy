import React, { Component } from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import '../../stylesheets/navBar.css';
import * as routes from '../../constants/routes';
import { auth } from '../../firebase';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    const {
      history
    } = this.props;

    history.push(routes.LANDING);
    auth.doSignOut();

  }

  render() {
    return (
          <header>
            <nav>
              <NavLink exact to="/" id="logo">
                <h3>Bankruptcy</h3>
                <h3>Trust</h3>
                <h3>Search</h3>
              </NavLink>

                { auth.doGetCurrentUser()
                  ? <div id="menu">
                      <div id="lists">
                        <ul id="upperList">
                          <li>
                            <span>Welcome,</span>
                            <Link to="/search">{auth.doGetCurrentUser().email}</Link>
                          </li>
                        </ul>
                        <ul id="lowerList">
                          <li>
                            <NavLink to="/about" activeClassName="active">About</NavLink>
                          </li>
                          <li>
                            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                          </li>
                        </ul>
                      </div>
                      <NavLink exact to="/" id="redBox" onClick={this.handleSignOut}>
                        <ul>
                          <li>
                            <div className="cross"></div>
                          </li>
                          <li>
                            <span>Log Out</span>
                          </li>
                       </ul>
                      </NavLink>
                    </div>
                  : <div id="menu">
                      <div id="lists">
                        <ul id="upperList">
                          <li></li>
                        </ul>
                        <ul id="lowerList">
                          <li>
                            <NavLink to="/about" activeClassName="active">About</NavLink>
                          </li>
                          <li>
                            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                          </li>
                        </ul>
                        </div>
                        <NavLink exact to="/" id="redBox">
                          <ul>
                            <li>
                              <div className="cross"></div>
                            </li>
                            <li>
                              <span>Log In /</span>
                              <span>Sign Up</span>
                            </li>
                          </ul>
                       </NavLink>
                     </div>
                    }
                </nav>
              </header>
      );
  }
}

export default Navbar;

// class Navbar extends Component {
//   render() {
//     return (<div>
//               <NavbarComponent history={this.props.history} />
//             </div>
//           )
//   }
// }

// export default withRouter(Navbar);

