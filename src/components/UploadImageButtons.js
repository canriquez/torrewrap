import React, { useEffect } from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


const UploadImageButtons =({
    handleUploadClick,
    handleCapturePicture,
    handleDeletePicture
})=> {
    const classes = useStyles();


const deletePicture=()=>{
    handleDeletePicture("https://anri-img-storage.s3.amazonaws.com/avatar/empty.png")
}


    return (
        <div className={StylesProvider.uploadForm}>
            <form>
                <input 
                accept="image/*" 
                className={classes.input} 
                style={{ display: 'none' }}
                id="icon-button-file" 
                type="file" 
                onChange={handleUploadClick}
                />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <AccountCircleIcon caption="add new picture from file" />
                    </IconButton>
                </label>
                <label htmlFor="icon-button-delete">
                    <IconButton color="primary" onClick={handleCapturePicture} aria-label="upload picture" component="span">
                        <PhotoCamera caption="add new picture from file" />
                    </IconButton>
                </label>
                <label htmlFor="icon-button-delete">
                    <IconButton color="primary" onClick={deletePicture} aria-label="upload picture" component="span">
                        <DeleteForeverIcon caption="add new picture from file" />
                    </IconButton>
                </label>
            </form>
        </div>
    );
}

export default UploadImageButtons;
