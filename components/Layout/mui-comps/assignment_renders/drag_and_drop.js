import React from 'react'

const DragAndDropActivity = () => {

  const buckets = ['Heavy', 'Light']
  const words_to_drag = ['حرم', 'ربّ','محرم','وزرً']


  return (
    <div>
      <div>
        <Card sx={{ marginTop: '5%', width: '100%', height:'50vw', fontFamily: 'Ubuntu Mono', textAlign: 'left', padding: '2%', overflowY: 'scroll' }}>
          <label>Drag and Drop the following words into the buckets:</label>
          <br/>
          <br/>
          <PlayCircleIcon style={{ width: '10%', height: '10%' }}/>
          <div>
              <CardContent>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 8, md: 3 }} sx={{ marginTop: '5%', marginLeft: '15%' }}>
                    
                    {buckets.map((bucket)=>{
                      return (
                        <Grid xs={3}>
                          <h4>{bucket}</h4>
                          <Paper variant="outlined" style={{ height: '45%', marginTop: '2%' }}/>

                        </Grid>
                      );
                    })}

                    <Grid xs={3}>
                      {words_to_drag.map((word)=>{
                        return (
                          <Paper variant="outlined" style={{ width:'60%' }}>
                            {word}
                          </Paper>
                        )
                      })}
                    </Grid>

                  </Grid>
              </CardContent>
              </div>
        </Card>
      </div>
    </div>
  )
}

export default DragAndDropActivity