import React from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Card, CardContent, Grid, IconButton, Paper } from '@mui/material';
import hurf_audio from './aen.mp3'

const IdentifyByAudioActivity = () => {

  const letters_to_identify = ['ا','ب','ت','ث','ج','ح','خ','ذ','ر','ز']

  const play_audio = () => {
    document.getElementById('hurfaudio').play();
  }

  return (
    <div>
      <div>
          <Card sx={{ marginTop: '5%', width: '100%', height:'50vw', fontFamily: 'Ubuntu Mono', textAlign: 'left', padding: '2%', overflowY: 'scroll' }}>
            <label>Listen to the voice and tell which Hurf is spelled here</label>
            <br/>
            <br/>
            <audio controls style={{ display: 'none' }} id={'hurfaudio'}>
              <source src={hurf_audio} type='audio/mp3'></source>
            </audio>
            <IconButton color="secondary" aria-label="upload picture" component="label" onClick={play_audio}>
              <PlayCircleIcon/>  
            </IconButton>
            
            <div>
                <CardContent>
                  <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 8, md: 3 }} sx={{ marginTop: '5%', marginLeft: '15%' }}>
                      
                      {letters_to_identify.map((letter)=>{
                          return (
                              <Grid xs={3}>
                                  <Paper variant="outlined" style={{ width: '60%', marginTop: '2%' }}>
                                      <center><label dir='ar' style={{ fontFamily: 'IBM Plex Sans Arabic', fontSize: '40px' }}>{letter}</label></center>
                                  </Paper>
                              </Grid>
                            );
                              
                          })}
                    </Grid>
                </CardContent>
                </div>
          </Card>
      </div>
    </div>
  )
}

export default IdentifyByAudioActivity