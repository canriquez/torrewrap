import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../styles/VideoProfile.module.css';
import BootstrapButton from '../components/BootstrapButton';
import Webcam from 'react-webcam'
import { pushProfileAsset } from '../actions/index'
import { blobToBase64 } from '../helpers/componentHelp';
import VideoPlayer from '../components/VideoPlayer';


const VideoProfile = ({
  userTorre,
  storeProfileVideo,
}) => {
    const {video_url} = userTorre
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [profileVideoUrl, setProfileVideoUrl] = React.useState('');
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);


    useEffect(()=>{
      if (video_url != ''){
        setProfileVideoUrl(video_url)
      }

    },[video_url])
  
    const handleStartCaptureClick = useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleUpload = useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        //convert to base64
        //call API to upload file
        blobToBase64(blob).then(videoB64 => {
            console.log({videoB64})
            storeProfileVideo({
                user:userTorre.user_id, 
                auth:userTorre.user_id,
                asset_type: 'video',
                payload: videoB64 
              })
        })

      }
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
            <VideoPlayer video_url={profileVideoUrl}/>
          </div>


         <div className={styles.webcamWrap}>
            <Webcam audio={true} ref={webcamRef} />
            {capturing ? (
            <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
            <button onClick={handleUpload}>Save</button>
            )}
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
  storeProfileVideo: videoObj => {
    dispach(pushProfileAsset(videoObj));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(VideoProfile);
