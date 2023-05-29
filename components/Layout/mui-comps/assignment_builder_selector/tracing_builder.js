import {
  CardContent,
  Card,
  Typography,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import TextFieldCard from "@/components/Layout/card/TextFieldCard";

const TracingBuilder = (props) => {
  const [traceLetter, setTraceLetter] = useState({});

  const addTraceWords = (event, asg_index, iter_index) => {
    let id = "a" + asg_index + "_tr" + iter_index;

    let obj = traceLetter;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_trace"]: traceLetter,
    };
    props.setTracingLetters(parent_obj);
  };

  const [renderIter, setRenderIter] = useState([1]);

  function addNewOption() {
    if (renderIter.length < 6) {
      let concated_new_iterator = renderIter.concat([renderIter.length + 1]);
      setRenderIter(concated_new_iterator);
    }
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
    <>
      <h1 className="mt-10 px-5 pb-3 border-b-2 text-xl">Task: Tracing </h1>
      <div className=" p-5 rounded-md ">
        <h1 className="font-normal">
          Enter the words that can be traced by the students
        </h1>
        <div className="grid grid-cols-6 gap-8 p-5">
          {renderIter.map((val, key) => {
            return (
              <>
                <div className="col-span-2 ">
                  <MUICard
                    addNewOption={addNewOption}
                    deleteSelectedOption={deleteSelectedOption}
                    iteratorIndex={key}
                    activity_index={props.incrementer}
                    valueSetter={addTraceWords}
                  />
                </div>
              </>
            );
          })}

          {/* <div className="col-span-2">
            <TextFieldCard />
          </div> */}
        </div>
      </div>
    </>
  );
};

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
              <IconButton
                aria-label="add new option"
                onClick={props.addNewOption}
                color="success"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
            <div className="">
              <IconButton
                aria-label="delete"
                onClick={() =>
                  props.deleteSelectedOption(
                    props.iteratorIndex,
                    props.activity_index
                  )
                }
                className="text-red-500"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </Stack>
      </Card>
    </div>
  );
};

export default TracingBuilder;
