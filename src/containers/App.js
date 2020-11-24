import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  return (
    <div className="panel">
      <Router>
        <div className="panel-bg">
        </div>
        <Switch>
          <Route exact path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

// export default App;
export default connect(null, null)(App);