import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu  from '../components/NavMenu'
import SignIn from './SignIn.js'


const App = () => {
  return (
    <div className="panel">
      <Router>
        <NavMenu />
        <Switch>
          <Route exact path="/">
            <p>This is Root</p>
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

// export default App;
export default connect(null, null)(App);