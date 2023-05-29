import { FastForward, FastRewind, Pause } from "@mui/icons-material";
import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/PauseCircleOutline";
import { useState } from "react";
import { IconButton } from "@mui/material";

const VideoControlBtn = ({ onPlayPause, playing, onEnded }) => {
  // const [play,setPlay] = useState(playing)
  //   console.log("Button" , playing, onEnded);
  return (
    <div>
      <div className="w-full flex justify-center">
        <div
          className="bg-green-300 p-1  rounded-full flex justify-center my-3"
          
        >
          <IconButton aria-label="delete" size="large" onClick={onPlayPause}>
           
            {!playing && (
             <PlayCircleOutlineIcon fontSize="inherit" className="cursor-pointer text-5xl text-gray-800" />
          )}
          {playing && (
            <PauseIcon
            fontSize="inherit"
              className="  cursor-pointer text-5xl text-gray-50"
              //   onClick={setPlay(!play)}
            />
          )}{" "}
          </IconButton>
          {/* {!playing && (
            <PlayCircleOutlineIcon
              className="cursor-pointer text-5xl text-gray-300"
              //   onClick={setPlay(play)}
            />
          )}
          {playing && (
            <PauseIcon
              className="  cursor-pointer text-5xl text-gray-50"
              //   onClick={setPlay(!play)}
            />
          )}{" "} */}
        </div>
      </div>

      {/* <div className="bottom__container">
 <div className="slider__container">
 <PrettoSlider />
 </div>
 <div className="control__box">
 <div className="inner__controls">
 <div className="icon__btn">
 <PlayArrow fontSize="medium" />
 </div>
 <div className="icon__btn">
 <SkipNext fontSize="medium" />
 </div>
 <div className="icon__btn">
 <VolumeUp fontSize="medium" />
 </div>

 <Slider
             className={`${classes.volumeSlider}`} />
 <span>5/20</span>
 </div>
 </div>
 </div> */}
    </div>
  );
};

export default VideoControlBtn;
