import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import SignIn from './SignIn.js';
import YourAccount from './YourAccount';
import styles from '../styles/App.module.css';
import VideoProfile from './VideoProfile';
import EditProfileVideo from '../components/EditProfileVideo'
import WebCamStreamCapture from '../components/WebCamStreamCapture';
import EditVideoProfile from './EditVideoProfile';
import YourGenome from '../containers/YourGenome'


const App = ({
  userTorre,
}) => (
  <div className={styles.panel}>
    <Router>
      <NavMenu />
      <Switch>
        <Route exact path="/">
          {userTorre.signedIn
            ? <YourAccount />
            : ''}
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/genome">
          <YourGenome />
        </Route>
        <Route path={'/*'} render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </div>
);

const mapStateToProps = state => ({
  userTorre: state.userTorre,
});

// export default App;
export default connect(mapStateToProps, null)(App);
