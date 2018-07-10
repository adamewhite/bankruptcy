import React, { Component } from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import 'font-awesome/css/font-awesome.min.css';
import { firebase } from '../firebase';
import LandingPage from './access/Landing';
import PasswordForgetForm from './access/PasswordForget';
import About from './about/About';
import Contact from './contact/Contact';
import Navbar from './navigation/navbar';
import Footer from './footer/Footer';
import Search from './Search';
import '../index.css';
import * as routes from '../constants/routes';


const PageFade = (props) => 
  (<CSSTransition
    {...props}
    classNames="fadeTranslate"
    timeout={{
      enter: 2000,
      exit: 500,
    }}
    mountOnEnter={true}
    unmountOnExit={true}
  />);


const Layout = ({ children }) => (
  <section>
    {children}
  </section>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };

    this.updateAuthUser = this.updateAuthUser.bind(this);
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }))
    });
  }

  updateAuthUser(newStatus) {
    this.setState({ authUser: newStatus });
  }


  render() {
    const locationKey = this.props.location.pathname;

    return (
      <Layout>
        <TransitionGroup>
          <PageFade key={locationKey}>
            <section className="fix-container">

              <Switch location={this.props.location}>

	              <Route
	                exact path={routes.LANDING}
	                component={() => <LandingPage updateAuthUser={this.updateAuthUser}/>}
	              />

                <Route
                  exact path={routes.PASSWORD_FORGET}
                  component={() => <PasswordForgetForm />}
                />

                <Route
                  exact path={routes.ABOUT}
                  component={() => <About />}
                />

                <Route
                  exact path={routes.CONTACT}
                  component={() => <Contact />}
                />

                <Route exact path={routes.SEARCH} render={() => (
                          this.state.authUser
                              ? <Search
                                  trustsUrl="http://bankruptcy.herokuapp.com/api/trusts"
                                  sitesUrl="http://bankruptcy.herokuapp.com/api/sites"
                                />
                              : <Redirect to={{
                                  pathname: '/'
                                }} />
                          )}
                />

                <Redirect to={{pathname: '/'}} />

               </Switch>

              <Footer />

            </section>
          </PageFade>
        </TransitionGroup>
      </Layout>
    )
  }
}

export default App;
