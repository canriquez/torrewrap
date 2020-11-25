import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from '../styles/SignIn.module.css';
import { validatesTorreUserApi, validatesWrapUserApi, signInWrapUserApi, signUpTorreUser, updateTorreUserDetails } from '../actions/index';
import BootstrapButton from '../components/BootstrapButton';


const SignIn = ({
  validatesTorreUser,
  checkValidWrapUser,
  signInWrapUser,
  signUpUser,
  userTorre,
}) => {
  const [torreUser, setTorreUser] = React.useState('');
  const [torreWrapPassword, setTorreWrapPassword] = React.useState('');
  const [passOne, setPassOne] = React.useState('');
  const [passTwo, setPassTwo] = React.useState('');

  const handleInputTorreUserChange = event => {
    setTorreUser(event.target.value);
  };

  const handleInputPasswordChange = event => {
    setTorreWrapPassword(event.target.value);
  };

  const handlePassOneChange = event => {
    setPassOne(event.target.value);
  };

  const handlePassTwoChange = event => {
    setPassTwo(event.target.value);
  };

  const handleTorreUserCheck = () => {
    validatesTorreUser(torreUser);
  };

  const handleSignIn = () => {
    signInWrapUser(torreUser, torreWrapPassword);
  };

  const handleSignUp = () => {
    if (passOne === passTwo) {
      signUpUser(torreUser, passOne);
    }else{
      console.log('passwords do not match');
    }
  }

  const handleBack = ()=> {

  }

  useEffect(() => {
    console.log('at use effect');
    console.log({ userTorre });
    if (torreUser !='' && !userTorre.inWrapDB) {
      console.log('about to check wrap user');
      checkValidWrapUser(torreUser);
    }
  }, [userTorre.valid]);

  const renderSignIn = () => (
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
  );

  const renderSignUp = () => (
    <div className={styles.signIn}>
      <div className={styles.header}>Valid Torre.co username: {torreUser}</div>
      <div className={styles.profileWindow}>

        <div className={styles.profileWrap}>
        <form action="#">
          <label htmlFor="torreUser">Add your TorreWrap password, and Go!</label>
          <div className={styles.torreUserInputWrap}>
            <input
              className={styles.torreUser}
              type="password"
              onChange={handlePassOneChange}
              value={passOne}
              id="inputuser"
              autoComplete="Type your torreWrap Password"
            />
          </div>
          <div className={styles.torreUserInputWrap}>
            <input
              className={styles.torreUser}
              type="password"
              onChange={handlePassTwoChange}
              value={passTwo}
              id="inputuser"
              autoComplete="Type your torreWrap Password"
            />
          </div>

          <div className={styles.buttonWrap}>
            <BootstrapButton onClick={handleBack} href="#contained-buttons" className={styles.backButton}>
              Back
            </BootstrapButton>
            <BootstrapButton onClick={handleSignUp} href="#contained-buttons" className={styles.signInButton}>
              Signup
            </BootstrapButton>
          </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderLogIn = () => (
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
  );

  return (
    <div>
      <div>{!userTorre.valid ? renderSignIn() : <p />}</div>
      <div>{userTorre.inWrapDB && !userTorre.signIn ? renderLogIn() : <p />}</div>
      <div>{userTorre.createUser == torreUser && !userTorre.inWrapDB && torreUser !='' ? renderSignUp() : <p />}</div>
      {userTorre.signedIn ? <Redirect to="/" /> : ''}

    </div>

  );
};

const mapStateToProps = state => ({
  userTorre: state.userTorre,
});

const mapDispatchToProps = dispach => ({
  validatesTorreUser: user => {
    dispach(validatesTorreUserApi(user));
  },
  checkValidWrapUser: user => {
    dispach(validatesWrapUserApi(user));
  },
  signInWrapUser: (user, password) => {
    dispach(signInWrapUserApi(user, password));
  },
  signUpUser: (user, password) => {
    dispach(signUpTorreUser(user, password));
  },

});

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
