import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu  from '../components/NavMenu'
import styles from '../styles/SignIn.module.css'


const SignIn = () => {
  return (
    <div className={styles.signIn}>
    SIGN IN COMPONENT
    </div>
  );
};

// export default App;
export default connect(null, null)(SignIn);