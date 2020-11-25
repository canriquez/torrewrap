import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/YourAccount.module.css'
import { ThemeProvider } from '@material-ui/core/styles';
import BootstrapButton from '../components/BootstrapButton'




const YourAccount = ({
    userTorre,
}) => {


  return (
        <div className={styles.yourAccount}>
            <div className={styles.header}>Your account</div>
            <div className={styles.profileWindow}>
                <div className={styles.profileWrap}>
                    <div className={styles.headingRow}>Your picture</div>
                    <div className={styles.userPicture}>
                        <img src={userTorre.picture_thumbnail} alt="userThumbnail"/>
                    </div>
                    <div className={styles.dataRow}>
                        <div className={styles.itemName}>Your full name*</div>
                        <p>{userTorre.user_name}</p>
                    </div>
                    <div className={styles.dataRow}>
                        <div className={styles.itemName}>Your username*</div>
                        <p>{userTorre.public_id}</p>
                    </div>
                    <div className={styles.dataRow}>
                        <div className={styles.itemName}>Your professional headline*</div>
                        <p>{userTorre.torre_data.professionalHeadline}</p>
                    </div>
                    <div className={styles.dataRow}>
                        <div className={styles.itemName}>Your Country*</div>
                        <p>{userTorre.torre_data.location.country}</p>
                    </div>
                    <div className={styles.dataRow}>
                        <div className={styles.itemName}>Your bio summary*</div>
                        <p>{userTorre.torre_data.summaryOfBio}</p>
                    </div>
                    <div className={styles.buttonWrap}>
                        <BootstrapButton href="#contained-buttons"className={styles.editButton} component={RouterLink} to="/">
                            SIGN IN
                        </BootstrapButton>
                    </div>

                </div>
            </div>      
        </div>
  );
};

const mapStateToProps = state => ({
    userTorre: state.userTorre,
  });


export default connect(mapStateToProps, null)(YourAccount);