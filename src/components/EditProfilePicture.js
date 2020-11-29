import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../styles/EditProfilePicture.module.css';
import Webcam from 'react-webcam'
import { pushProfileAsset, saveProfileAsset } from '../actions/index'
import UploadImageButtons from './UploadImageButtons';
import BootstrapButton from './BootstrapButton';


const EditProfilePicture = ({
    userTorre,
    storeProfilePicture,
    saveProfilePicture,
  }) => {
    const [selectedFile, setSelectedFile] = React.useState(undefined);

    useEffect(()=>{
        if (selectedFile){
            console.log('finished uploading file');
            console.log(selectedFile)
            storeProfilePicture({
                user:userTorre.user_id, 
                auth:userTorre.user_id,
                asset_type: 'image',
                payload: selectedFile, 
              })
        }
    },[selectedFile])

    const handleUploadClick = (e)=>{
        console.log("about to handle file upload")
        const file = e.target.files[0]
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);

        reader.onloadend = (ev)=>{
            setSelectedFile(reader.result)
        }
    }

    const saveNewPicture = ()=>{
        console.log('Nada')
        saveProfilePicture({
            user:userTorre.user_id, 
            auth:userTorre.user_id,
            asset_type: 'image',
          })
    }

  
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
          <div className={styles.headingRow}>Edit</div>
          <div className={styles.updateFlowRow}>
            <div className={styles.currentPictureWrap}>
                <div className={styles.userPicture}>
                    <p>Current profile picture</p>
                    <img src={userTorre.picture_thumbnail} alt="userThumbnail" />
                </div>
                <div className={styles.alterButtons}>
                    <UploadImageButtons handleUploadClick={handleUploadClick}/>
                </div>
            </div>
            <div className={styles.newPictureWrap}>
                <div className={styles.userDraftPicture}>
                    <p>New profile picture</p>
                    {userTorre.draft_thumbnail ? 
                        <img src={userTorre.draft_thumbnail} alt="userDraftThumbnail" /> : 
                        <div className={styles.placeHolder}></div> 
                    }
                    
                </div>
                <div className={styles.alterButtons}>
                    <BootstrapButton onClick={saveNewPicture} href="#contained-buttons" className={styles.editButton} >
                        Accept and Save
                    </BootstrapButton>
                </div>
            </div>
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
    saveProfilePicture: imgObj => {
        dispach(saveProfileAsset(imgObj));
      },
  
  });
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePicture);
