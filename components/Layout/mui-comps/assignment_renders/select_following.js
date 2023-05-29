import { Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const SelectFollowingActivity = () => {

    const select_following_letters = ['ص','ض','س','ش','ث','ط','ظ'];

    return (
        <div>
            <Card sx={{ marginTop: '5%', width: '100%', height:'20vw', fontFamily: 'Ubuntu Mono', textAlign: 'left', padding: '2%' }}>
                <label>Which is the first letter of صـ بـ ـر ?</label>
                <br/>
                <br/>
                <div>
                    <CardContent>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 8, md: 3 }} sx={{ marginTop: '5%', marginLeft: '15%' }}>
                            
                            {select_following_letters.map((letter)=>{
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
    )
}



export default SelectFollowingActivity