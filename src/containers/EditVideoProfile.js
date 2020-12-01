import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/VideoProfile.module.css';
import { pushProfileAsset } from '../actions/index';
import { blobToBase64 } from '../helpers/componentHelp';
import VideoPlayer from '../components/VideoPlayer';
import WebCamStreamCapture from '../components/WebCamStreamCapture';

const EditVideoProfile = ({
  userTorre,
  storeProfileVideo,
}) => {
  const { video_url } = userTorre;
  const [profileVideoUrl, setProfileVideoUrl] = React.useState('');
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  useEffect(() => {
    if (video_url != '') {
      setProfileVideoUrl(video_url);
    }
  }, [video_url]);

  const handleUpload = useCallback(blob => {
    blobToBase64(blob).then(videoB64 => {
      console.log({ videoB64 });
      storeProfileVideo({
        user: userTorre.user_id,
        auth: userTorre.user_id,
        asset_type: 'video',
        payload: videoB64,
      });
    });
  }, [recordedChunks]);

  return (
    <div className={styles.yourAccount}>
      <div className={styles.header}>Your account</div>
      <div className={styles.profileWindow}>
        <div className={styles.profileWrap}>
          <div className={styles.headingRow}>Your picture</div>
          <div className={styles.userPicture}>
            <img src={userTorre.picture_thumbnail} alt="userThumbnail" />
          </div>

          <div className={styles.videoPlayerWrap}>
            <VideoPlayer video_url={profileVideoUrl} />
          </div>

          <div className={styles.webcamWrap}>
            <WebCamStreamCapture // This component handles the video capturing and passes the blob:b64 for upload
              handleUpload={handleUpload}
            />
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
  storeProfileVideo: videoObj => {
    dispach(pushProfileAsset(videoObj));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(EditVideoProfile);
