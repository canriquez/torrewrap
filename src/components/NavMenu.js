import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/NavMenu.module.css'
import { updateTorreUserDetails } from '../actions/index'
import {USER_RECORD } from '../helpers/help';
import YourAccount from '../containers/YourAccount'


const NavMenu = ({
    userTorre,
    updateUserTorreData
}) => {

    useEffect(()=>{
        
        if (window.localStorage.hasOwnProperty(USER_RECORD) ) {
            console.log('YES, WE ARE LOGGED IN')
            const user_data = JSON.parse(window.localStorage.getItem(USER_RECORD));
            user_data.torre_data = JSON.parse(user_data.torre_data)
            console.log({user_data})
            updateUserTorreData({
                signedIn: true,
                ...user_data
            })
        }
    }, [userTorre.signedIn, updateUserTorreData])

    const logOff = ()=>{
        if (window.localStorage.getItem(USER_RECORD))
            window.localStorage.removeItem(USER_RECORD);
        updateUserTorreData({
                signedIn: false
            })
    };

  return (
        <div className={styles.navMenuContainer}>
            <div className={styles.menuLeft}>
                <MenuIcon fontSize="medium" className={styles.menuIcon}/>
                <div className={styles.brand}>torreWrap</div>
            </div>
            
            <div className={styles.menuRight}>
                <div className={styles.menuBox}>
                    <SearchIcon fontSize="medium" className={styles.menuIcon}/>
                    <p>Search</p>
                </div>
                <div className={styles.menuBox}>
                    <PersonIcon fontSize="medium" className={styles.menuIcon}/>
                    <p>Your genome</p>
                </div>
                    {userTorre.signedIn ? 
                    <div onClick={logOff} className={styles.exagonPicture}>
                        <div className={styles.exagonBorder}></div>
                        <img src={userTorre.picture_thumbnail} className={styles.userPicture} alt="Avatar"/>
                    </div>
                    :
                    <Button href="#contained-buttons"className={styles.signInButton} component={RouterLink} to="/signin">
                        SIGN IN
                    </Button>
                    }
            </div>

        </div>
  );
};

const mapStateToProps = state => ({
    userTorre: state.userTorre,
  });

const mapDispatchToProps = dispach => ({
    updateUserTorreData: (data) => {
        dispach(updateTorreUserDetails(data))
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);