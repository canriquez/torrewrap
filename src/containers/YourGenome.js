import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkIcon from '@material-ui/icons/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import styles from '../styles/YourGenome.module.css';
import { pushProfileAsset, updateTorreUserDetails } from '../actions/index';
import EditActionButton from '../components/EditActionButton';
import EditProfilePicture from '../components/EditProfilePicture';
import EditProfileVideo from '../components/EditProfileVideo';
import { ReactComponent as CheckIcon } from '../icons/check.svg';
import VideoPlayer from '../components/VideoPlayer';
import { hasVideoProfile } from '../helpers/componentHelp';
import { USER_RECORD } from '../helpers/help';

const YourGenome = ({
  userTorre,
  updateUserTorreData,
}) => {
  const { video_url } = userTorre;
  const [editingPicture, setEditingPicture] = useState(false);
  const [editingVideo, setEditingVideo] = useState(false);

  if (!window.localStorage.hasOwnProperty(USER_RECORD)) {
    return (
      <Redirect to="/" />
    );
  }

  const handleOpenEditPicture = () => {
    console.log('trying to open modal');
    setEditingPicture(true);
  };

  const handleOpenEditVideo = () => {
    console.log('trying to open modal');
    setEditingVideo(true);
  };
  const handleCloseEdit = () => {
    console.log('closing modal');
    setEditingPicture(false);
    setEditingVideo(false);
  };

  return (
    <div className={styles.YourGenome}>
      <div className={styles.header}>
        {userTorre.user_name}
        's Professional genome
      </div>
      <section className={styles.mainGenome}>
        <div className={styles.profileWindow}>
          <section className={styles.sectionWrap}>
            <div className={styles.profilePicture}>
              <div className={styles.userPicture}>
                <img src={userTorre.picture_thumbnail} alt="userThumbnail" />
              </div>
              <div className={styles.editProfile}>
                <EditActionButton handleOpenEdit={handleOpenEditPicture} />
              </div>
            </div>

            <EditProfileVideo handleVideoCloseEdit={handleCloseEdit} editingVideo={editingVideo} />
            <EditProfilePicture handleCloseEdit={handleCloseEdit} editingPicture={editingPicture} />

            <div className={styles.movieMake}>
              <Tooltip title="Create your video profile today!" aria-label="video profile">
                <IconButton color="primary" onClick={handleOpenEditVideo} aria-label="video profile" component="span">
                  <LocalMoviesIcon style={{ color: '#cddc39' }} fontSize="large" caption="Create your video profile today!" />
                </IconButton>
              </Tooltip>
            </div>

            <div className={`${styles.dataRow} ${styles.userName}`}>
              <p>{userTorre.user_name}</p>
              <CheckIcon className={styles.checkIcon} />
            </div>
            <div className={styles.dataRow}>
              <p>{userTorre.torre_data.professionalHeadline}</p>
            </div>
            <div className={styles.dataRow}>
              <p>{userTorre.torre_data.location.name}</p>
            </div>
            <div className={`${styles.dataRow} ${styles.bioSummary}`}>
              <p>{userTorre.torre_data.summaryOfBio}</p>
            </div>
            <div className={styles.linksWrap}>
              <a href={userTorre.torre_data.links[0].address} target="_blank">
                <LinkIcon style={{ color: '#FFFFFF' }} fontSize="medium" />
              </a>
              <a href={userTorre.torre_data.links[1].address} target="_blank">
                <GitHubIcon style={{ color: '#FFFFFF' }} fontSize="medium" />
              </a>
              <a href={userTorre.torre_data.links[2].address} target="_blank">
                <LinkedInIcon style={{ color: '#FFFFFF' }} fontSize="medium" />
              </a>
              <a href={userTorre.torre_data.links[3].address} target="_blank">
                <TwitterIcon style={{ color: '#FFFFFF' }} fontSize="medium" />
              </a>
            </div>

          </section>
          {hasVideoProfile(video_url)
            ? (
              <section className={styles.sectionWrap}>
                <div className={styles.profileVideo}>
                  <div className={`${styles.dataRow} ${styles.colHeading}`}>
                    <p>My Profile Video</p>
                    <VideoPlayer video_url={video_url} playOnClick />
                  </div>
                </div>
              </section>
            )
            : ''}
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = state => ({
  userTorre: state.userTorre,
});

const mapDispatchToProps = dispach => ({
  storeProfilePicture: imgObj => {
    dispach(pushProfileAsset(imgObj));
  },
  updateUserTorreData: data => {
    dispach(updateTorreUserDetails(data));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(YourGenome);
