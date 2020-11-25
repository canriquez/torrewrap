import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu  from '../components/NavMenu'
import styles from '../styles/SignIn.module.css'
import Button from '@material-ui/core/Button';
import { validatesTorreUserApi, validatesWrapUserApi, signInWrapUserApi } from '../actions/index'


const SignIn = ({
    validatesTorreUser,
    checkValidWrapUser,
    signInWrapUser,
    userTorre,
}) => {

    const [torreUser, setTorreUser] = React.useState('')
    const [torreWrapPassword, setTorreWrapPassword] = React.useState('')


    const handleInputTorreUserChange = event => {
        setTorreUser(event.target.value);
      };

    const handleInputPasswordChange = event => {
        setTorreWrapPassword(event.target.value);
      };


    const handleTorreUserCheck =()=>{
        validatesTorreUser(torreUser)
    }

    const handleSignIn =()=>{
        signInWrapUser(torreUser, torreWrapPassword)
    }

    useEffect(()=>{
        console.log("at use effect")
        console.log({userTorre})
        if (userTorre.valid && !userTorre.inWrapDB)
            console.log("about to check wrap user")
            checkValidWrapUser(torreUser) 
        
    },[userTorre.valid])

    const renderSignIn = () => {
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
        )
    }

    const renderLogIn = () => {
        return (
            <div className={styles.signIn}>

            <label htmlFor="torreWrapPassword">Enter your torre Wrap Password</label>
                <div className={styles.torreUserInputWrap}>
                <input
                    className="torreWrapPassword"
                    type="password"
                    onChange={handleInputPasswordChange}
                    value={torreWrapPassword}
                    id="torreWrapPassword"
                    autoComplete="Type your torreWrap password"
                />
                </div>
                <Button onClick={handleSignIn} href="#contained-buttons" className={styles.signInButton}>
                    continue
                </Button>

        </div>
        )
    }

    return (
        <div>
            <div>{!userTorre.valid ? renderSignIn() : <p></p>}</div>
            <div>{userTorre.inWrapDB ? renderLogIn() : <p></p>}</div>

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
    checkValidWrapUser: (user) => {
        dispach(validatesWrapUserApi(user))
    },
    signInWrapUser: (user,password) => {
        dispach(signInWrapUserApi(user,password))
    }
  });

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);