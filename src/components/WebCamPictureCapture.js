import Webcam from 'react-webcam'
import React, { useCallback } from 'react';
import styles from '../styles/WebCamPictureCapture.module.css';
import BootstrapButton from './BootstrapButton';

const WebCamPictureCapture = ({handleCaptureClick})=>{

    const videoConstraints = {
        width: 768,
        height: 768,
        facingMode: "user"
      };
    
    const webcamRef = React.useRef(null);
       
    const capture = useCallback(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log({imageSrc});
            handleCaptureClick(imageSrc)
          },
          [webcamRef]
        );

    return (
        <div className={styles.webcamWrap}>
            <Webcam className={styles.webcam}
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={768}
                videoConstraints={videoConstraints}
            />
        <BootstrapButton href="#contained-buttons" className={styles.editButton} onClick={capture}>
              Capture Picture
        </BootstrapButton>
      </div>
    );
}

export default WebCamPictureCapture;