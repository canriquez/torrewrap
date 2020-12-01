import { StylesProvider } from '@material-ui/core';
import React, { useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import styles from '../styles/WebCamStreamCapture.module.css';
import BootstrapButton from './BootstrapButton';

const WebCamStreamCapture = ({
  handleUpload,
}) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(prev => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const saveFile = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      console.log('about to start upload');
      handleUpload(blob);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div className={styles.videoCapture}>
      <Webcam audio ref={webcamRef} />
      <div className={styles.menu}>
        {capturing ? (
          <BootstrapButton
            onClick={handleStopCaptureClick}
            href="#contained-buttons"
            className={styles.editButton}
          >
            Stop Capture
          </BootstrapButton>
        ) : (
          <BootstrapButton
            onClick={handleStartCaptureClick}
            href="#contained-buttons"
            className={styles.editButton}
          >
            Start Capture
          </BootstrapButton>
        )}
        {recordedChunks.length > 0 && (
          <BootstrapButton
            onClick={saveFile}
            href="#contained-buttons"
            className={styles.editButton}
          >
            Save
          </BootstrapButton>
        )}
      </div>
    </div>
  );
};

export default WebCamStreamCapture;
