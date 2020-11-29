import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../styles/EditProfilePicture.module.css';
import { pushProfileAsset, saveProfileAsset, updateTorreUserDetails } from '../actions/index'
import UploadImageButtons from './UploadImageButtons';
import BootstrapButton from './BootstrapButton';
import WebCamPictureCapture from './WebCamPictureCapture'
import Spinner from './Spinner'


const EditProfilePicture = ({
    userTorre,
    storeProfilePicture,
    saveProfilePicture,
    updateTorreData
  }) => {
      const {picture_thumbnail, draft_thumbnail, uploading} = userTorre
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [captureWebCam, setCaptureWebCam] = useState(false);
    const [readyToSave, setReadyToSave] = useState(false)


    useEffect (()=>{
        //when draft_file exists (only if is loaded into cloud), then we show accept and save button
        if (draft_thumbnail) {
            setReadyToSave(true)
        }

    },[draft_thumbnail])

    useEffect(()=>{
        //When the file is ready, initiates the cloud storage
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

    //Upload draft file to memory
    const handleUploadClick = (e)=>{
        console.log("about to handle file upload")
        const file = e.target.files[0]
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        setReadyToSave(false)
        setSelectedFile(undefined)

        reader.onloadend = (ev)=>{
            setSelectedFile(reader.result)
        }
    }
    //Initiates webcam capture
    const handleCapturePicture = ()=>{
        setCaptureWebCam(true)
        setReadyToSave(false)
        setSelectedFile(undefined)
        updateTorreData({draft_thumbnail: undefined })
    }

    //After capture click, updates state with capture image file b64
    const handleCaptureClick =(imageSrc)=>{
        setSelectedFile(imageSrc)
        setCaptureWebCam(false)
        updateTorreData({draft_thumbnail: undefined })
    }
    //When profile picture deleted, we store a standar profile avatar
    const handleDeletePicture=(url)=>{
        setSelectedFile(url)
        setCaptureWebCam(false)
        updateTorreData({draft_thumbnail: undefined })
    }

    const saveNewPicture = ()=>{
        console.log('Nada')
        saveProfilePicture({
            user:userTorre.user_id, 
            auth:userTorre.user_id,
            asset_type: 'image',
          })
    }


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
                    <img src={picture_thumbnail} alt="userThumbnail" />
                </div>
                <div className={styles.alterButtons}>
                    <UploadImageButtons 
                    handleUploadClick={handleUploadClick} 
                    handleCapturePicture={handleCapturePicture}
                    handleDeletePicture={handleDeletePicture}
                    />
                </div>
            </div>
            <div className={styles.newPictureWrap}>
                <div className={styles.userDraftPicture}>
                    <p>New profile picture</p>
                    {userTorre.draft_thumbnail ? 
                        <img src={userTorre.draft_thumbnail} alt="userDraftThumbnail" /> : 
                        <div className={styles.placeHolder}></div> 
                    }

                    {uploading=='busy' ? 
                    <div className={styles.spinnerWrap}>
                        <Spinner />
                    </div>
                    :''}


                    { captureWebCam ? 
                    <WebCamPictureCapture handleCaptureClick={handleCaptureClick} />
                    :''
                    }
                    
                </div>
                <div className={styles.alterButtons}>
                    { readyToSave ? 
                        <BootstrapButton onClick={saveNewPicture} href="#contained-buttons" className={styles.editButton} >
                            Accept and Save
                        </BootstrapButton>
                    : ''}
                </div>
            </div>
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
    updateTorreData: (settings)=>{
        dispach(updateTorreUserDetails(settings))
    },
  
  });
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePicture);
