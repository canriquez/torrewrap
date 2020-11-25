import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu  from '../components/NavMenu'
import styles from '../styles/SignIn.module.css'
import Button from '@material-ui/core/Button';


const SignIn = () => {

    const [torreUser, setTorreUser] = React.useState('')


    const handleInputTorreUserChange = event => {
        setTorreUser(event.target.value);
      };

    return (
        <div className={styles.signIn}>

            <label htmlFor="torreUser">Your Torre's account username</label>
                <div className={styles.torreUserInputWrap}>
                <input
                    className="torreUser"
                    type="text"
                    onChange={handleInputTorreUserChange}
                    value={torreUser}
                    id="torreUser"
                    autoComplete="Type your torre's account username"
                />
                </div>
                <Button href="#contained-buttons"className={styles.signInButton}>
                    continue
                </Button>

        </div>

    );
};

// export default App;
export default connect(null, null)(SignIn);