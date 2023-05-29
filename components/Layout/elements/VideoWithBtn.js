import React, { Component } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/PauseCircleOutline";
import { useState, useRef } from "react";
import ReactPlayer from 'react-player'
// import mp from '@/components/src/gif/portrait/1.mp4'

const VIDEO_PATH = 'https://res.cloudinary.com/daftxtnxw/video/upload/v1680592002/1_ux9sp8.mp4';

const VideoWithBtn = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef()  

  console.log(videoRef);

  const handlePlay=() => {
    // videoRef.current.onPlay()
    setPlaying(true)}
  const handlePause=() => {
    videoRef.current.onPause()
    setPlaying(false)}

  return (
    <div className="">
      <div className="bg-gray w-full border-2 flex justify-center">
      <ReactPlayer url={VIDEO_PATH} muted={false} playing={true} controls={true} width={240} height={480} ref={videoRef} />
      </div>
      <div className="bg-gray w-full border-2 flex justify-center my-3 ">

      
      {!playing && (
        <PlayCircleOutlineIcon
          className="cursor-pointer"
          onClick={handlePlay}
        />
      )}
      {playing && (
        <PauseIcon
          className="  cursor-pointer"
          onClick={handlePause}
        />
      )}
      </div>
    </div>
  );
};

export default VideoWithBtn;
