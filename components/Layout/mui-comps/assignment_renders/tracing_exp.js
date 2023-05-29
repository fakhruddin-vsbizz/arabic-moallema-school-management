import React, { useRef, useEffect, useState } from 'react'
import { Card, CardContent, Grid, Chip, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';


const TracingActivity = () => {


    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    let canvas = canvasRef.current;

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

        writeText({ text: 'ا    ب    ت    ث    ح', x: 180, y: 70 });
        writeText({ text: 'ا    ب    ت    ث    ح', x: 180, y: 130 });


      }, []);


      const writeText = (info, style = {}) => {
        const { text, x, y } = info;
        const { fontSize = 50, fontFamily = 'IBM Plex Sans Arabic', color = 'lightgrey', textAlign = 'left', textBaseline = 'top' } = style;

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
            <Card sx={{ marginTop: '5%', width: '70%', height:'20vw', fontFamily: 'Ubuntu Mono', textAlign: 'left' }}>
                <CardContent>
                    <label>Trace the following words into the canvas:</label>
                    <br/>
                    <br/>
                    <canvas ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{ width: '100%', height: '25vw', border: '1px black solid' }}/>

                    

                    {/* <canvas style={{ width: '100%', height: '25vw', border: '1px black solid' }} id={"trace_canvas"} ref={canvas} onMouseUp={startDrawing} onMouseDown={finishDrawing} onMouseMove={draw}></canvas>  */}
                </CardContent>
            </Card>

            <IconButton color="secondary" aria-label="upload picture" component="label" onClick={setToDraw}>
                <CreateIcon/>
            </IconButton>
            <IconButton color="secondary" aria-label="upload picture" component="label" onClick={setToClear}>
                <AutoFixNormalIcon/>
            </IconButton>
            
        </div>
    )
}

export default TracingActivity