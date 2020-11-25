import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import styles from '../styles/SignIn.module.css'
import { validatesTorreUserApi, validatesWrapUserApi, signInWrapUserApi } from '../actions/index'
import BootstrapButton from '../components/BootstrapButton'


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
                <div className={styles.header}>User your Torre.co username</div>
                <div className={styles.profileWindow}>
                    
                    <div className={styles.profileWrap}>
                        <label htmlFor="torreUser">Enter your Torre's account username</label>
                        <div className={styles.torreUserInputWrap}>
                        <input
                            className={styles.torreUser}
                            type="text"
                            onChange={handleInputTorreUserChange}
                            value={torreUser}
                            id="inputuser"
                            autoComplete="Type your torre's account username"
                        />
                        </div>

                        <div className={styles.buttonWrap}>
                            <BootstrapButton onClick={handleTorreUserCheck} href="#contained-buttons" className={styles.signInButton}>
                                Continue
                            </BootstrapButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderLogIn = () => {
        return (
            <div className={styles.signIn}>
            <div className={styles.header}>You have entered a valid user...</div>
            <div className={styles.profileWindow}>
            <div className={styles.profileWrap}>
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

                    <div className={styles.buttonWrap}>
                        <BootstrapButton onClick={handleSignIn} href="#contained-buttons" className={styles.signInButton}>
                            SIGN IN
                        </BootstrapButton>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div>
            <div>{!userTorre.valid ? renderSignIn() : <p></p>}</div>
            <div>{userTorre.inWrapDB && !userTorre.signIn ? renderLogIn() : <p></p>}</div>
            {userTorre.signedIn ? <Redirect to="/" /> : ''}

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