import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../styles/YourAccount.module.css';
import BootstrapButton from '../components/BootstrapButton';
import { pushProfileAsset } from '../actions/index';
import EditActionButton from '../components/EditActionButton';
import EditProfilePicture from '../components/EditProfilePicture';
import EditProfileVideo from '../components/EditProfileVideo';

const YourAccount = ({
  userTorre,
  storeProfilePicture,
}) => {
  const [editingPicture, setEditingPicture] = useState(false);

  const handleOpenEdit = () => {
    console.log('trying to open modal');
    setEditingPicture(true);
  };
  const handleCloseEdit = () => {
    console.log('closing modal');
    setEditingPicture(false);
  };

  return (
    <div className={styles.yourAccount}>
      <div className={styles.header}>Your account</div>
      <div className={styles.profileWindow}>
        <div className={styles.profileWrap}>
          <div className={styles.headingRow}>Your picture</div>
          <div className={styles.profilePicture}>
            <div className={styles.userPicture}>
              <img src={userTorre.picture_thumbnail} alt="userThumbnail" />
            </div>
            <div className={styles.editProfile}>
              <EditActionButton handleOpenEdit={handleOpenEdit} />
            </div>
          </div>

          {/* <EditProfileVideo handleVideoCloseEdit={handleCloseEdit} editingVideo={editingPicture}/> */}
          <EditProfilePicture handleCloseEdit={handleCloseEdit} editingPicture={editingPicture} />

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
            <BootstrapButton href="#contained-buttons" className={styles.editButton} component={RouterLink} to="/">
              EDIT
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

const mapDispatchToProps = dispach => ({
  storeProfilePicture: imgObj => {
    dispach(pushProfileAsset(imgObj));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(YourAccount);
