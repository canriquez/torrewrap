import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/EditProfilePicture.module.css';
import { pushProfileAsset, saveProfileAsset, updateTorreUserDetails } from '../actions/index'
import UploadImageButtons from './UploadImageButtons';
import BootstrapButton from './BootstrapButton';
import WebCamPictureCapture from './WebCamPictureCapture'
import Spinner from './Spinner'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#27292d',
      border: '2px solid #27292d',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const EditProfilePicture = ({
    editingPicture, //props from parent
    handleCloseEdit, //props from parent
    userTorre,
    storeProfilePicture,
    saveProfilePicture,
    updateTorreData
  }) => {
    const classes = useStyles();
    const {picture_thumbnail, draft_thumbnail, uploading, savedProfilePicture} = userTorre
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [captureWebCam, setCaptureWebCam] = useState(false);
    const [readyToSave, setReadyToSave] = useState(false)


    useEffect (()=>{
        //when draft_file exists (only if is loaded into cloud), then we show accept and save button
        if (draft_thumbnail) {
            setReadyToSave(true)
        }

    },[draft_thumbnail])

    useEffect (()=>{
        //when draft_file exists (only if is loaded into cloud), then we show accept and save button
        if (savedProfilePicture) {
            setReadyToSave(false)
            setSelectedFile(undefined)
            updateTorreData({
                draft_thumbnail: undefined,
                savedProfilePicture: false})
            handleCloseEdit()
        }

    },[savedProfilePicture])

    useEffect(()=>{
        //When the file is ready (by webCam or Input form), initiates the cloud storage
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

    //Upload draft file to memory blob (input form)
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

    //After capture click (webcam), updates state with new captured image file b64
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

    //When 'Accept and Save' button clicked, we initiate the SaveAsset API call (transforming image and marking as final in cloud)
    const saveNewPicture = ()=>{
        saveProfilePicture({
            user:userTorre.user_id, 
            auth:userTorre.user_id,
            asset_type: 'image',
          })
    }

    const renderEditProfileBox = () => {
        return (
            <div className={styles.yourAccount}>
                <div className={styles.header}>Edit your profile picture</div>
                <div className={styles.profileWindow}>
                    <div className={styles.profileWrap}>
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
        )
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={editingPicture}
            onClose={handleCloseEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
        <Fade in={editingPicture}>
          <div className={classes.paper}>
            {renderEditProfileBox()}
          </div>
        </Fade>
      </Modal>
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
