import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/NavMenu.module.css';
import { updateTorreUserDetails, refreshProfile } from '../actions/index';
import { USER_RECORD } from '../helpers/help';

const NavMenu = ({
  userTorre,
  updateUserTorreData,
  refreshTorreData
}) => {
  const {video_url,picture_thumbnail} = userTorre
  useEffect(() => {
    if (window.localStorage.hasOwnProperty(USER_RECORD)) {
      console.log('YES, WE ARE LOGGED IN');
      const user_data = JSON.parse(window.localStorage.getItem(USER_RECORD));
      user_data.torre_data = JSON.parse(user_data.torre_data);
      console.log({ user_data });
      updateUserTorreData({
        signedIn: true,
        ...user_data,
      });
    }
  }, [userTorre.signedIn, updateUserTorreData]);

  const logOff = () => {
    if (window.localStorage.getItem(USER_RECORD)) window.localStorage.removeItem(USER_RECORD);
    updateUserTorreData({
      signedIn: false,
      inWrapDB: false,
      torre_data: {},
      user_id: null,
      user_name: '',
      picture_thumbnail: '',
      draft_thumbnail: undefined,
      public_id: '',
      valid: false,
      cloud_url: undefined,
      draft_video: undefined,
      savedProfileVideo: false,
      video_url: undefined
    });
  };

  return (
    <div className={styles.navMenuContainer}>
      <div className={styles.menuLeft}>
        <MenuIcon fontSize="medium" className={styles.menuIcon} />
        <div className={styles.brand}>torreWrap</div>
      </div>

      <div className={styles.menuRight}>
        <div className={styles.menuBox}>
          <SearchIcon fontSize="medium" className={styles.menuIcon} />
          <p>Search</p>
        </div>
        <RouterLink to={'/genome'} >
          <div className={styles.menuBox}>
            <PersonIcon fontSize="medium" className={styles.menuIcon} />
            <p>Your genome</p>
          </div>
        </RouterLink>
        {userTorre.signedIn
          ? (
            <div onClick={logOff} className={styles.exagonPicture}>
              <div className={styles.exagonBorder} />
              <img src={userTorre.picture_thumbnail} className={styles.userPicture} alt="Avatar" />
            </div>
          )
          : (
            <Button href="#contained-buttons" className={styles.signInButton} component={RouterLink} to="/signin">
              SIGN IN
            </Button>
          )}
      </div>

    </div>
  );
};

const mapStateToProps = state => ({
  userTorre: state.userTorre,
});

const mapDispatchToProps = dispach => ({
  updateUserTorreData: data => {
    dispach(updateTorreUserDetails(data));
  },
  refreshTorreData: refreshObject => {
    dispach(refreshProfile(refreshObject))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
