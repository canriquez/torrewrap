import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/NavMenu.module.css'


const NavMenu = () => {
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
                    <Button href="#contained-buttons"className={styles.signInButton} component={RouterLink} to="/signin">
                        SIGN IN
                    </Button>

            </div>

        </div>
  );
};

export default NavMenu;