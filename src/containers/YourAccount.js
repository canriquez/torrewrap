import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../styles/YourAccount.module.css';
import BootstrapButton from '../components/BootstrapButton';
import Webcam from 'react-webcam'
import { pushProfileAsset } from '../actions/index'

const YourAccount = ({
  userTorre,
  storeProfilePicture,
}) => {

  const videoConstraints = {
    width: 768,
    height: 768,
    facingMode: "user"
  };

  const webcamRef = React.useRef(null);
   
  const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log({imageSrc});
        storeProfilePicture({
          user:userTorre.user_id, 
          auth:userTorre.user_id,
          asset_type: 'image',
          payload: imageSrc 
        })
      },
      [webcamRef]
    );
  
  return (
  <div className={styles.yourAccount}>
    <div className={styles.header}>Your account</div>
    <div className={styles.profileWindow}>
      <div className={styles.profileWrap}>
        <div className={styles.headingRow}>Your picture</div>
        <div className={styles.userPicture}>
          <img src={userTorre.picture_thumbnail} alt="userThumbnail" />
        </div>

        <div className={styles.webcamWrap}>
          <Webcam className={styles.webcam}
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
          <button onClick={capture}>Capture photo</button>
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
          <BootstrapButton href="#contained-buttons" className={styles.editButton} component={RouterLink} to="/">
            EDIT
          </BootstrapButton>
        </div>

      </div>
    </div>
  </div>
);
}
const mapStateToProps = state => ({
  userTorre: state.userTorre,
});

const mapDispatchToProps = dispach => ({
  storeProfilePicture: imgObj => {
    dispach(pushProfileAsset(imgObj));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(YourAccount);
