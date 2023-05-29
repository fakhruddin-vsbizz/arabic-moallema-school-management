
import { CardContent, Card, Typography } from "@mui/material";
import React from "react";

export const Image = (props) => {
    return (
        <div>
            <img src={props.img_url} alt="Arabic Moallema logo" style={{ height: '30%', width: '40%' }}></img>
        </div>
    )
}


export const BasicCard = (props) => {

    return (
        <Card>
            <CardContent>
                
            </CardContent>
        </Card>
    );
}