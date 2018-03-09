import React from 'react';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    // this.state = { authUser: null };
  }

  // componentDidMount() {
  //   firebase.auth.onAuthStateChanged(authUser => {
  //     authUser
  //       ? this.setState(() => ({ authUser }))
  //       : this.setState(() => ({ authUser: null }));

  //     if (!authUser) {
  //       this.props.history.push(routes.SIGN_IN);
  //     }
  //   });
  // }

  render() {
    return <h1>Everything's copasetic</h1>;
  }
}

export default HomePage;
