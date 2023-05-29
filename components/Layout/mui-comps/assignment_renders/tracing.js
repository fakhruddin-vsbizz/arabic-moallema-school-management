import React, { useRef, useEffect, useState } from 'react'
import { Card, CardContent, Grid, Chip } from '@mui/material'

const TracingActivity = () => {


    const canvas = useRef();
    let ctx = null;
    var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",y = 2;

    
    

    const [isDrawing, setIsDrawing] = useState(false)
   
    // initialize the canvas context
    useEffect(() => {
        // const canvas = canvasRef.current;
        // canvas.width = canvas.clientWidth;
        // canvas.height = canvas.clientheight;

        // const context = canvas.getContext("2d");
        // contextRef.current = context;
      // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;

        // get context of the canvas
        ctx = canvasEle.getContext("2d");
        ctx.current = ctx;
    }, []);
   
    useEffect(() => {
        writeText({ text: 'ا    ب    ت    ث    ح', x: 180, y: 70 });
        writeText({ text: 'ا    ب    ت    ث    ح', x: 180, y: 130 });
    }, []);
   
    // write a text
    const writeText = (info, style = {}) => {
        const { text, x, y } = info;
        const { fontSize = 50, fontFamily = 'IBM Plex Sans Arabic', color = 'lightgrey', textAlign = 'left', textBaseline = 'top' } = style;

        ctx.beginPath();
        ctx.font = fontSize + 'px ' + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.stroke();
    }

    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }


    const findxy = (res, e) => {
        if (res === 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res === 'up' || res === "out") {
            flag = false;
        }
        if (res === 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }

    

    // const startDrawing = ({nativeEvent}) => {
    //     console.log("startDrawing");
    //     console.log(nativeEvent);
    //     const {offsetX, offsetY} = nativeEvent;
    //     contextRef.current.beginPath();
    //     contextRef.current.moveTo(offsetX,offsetY);
    //     setIsDrawing(true);
    // }

    // const finishDrawing = () => {
    //     console.log("finish Drawing");
    //     contextRef.current.closePath();
    //     setIsDrawing(false);

    // }

    // const draw = ({nativeEvent}) => {
    //     console.log("draw");
    //     console.log(nativeEvent);
    //     if(!isDrawing){
    //         return;
    //     }
    //     const {offsetX, offsetY} = nativeEvent;
    //     contextRef.current.lineTo(offsetX,offsetY);
    //     contextRef.current.stroke();
    // }

    return (
        <div>
            <Card sx={{ marginTop: '5%', width: '70%', height:'20vw', fontFamily: 'Ubuntu Mono', textAlign: 'left' }}>
                <CardContent>
                    <label>Trace the following words into the canvas:</label>
                    <br/>
                    <br/>
                    <canvas ref={canvas} style={{ width: '100%', height: '25vw', border: '1px black solid' }}
                    onMouseDown={(res="down", e)=>findxy(res, e)} onMouseMove={(res="move", e)=>findxy(res, e)} onMouseUp={(res="up", e)=>findxy(res, e)} onMouseOut={(res="out", e)=>findxy(res, e)}/>
                    {/* <canvas style={{ width: '100%', height: '25vw', border: '1px black solid' }} id={"trace_canvas"} ref={canvas} onMouseUp={startDrawing} onMouseDown={finishDrawing} onMouseMove={draw}></canvas>  */}
                </CardContent>
            </Card>
        </div>
    )
}

export default TracingActivity