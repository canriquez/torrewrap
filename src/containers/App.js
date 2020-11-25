import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu  from '../components/NavMenu'
import SignIn from './SignIn.js'
import YourAccount from './YourAccount';


const App = ({
  userTorre,
}) => {
  return (
    <div className="panel">
      <Router>
        <NavMenu />
        <Switch>
          <Route exact path="/">
            {userTorre.signedIn ? 
              <YourAccount />
            : ''}
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  userTorre: state.userTorre,
});

// export default App;
export default connect(mapStateToProps, null)(App);