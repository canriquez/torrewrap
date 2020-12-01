import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const useStyles2 = makeStyles(theme => ({

  primary: {
    backgroundColor: '#cddc39',
    borderColor: '#cddc39',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      borderColor: '#cddc39',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#cddc39',
      borderColor: '#cddc39',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}));

const EditActionButton = ({
  handleOpenEdit,
}) => {
  const classes = useStyles();
  const classesIcon = useStyles2();

  return (
    <div className={classes.root}>
      <Fab size="small" onClick={handleOpenEdit} className={classesIcon.primary} aria-label="edit">
        <EditIcon />
      </Fab>
    </div>
  );
};

export default EditActionButton;
