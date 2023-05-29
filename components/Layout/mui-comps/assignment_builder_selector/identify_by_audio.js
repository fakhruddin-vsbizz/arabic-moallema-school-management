import React, { useState } from 'react'
import { CardContent, Card, Typography, TextField, IconButton, Grid, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const IdentifyByAudioBuilder = (props) => {

    const [showAudio, setShowAudio] = useState(false);

    const uploadExampleAudio = (event) => {
        console.log(event.target.files);
        setShowAudio(true);
    }

    const [renderIter, setRenderIter] = useState([1,2,3,4,5]);

    function addNewOption() {
        let concated_new_iterator =  renderIter.concat([renderIter.length+1])
        setRenderIter(concated_new_iterator);
    }

    function deleteSelectedOption(key) {
        let updated_iterator = renderIter.filter((val) => {
            console.log(key);
            return renderIter.indexOf(val) !== key;
        });
        console.log(updated_iterator);
        setRenderIter(updated_iterator);
        
    }


    return (
        <div>
            <label><b>Task {props.incrementer + 1}: Identify by Audio</b></label>
            <br/>
            <div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 8, md: 3 }} sx={{ marginTop: '5%' }}>
                    <Grid xs={6} sx={{ padding:'2%' }}>
                        
                        <Card sx={{ width: '70%', height: '100%', padding: '2%' }}>
                            <CardContent>
                                <label>Upload the audio for learners to listen:</label>
                                <br/>
                                <br/>
                                <Button variant="contained" component="label" onChange={uploadExampleAudio}>
                                    Upload
                                    <AudioFileIcon/>
                                    <input hidden accept="audio/*" type="file" />
                                </Button>
                            </CardContent>
                        </Card>
                        
                    </Grid>
                    <Grid xs={6} sx={{ padding:'2%' }}>
                        <Card sx={{ width: '70%', height: '100%', padding: '2%' }}>
                            <CardContent>
                                {showAudio && (
                                    <div>
                                        <label>Audio Preview</label>
                                        <br/>
                                        <PlayCircleIcon style={{ width: '30%', height: '30%' }}/>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        
                        
                    </Grid>
                </Grid>
                <br/><br/>
                <label>Enter the options to choose from:</label>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 8, md: 3 }} sx={{ marginTop: '2%' }}>
                    {renderIter.map((val, key)=>{
                        return <MUICard addNewOption={addNewOption} deleteSelectedOption={deleteSelectedOption} iteratorIndex={key}/>
                    })}
                </Grid>
            </div>
        </div>
    )
}
const MUICard = (props) => {
    return (
      <div>
        <Card
          sx={{ minWidth: 160 }}
          id={"a" + props.activity_index + "_tr" + props.iteratorIndex}
          className="p-4 w-fit hover:bg-dark-purple   text-dark-purple text-bold place-content-center text-center shadow-lg"
        >
          <CardContent className="text-bold  ">
            <Typography sx={{ fontSize: 14 }} gutterBottom></Typography>
            <input
              className="w-full h-24 text-center text-4xl border-b-2 rounded-md "
              id="standard-basic"
              variant="standard"
              sx={{ fontSize: 100 }}
              onChange={(
                e,
                asg_index = props.activity_index,
                iter_index = props.iteratorIndex
              ) => props.valueSetter(e, asg_index, iter_index)}
            />
          </CardContent>
          <Stack direction="" className="mr-auto" spacing={1}>
            <div className="flex justify-center w-full">
              <div className="">
                <IconButton aria-label="add new option"
                onClick={props.addNewOption} color="success">
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              <div className="">
                <IconButton aria-label="delete"
                onClick={() =>
                  props.deleteSelectedOption(
                    props.iteratorIndex,
                    props.activity_index
                  )
                } className="text-red-500">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Stack>
        </Card>
      </div>
    );
  };

const MultiOptionCard = (props) => {
    return (
        <Grid xs={4}>
            <center>
                <Card sx={{ width: '70%', height: '100%', padding: '2%' }}>
                    <TextField id="standard-basic" variant="standard" sx={{ fontSize: 100 }} />
                    <br/>
                    <br/>
                    <center>
                        <IconButton color="primary" aria-label="add new option" onClick={props.addNewOption}>
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={()=>props.deleteSelectedOption(props.iteratorIndex)}>
                            <DeleteIcon />
                        </IconButton>
                    </center>
                </Card>
            </center>
        </Grid>
    );
}

export default IdentifyByAudioBuilder