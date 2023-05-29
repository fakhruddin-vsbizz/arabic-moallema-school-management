import { Card, CardContent, Grid, IconButton, Paper, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import MicIcon from '@mui/icons-material/Mic';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import useRecorder from './audio_recorder';
import { PlayCircle } from '@mui/icons-material';

const PronouceYourKhatActivity = () => {

    const select_following_letters = ['ص','ض','س','ش','ث','ط','ظ'];

    const { audio_url, isRecording, startRecording, stopRecording } = useRecorder();

    // const startIndRecording = (event) => {
    //     startRecording();
    //     const id_prefix = event.target.id.split('_')[1];
    //     document.getElementById('stop_recording_'+id_prefix).style.visibility = 'visible';
    //     event.target.style.visibility = 'hidden';
        
    // }

    // const stopIndRecording = (event) => {
    //     stopRecording();
    //     const id_prefix = event.target.id.split('_')[2];
    //     document.getElementById('record_'+id_prefix).style.visibility = 'visible';
    //     event.target.style.visibility = 'hidden';
    //     console.log(audio_url);
    // }


    return (
        <div>
            <Card sx={{ marginTop: '5%', width: '100%', height:'20vw', fontFamily: 'Ubuntu Mono', textAlign: 'left', padding: '2%' }}>
                <label>Record the following Hurf given to you by clicking the mic</label>
                <br/>
                <br/>
                <div>
                    <CardContent>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 8, md: 3 }} sx={{ marginTop: '5%', marginLeft: '15%' }}>
                            
                            {select_following_letters.map((letter)=>{
                                return (
                                    <Grid xs={3}>
                                        <center>
                                            <Paper variant="outlined" style={{ width: '60%', marginTop: '2%' }}>
                                                <center><label dir='ar' style={{ fontFamily: 'IBM Plex Sans Arabic', fontSize: '40px' }}>{letter}</label></center>
                                            </Paper>
                                            <Button>Start</Button>
                                            <Button>Stop</Button>
                                            
                                            
                                            <audio src={audio_url} controls />
                                            
                                        </center>
                                        
                                    </Grid>
                                );
                                
                            })}
                        </Grid>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}



export default PronouceYourKhatActivity