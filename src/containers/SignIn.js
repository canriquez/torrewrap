import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu  from '../components/NavMenu'
import styles from '../styles/SignIn.module.css'
import Button from '@material-ui/core/Button';
import { validatesTorreUserApi } from '../actions/index'


const SignIn = ({
    validatesTorreUser,
    userTorre
}) => {

    const [torreUser, setTorreUser] = React.useState('')


    const handleInputTorreUserChange = event => {
        setTorreUser(event.target.value);
      };



    const handleTorreUserCheck =()=>{
        validatesTorreUser(torreUser)
    }

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
                <Button onClick={handleTorreUserCheck} href="#contained-buttons" className={styles.signInButton}>
                    continue
                </Button>

        </div>

    );
};

const mapStateToProps = state => ({
    userTorre: state.userTorre,
  });

const mapDispatchToProps = dispach => ({
    validatesTorreUser: (user) => {
      dispach(validatesTorreUserApi(user))
    },
  });

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);