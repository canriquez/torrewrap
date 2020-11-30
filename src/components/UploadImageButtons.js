import React, { useEffect } from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

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
                    <Tooltip title="Upload file." aria-label="upload file">
                        <IconButton color="primary" aria-label="upload file" component="span">
                            <AccountCircleIcon caption="add new picture from file" />
                        </IconButton>
                    </Tooltip>
                </label>
                <label htmlFor="icon-button-delete">
                    <Tooltip title="Take picture." aria-label="take picture">
                        <IconButton color="primary" onClick={handleCapturePicture} aria-label="take picture" component="span">
                            <PhotoCamera caption="Take new profile picture" />
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
