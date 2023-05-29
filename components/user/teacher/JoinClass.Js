import * as React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import InputWithLable from "@/components/Layout/elements/InputWithLable";
import AttandanceListStudent from "@/components/user/teacher/AttandanceList";
import { LinkOff } from "@mui/icons-material";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 560,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ClassDetais = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(props.user, "User");

  return (
    <div className="">
      <h1 className="p-5 border-b-2">Join Class</h1>
      <div className="w-full flex rounded-lg overflow-hidden shadow-lg  items-center justify-center bg-slate-50 ">
        {props.user !== "student" ? (
          <div className=" m-10 w-full pr-5 flex-auto ">
            <InputWithLable
              lable="G Meet"
              type="text"
              placeholder="https://meet.google.com/"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex-none mx-10 my-5 w-96">
          <div className="flex items-center justify-end ">
            <Link
              href="https://meet.google.com/"
              target="_blank"
              className="w-full"
            >
              <Button
                variant="contained"
                className=" w-full min-w-80 bg-dark-purple "
                onClick={handleOpen}
              >
                Join Class
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {props.user !== "student" ? (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="bg-white rounded-md ">
            <div className="my-2 grid grid-cols-2">
              <div className="text-start">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Attendance for class{" "}
                </Typography>
              </div>
              <div className="text-end">
                <Link href="/teacher/module" target="_blank">
                  <Button variant="contained" className="bg-dark-purple">
                    Start Module
                  </Button>
                </Link>
              </div>
            </div>
            <div className="my-5">
              <AttandanceListStudent />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-1">
                <Button
                  className="mt-5 w-full bg-yellow-600"
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                  endIcon={<RotateLeftIcon />}
                >
                  Mark in Progress
                </Button>
              </div>
              <div className="col-span-1">
                <Button
                  className="mt-5 w-full bg-green-700"
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                  endIcon={<CheckCircleIcon />}
                >
                  Mark as complete
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default ClassDetais;
