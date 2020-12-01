import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from '../styles/EditProfileVideo.module.css';
import {
  pushProfileAsset, saveProfileAsset, updateTorreUserDetails, clearProfileAsset,
} from '../actions/index';
import WebCamStreamCapture from './WebCamStreamCapture';
import { blobToBase64 } from '../helpers/componentHelp';
import UploadImageButtons from './UploadImageButtons';
import VideoPlayer from './VideoPlayer';
import BootstrapButton from './BootstrapButton';
import Spinner from './Spinner';

const useStyles = makeStyles(theme => ({
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

const EditProfileVideo = ({
  editingVideo, // props from parent
  handleVideoCloseEdit, // props from parent
  userTorre,
  storeProfileVideo,
  saveProfileVideo,
  updateTorreData,
  clearProfileVideo,
}) => {
  const classes = useStyles();
  const {
    video_url, draft_video, uploading, savedProfileAsset,
  } = userTorre;
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [captureWebCam, setCaptureWebCam] = useState(false);
  const [readyToSave, setReadyToSave] = useState(false);

  useEffect(() => {
    // when draft_file exists (only if is loaded into cloud), then we show accept and save button
    if (draft_video) {
      setReadyToSave(true);
    }
  }, [draft_video]);

  useEffect(() => {
    // When profile Asset is saved, then we can close the modal
    if (savedProfileAsset) {
      console.log('cleaning up to close modal...');
      setReadyToSave(false);
      setSelectedFile(undefined);
      updateTorreData({
        draft_video: undefined,
        savedProfileAsset: false,
      });
      handleVideoCloseEdit();
    }
  }, [savedProfileAsset]);

  useEffect(() => {
    // When the file is ready (by webCam or Input form), initiates the cloud storage
    if (selectedFile) {
      console.log('finished uploading file');
      console.log(selectedFile);
      storeProfileVideo({
        user: userTorre.user_id,
        auth: userTorre.user_id,
        asset_type: 'video',
        payload: selectedFile,
      });
      setSelectedFile(undefined);
    }
  }, [selectedFile]);

  // when modal gets closed before finishing actions
  const handleCloseModal = () => {
    setReadyToSave(false);
    setSelectedFile(undefined);
    setCaptureWebCam(false);
    updateTorreData({
      draft_video: undefined,
      savedProfileAsset: false,
    });
    handleVideoCloseEdit();
  };

  // Upload draft file to memory blob (input form)
  const handleUploadClick = e => {
    console.log('about to handle file upload');
    const file = e.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    setReadyToSave(false);
    setSelectedFile(undefined);

    reader.onloadend = ev => {
      setSelectedFile(reader.result);
    };
  };
  // Initiates webcam capture
  const handleCapturePicture = () => {
    setCaptureWebCam(true);
    setReadyToSave(false);
    setSelectedFile(undefined);
    updateTorreData({ draft_video: undefined });
  };

  // After capture click (webcam), updates state with new captured image file b64
  /*     const handleCaptureClick =(imageSrc)=>{
        setSelectedFile(imageSrc)
        setCaptureWebCam(false)
        updateTorreData({draft_video: undefined })
    } */
  // When profile picture deleted, we store a standar profile avatar
  const handleDeletePicture = url => {
    // setSelectedFile(url)
    clearProfileVideo({
      user: userTorre.user_id,
      auth: userTorre.user_id,
      asset_type: 'video',
      cloud_url: url,
    });
    setCaptureWebCam(false);
    updateTorreData({ draft_video: undefined });
    handleVideoCloseEdit();
  };

  // Handles video draft storage into cloud
  // After capture click (webcam), updates state with new captured video after transcode to b64
  const handleUpload = useCallback(blob => {
    blobToBase64(blob).then(videoB64 => {
      console.log({ videoB64 });
      /*             storeProfileVideo({
                user:userTorre.user_id,
                auth:userTorre.user_id,
                asset_type: 'video',
                payload: videoB64
              }) */
      setSelectedFile(videoB64);
      setCaptureWebCam(false);
      updateTorreData({ draft_video: undefined });
      blob = undefined;
    });
  });

  // When 'Accept and Save' button clicked, we initiate the SaveAsset API call (transforming image and marking as final in cloud)
  const saveNewPicture = () => {
    saveProfileVideo({
      user: userTorre.user_id,
      auth: userTorre.user_id,
      asset_type: 'video',
    });
  };

  const renderEditProfileBox = () => {
    console.log('rendering profile box');
    return (
      <div className={styles.yourAccount}>
        <div className={styles.header}>Add and edit your profile picture</div>
        <div className={styles.profileWindow}>
          <div className={styles.profileWrap}>
            <div className={styles.updateFlowRow}>
              <div className={styles.currentPictureWrap}>
                <div className={styles.userPicture}>
                  <p>Current video profile</p>
                  <div className={styles.placeHolderCurrent}>
                    {video_url
                    // Includes the video player on new draft video
                      ? (
                        <div className={styles.currentVideoPlayer}>
                          <VideoPlayer video_url={video_url} />
                        </div>
                      )
                      : ''}
                  </div>
                </div>
                <div className={styles.alterButtons}>
                  <UploadImageButtons
                    video
                    handleUploadClick={handleUploadClick}
                    handleCapturePicture={handleCapturePicture}
                    handleDeletePicture={handleDeletePicture}
                  />
                </div>
              </div>
              <div className={styles.newPictureWrap}>
                <div className={styles.userDraftPicture}>
                  <p>New video profile</p>
                  <div className={styles.placeHolder}>
                    {draft_video
                    // Includes the video player on new draft video
                      ? (
                        <div className={styles.draftVideoPlayer}>
                          <VideoPlayer video_url={draft_video} />
                        </div>
                      )
                      : ''}
                    { captureWebCam
                      ? (
                        <WebCamStreamCapture // This component handles the video capturing and passes the blob:b64 for upload
                          handleUpload={handleUpload}
                        />
                      )
                      : ''}
                  </div>
                  {uploading == 'busy'
                    ? (
                      <div className={styles.spinnerWrap}>
                        <Spinner />
                      </div>
                    )
                    : ''}
                </div>
                <div className={styles.alterButtons}>
                  { readyToSave
                    ? (
                      <BootstrapButton onClick={saveNewPicture} href="#contained-buttons" className={styles.editButton}>
                        Accept and Save
                      </BootstrapButton>
                    )
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={editingVideo}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={editingVideo}>
        <div className={classes.paper}>
          {renderEditProfileBox()}
        </div>
      </Fade>
    </Modal>
  );
};
const mapStateToProps = state => ({
  userTorre: state.userTorre,
});

const mapDispatchToProps = dispach => ({
  storeProfileVideo: imgObj => {
    dispach(pushProfileAsset(imgObj));
  },
  saveProfileVideo: imgObj => {
    dispach(saveProfileAsset(imgObj));
  },
  clearProfileVideo: obj => {
    dispach(clearProfileAsset(obj));
  },
  updateTorreData: settings => {
    dispach(updateTorreUserDetails(settings));
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileVideo);
