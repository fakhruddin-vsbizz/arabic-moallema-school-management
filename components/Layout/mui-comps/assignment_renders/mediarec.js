import { Button } from '@mui/material'
import React, { useState } from 'react'

const MediaRec = () => {

    const startAudioButton = document.querySelector("#record");
    const stopButton = document.querySelector("#stop_record");

    const [audioList, setAudioList] = useState("blob:http://localhost:3000/redefined")
    

    function recordAudio() {
        navigator.mediaDevices
        .getUserMedia({ audio: true})
        .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };
        mediaRecorder.onstop = (e) => {
            createMediaElement("audio", "audio/mp3");
        };
        mediaRecorder.onerror = (e) => {};
        mediaRecorder.start(1000);
        })
}

    function createMediaElement(mediaType, fileType) {
        const blob = new Blob(chunks, {
        type: fileType,
        });
        const mediaURL = window.URL.createObjectURL(blob);
        setAudioList(mediaURL);
        console.log(audioList);
        mediaRecorder = null;
        chunks = [];
    }

  function stopRecording() {
    mediaRecorder.stop();
  }


let mediaRecorder = null;
let chunks = [];

  return (
    <div>
        <Button id="record" onClick={recordAudio}>Record</Button>
        <Button id="stop_record" onClick={stopRecording}>Stop</Button>
        <div id="audio-list">
            <audio controls>
                <source src={audioList}></source>
            </audio>
        </div>
    </div>
  )
}

export default MediaRec