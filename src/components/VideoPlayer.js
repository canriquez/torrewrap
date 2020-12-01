import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = ({
  video_url,
  playOnClick,
}) => {
  // const url = 'https://res.cloudinary.com/anriquez/video/upload/v1606615113/mwfbtbfekop9pmuuc19t.mp4'
  const videoCanPlay = ReactPlayer.canPlay(video_url);
  console.log({ videoCanPlay });
  let playNow = true;
  if (playOnClick) {
    playNow = false;
  } else {
    playNow = true;
  }

  return (
    <>
      { videoCanPlay
        ? (
          <ReactPlayer
            className="react=player"
            controls
            playing={playNow}
            url={video_url}
            width="100%"
            height="100%"
          />
        )
        : '...'}
    </>

  );
};

export default VideoPlayer;
