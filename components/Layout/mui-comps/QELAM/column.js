import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Card, CardContent } from '@mui/material'


class List extends React.Component {
    render() {
      const { provided, innerRef, children } = this.props;
      return (
        <div {...provided.droppableProps} ref={innerRef}>
          <Card style={{ width: '70%', padding: '2%', height: '30%' }}>
            <CardContent>
                <h3>{this.props.name}</h3>
                {children}
            </CardContent>
          </Card>
        </div>
      );
    }
  }

export default List

