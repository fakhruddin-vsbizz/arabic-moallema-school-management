import AuthContext from "@/components/Context/store/auth-context";
import supabase from "@/supabaseClient";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { PhotoCamera } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import Link from "next/link";
import colorBgImg from "@/components/src/img/colorBgImg.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackButton from "@/components/Layout/elements/BackButton";

const DrawingCanvas = (props) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  // const [statusData, setStatusData] = useState("");

  const authCtx = useContext(AuthContext);
  const id = authCtx.userEmail;

  const [isDrawing, setIsDrawing] = useState(false);
  const [image, setImage] = useState(false);
  console.log(image);

  //****************canvas Logic******************* */

  let canvas = canvasRef.current;
  // var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  // var width = (window.innerWidth * 3) / 5;

  let context;
  if (canvas) {
    context = canvas.getContext("2d");
  }
  useEffect(() => {
    canvas = canvasRef.current;
    canvas.width = 1200;
    canvas.height = 540;

    context = canvas.getContext("2d");
    context.lineCap = "round";

    context.lineWidth = 5;
    contextRef.current = context;
  }, [id]);
  if (context) {
    context.strokeStyle = "black";
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

    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
    context.lineWidth = 5;
  };

  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
    setImage(event.currentTarget.href);

    console.log(id);

    if (id) {
      supabase
        .from("assignments")
        .insert({
          assignment_name: "letterPractice",
          student_id: id,
          batch_id: "Batch 1",
          submission: image,
          status: "submitted",
        })
        .then((data) => console.log(data))
        .catch((er) => console.log(er));
    }
  };

  // const canvasBg = props.bgImg;
  // console.log("CanVas", canvasBg);

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${colorBgImg.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100%",
        backgroundPosition: "center top",
        widows: "100vw",
        minHeight: "100vh",
      }}
    >
      {" "}
      <div className=" w-full p-5 rounded-md  flex flex-row justify-between   pt-10">
        <div className="">
          <h1 className="mx-5 text-white text-lg">
            <span className="mx-2 p-1 bg-white rounded-full">
              <BackButton />
            </span>
            Whiteboard
          </h1>
        </div>
        {/* <Link href="" className="mx-5">
          <Button
            variant="contained"
            className="bg-white text-dark-purple"
            startIcon={<ArrowBackIcon />}
          >
            Back To Main Module
          </Button>
        </Link> */}
        {/* <div className="mx-5 p-2 bg-white rounded-md">

        <BackButton/> <span className="text-dark-purple">Back</span>
        </div> */}
      </div>
      <div className="w-full cursor-cell flex justify-center mt-5 ">
        <canvas
          className="bg-white border-2 rounded-lg shadow-lg border-1"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
      </div>
      <div className="mt-8 flex justify-center">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={setToDraw}
            className="bg-dark-purple"
            startIcon={<EditIcon />}
          >
            Draw
          </Button>
          <Button
            onClick={setToErase}
            className="bg-dark-purple"
            startIcon={<CleaningServicesIcon />}
          >
            Erase
          </Button>
          <Button
            onClick={setToClear}
            className="bg-dark-purple"
            startIcon={<DeleteForeverIcon />}
          >
            Clear
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default DrawingCanvas;
