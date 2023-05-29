import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Paper } from '@mui/material'



class Person extends React.Component {

    isDragging = (event, result) => {
        if(result.isDragging){
            event.target.style.backgroundColor = 'lightblue';
        }
        
    }

    render() {
      const { provided, snapshot, innerRef } = this.props;
      return (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={innerRef}
        >
          <Paper variant='outlined' style={{ padding: '2%', width: '50%', backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white' }}>
            {this.props.task_content}
          </Paper>
        </div>
      );
    }
  }
export default Person