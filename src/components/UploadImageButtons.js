import React, { useEffect } from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));


const UploadImageButtons =({
    video,
    handleUploadClick,
    handleCapturePicture,
    handleDeletePicture
})=> {
    const classes = useStyles();
    const captureSettings = [
        {accept:'image',title:'Take picture.', ariaLevel:'take picture', delete:'https://anri-img-storage.s3.amazonaws.com/avatar/empty.png'}, 
        {accept:'video',title:'Capture Video', ariaLevel:'capture video', delete:'https://anri-img-storage.s3.amazonaws.com/avatar/no_profile.mp4'}
    ]
    let settings = {};
    if (video) {
        console.log('ready to capture videos')
        settings = captureSettings[1]
    }else{
        console.log('ready to capture pictures')
        settings = captureSettings[0]
    }

    const deletePicture=()=>{
    handleDeletePicture(settings.delete)
}


    return (
        <div className={StylesProvider.uploadForm}>
            <form>
                <input 
                accept={settings.accept+'/*'}
                className={classes.input} 
                style={{ display: 'none' }}
                id="icon-button-file" 
                type="file" 
                onChange={handleUploadClick}
                />
                <label htmlFor="icon-button-file">
                    <Tooltip title="Upload file." aria-label="upload file">
                        <IconButton color="primary" aria-label="upload file" component="span">
                            <AccountCircleIcon caption="add new picture from file" />
                        </IconButton>
                    </Tooltip>
                </label>
                <label htmlFor="icon-button-delete">
                    <Tooltip title={settings.title} aria-label={settings.ariaLevel}>
                        <IconButton color="primary" onClick={handleCapturePicture} aria-label={settings.ariaLevel} component="span">
                            {video ? 
                            <VideocamIcon caption="Record new video"/>
                            :
                            <PhotoCamera caption="Take new profile picture" />
                            }
                        </IconButton>
                    </Tooltip>
                </label>
                <label htmlFor="icon-button-delete">
                    <Tooltip title="Delete picture." aria-label="delete picture">
                        <IconButton color="primary" onClick={deletePicture} aria-label="delete picture" component="span">
                            <DeleteForeverIcon caption="add new picture from file" />
                        </IconButton>
                    </Tooltip>
                </label>
            </form>
        </div>
    );
}

export default UploadImageButtons;
