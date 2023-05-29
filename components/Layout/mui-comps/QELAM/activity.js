import { CardContent, Card, IconButton, Grid, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import dnd_data from './dnd_data';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './column';
import Person from './tasks';
import Container from '@mui/material/Container';


const activity = {
  'Alif': [
    {
      'activity_type': 'trace',
      'trace_data': ['اَ', 'اِ', 'اُ', 'اً', 'اٍ', 'اٌ'],
    },
    {
      'activity_type': 'dnd',
      'identifier':"position",
      'activity_ques_title': "Drag and drop words which have Alif at initial, middle or final position",
      'dnd_data':{
        tasks:{
            'task-1': {"id":"task-1", "content": "Do the mopping"},
            'task-2': {"id":"task-2", "content": "Do shopping"},
            'task-3': {"id":"task-3", "content": "Clean Room"},
            'task-4': {"id":"task-4", "content": "Clean pool"},
        },
        columns:{
            'column-1':{
                id:'column-1',
                name:"To do",
                taskIds:['task-1','task-2','task-3','task-4']
            },
            'column-2':{
                id:'column-2',
                name:"In Progress",
                taskIds:[]
            },
            'column-3':{
                id:'column-3',
                name:"Done",
                taskIds:[]
            }
        },
        columnOrder:['column-1','column-2','column-3'],
      }
    },
    {
      'activity_type': 'dnd',
      'identifier':"position",
      'activity_ques_title': "Drag and drop words which have Alif with Zair, Zabar and Pesh",
      'dnd_data':{
        tasks:{
            'task-1': {"id":"task-1", "content": "Do the mopping"},
            'task-2': {"id":"task-2", "content": "Do shopping"},
            'task-3': {"id":"task-3", "content": "Clean Room"},
            'task-4': {"id":"task-4", "content": "Clean pool"},
        },
        columns:{
            'column-1':{
                id:'column-1',
                name:"To do",
                taskIds:['task-1','task-2','task-3','task-4']
            },
            'column-2':{
                id:'column-2',
                name:"In Progress",
                taskIds:[]
            },
            'column-3':{
                id:'column-3',
                name:"Done",
                taskIds:[]
            }
        },
        columnOrder:['column-1','column-2','column-3'],
      }
    }
  ]
}

const returnAssignmentComponent = (assignment_type, processing_data) => {
  switch(assignment_type) {
    case 'trace':
      return <TracingActivity trace_letters={processing_data['trace_data']}/>;
    case 'dnd':
      return <DragDropActivity dnd_data={processing_data['dnd_data']}/>;
    default:
      return;
  }
}


const LetterActivity = () => {
  return (
    <div>
      {activity['Alif'].map((act)=>{      
        return (
          <center>
          <br/>
            <Card style={{ width: '80%', height: '80%' }}>
              <CardContent>
                <label>Activity: Trace the Hurf</label>
                <br/>
                <br/>
                {returnAssignmentComponent(act['activity_type'],act)}
                <hr/>
              </CardContent>
            </Card>
          </center>
        );
      })}
      
      
      
    </div>
  )
}


const TracingActivity = (props) => {


  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  let canvas = canvasRef.current;

  const chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  useEffect(() => {
      canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
  
      const context = canvas.getContext("2d");
      context.lineCap = "round";
  
      //styling canvas
  
      // Load the "Ubuntu Mono" font from Google Fonts
  
      context.font = "100px 'IBM Plex Sans Arabic', monospace";
      // context.font = "100px Arial";
  
      context.fillStyle = "green";
  
      // Align the text horizontally and vertically
      context.textAlign = "center";
  
      
      context.lineWidth = 5;
      contextRef.current = context;

      let all_canvas_rearrange = chunkIntoN(props.trace_letters,props.trace_letters.length/3)

      let starter = 40;
      all_canvas_rearrange.map((letter_arr)=>{
        starter = starter+100;
        writeText({ text: letter_arr.join('\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\n'), x: 180, y: starter });
      });

      
      


    }, []);


    const writeText = (info, style = {}) => {
      const { text, x, y } = info;
      const { fontSize = 80, fontFamily = 'IBM Plex Sans Arabic', color = 'lightgrey', textAlign = 'left', textBaseline = 'top' } = style;

      contextRef.current.beginPath();
      contextRef.current.font = fontSize + 'px ' + fontFamily;
      contextRef.current.textAlign = textAlign;
      contextRef.current.textBaseline = textBaseline;
      contextRef.current.fillStyle = color;
      contextRef.current.fillText(text, x, y);
      contextRef.current.stroke();
    }


    const startDrawing = ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setIsDrawing(true);
      nativeEvent.preventDefault();
    };

    const draw = ({ nativeEvent }) => {
      if (!isDrawing) {
        return;
      }
  
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      nativeEvent.preventDefault();
    };
  
    const stopDrawing = () => {
      contextRef.current.closePath();
      setIsDrawing(false);
    };
  
    const setToDraw = () => {
      contextRef.current.globalCompositeOperation = "source-over";
    };
  
    const setToErase = () => {
      contextRef.current.globalCompositeOperation = "destination-out";
    };
    const setToClear = () => {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      writeText({ text: 'ا    ب    ت    ث    ح', x: 180, y: 70 });
      writeText({ text: 'ا    ب    ت    ث    ح', x: 180, y: 130 });
  
      var w = canvas.width;
      canvas.width = 1;
      canvas.width = w;
      // context.lineWidth = 5;
    };


  return (
    <div>
      <canvas ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ width: '100%', height: '25vw', border: '1px black solid' }}/>
        <hr/>
        <IconButton color="secondary" aria-label="upload picture" component="label" onClick={setToDraw}>
          <CreateIcon/>
        </IconButton>
        <IconButton color="secondary" aria-label="upload picture" component="label" onClick={setToClear}>
          <AutoFixNormalIcon/>
        </IconButton>
    </div>
    
  )
}


class DragDropActivity extends React.Component {

  state = this.props.dnd_data;
  

  

  
  // draggable_comps = this.props.dnd_data.pop();

  // handling drag ends

  handleDragEnd = result => {
    const {destination, source, draggableId} = result;
    
    if(!destination){
      return;
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    const start = this.state.columns[source.droppableId];
    const end = this.state.columns[destination.droppableId];

    

    if(start === end){

      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
  
      const newState = {
        ...this.state,
        columns:{
          ...this.state.columns,
          [newColumn.id] : newColumn
        }
      }
  
      this.setState(newState);
      return;
    }

  
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(end.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...end,
      taskIds: endTaskIds
    };

    const newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    this.setState(newState);

  }

  render(){
    console.log("COlumn popped:"+this.draggable_comp_column);
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Container style={{ display: 'flex' }}>
        <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 8, md: 6 }} sx={{ marginTop: '5%' }}>
          {
            <Grid xs={12}>
              <Droppable droppableId={this.draggable_comp_column}>
                {provided => (
                  <List provided={provided} innerRef={provided.innerRef} name={this.state.columns[this.draggable_comp_column].name}>
                    {this.state.columns[this.draggable_comp_column].tasks.map((task,key)=>{
                      return <Draggable draggableId={task.id} index={key} key={task.id}>
                        {(provided, snapshot) => (
                          <Person provided={provided} snapshot={snapshot} innerRef={provided.innerRef} task_content={task.content}/>
                        )}
                      </Draggable>
                    })}
    
                    {provided.placeholder}
                  </List>
                  )}
              </Droppable>
            </Grid>
          }
        
            {
              this.state.columnOrder.map((columnid)=>{
                const column = this.state.columns[columnid];
                const tasks = column.taskIds.map((taskid)=>{
                  return this.state.tasks[taskid];
                });
  
                return (<Grid xs={4}><Droppable droppableId={columnid}>
                  {provided => (
                    <List provided={provided} innerRef={provided.innerRef} name={column.name}>
                      {tasks.map((task,key)=>{
                        return <Draggable draggableId={task.id} index={key} key={task.id}>
                          {(provided, snapshot) => (
                            <Person provided={provided} snapshot={snapshot} innerRef={provided.innerRef} task_content={task.content}/>
                          )}
                        </Draggable>
                      })}

                      {provided.placeholder}
                    </List>
                  )}
                </Droppable></Grid>)})
            }
            
        </Grid>
        </Container>
        
      </DragDropContext>
    )
  }
}




export default LetterActivity