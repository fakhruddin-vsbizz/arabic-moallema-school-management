import React, { useState } from "react";
import {
  CardContent,
  Card,
  Typography,
  TextField,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFieldCard from "@/components/Layout/card/TextFieldCard";

const DragDropBuilder = (props) => {
  const [renderIter, setRenderIter] = useState([1]);
  const [bucketRenderIter, setBucketRenderIter] = useState([1]);

  const [bucketOptions, setBucketOptions] = useState({});
  const [dragOptions, setDragOptions] = useState({});

  const addDndBucketOptions = (event, asg_index, iter_index) => {
    let id = "dnd_a" + asg_index + "_tr" + iter_index;
    let obj = bucketOptions;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_dnd_bucket"]: bucketOptions,
    };
    props.setDndBucketLetters(parent_obj);
  };

  const addDndDragOptions = (event, asg_index, iter_index) => {
    let id = "dnd_a" + asg_index + "_tr" + iter_index;
    let obj = dragOptions;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_dnd_options"]: dragOptions,
    };
    props.setDndOptionsLetters(parent_obj);
  };

  function addNewOption(iter_obj, set_iter_hook) {
    let concated_new_iterator = iter_obj.concat([iter_obj.length + 1]);
    set_iter_hook(concated_new_iterator);
  }

  function deleteSelectedOption(key, iter_obj, set_iter_hook) {
    let updated_iterator = iter_obj.filter((val) => {
      console.log(key);
      return iter_obj.indexOf(val) !== key;
    });
    console.log(updated_iterator);
    set_iter_hook(updated_iterator);
  }

  return (
    <div>
      <h1 className="mt-10 px-5 pb-3 border-b-2 text-xl">
        Task: Drag and Drop{" "}
      </h1>
      <div className=" p-5 rounded-md ">
        <h1 className="font-normal">Enter the bucket list and below</h1>
        <div className="grid grid-cols-6 gap-8 p-5">
          {bucketRenderIter.map((val, key) => {
            return (
              <div className="col-span-2 ">
                <MUICard
                  addNewOption={addNewOption}
                  iteratorIndex={key}
                  iteratorObject={bucketRenderIter}
                  stateSetter={setBucketRenderIter}
                  deleteSelectedOption={deleteSelectedOption}
                  activity_index={props.incrementer}
                  // value={'abc'}
                  valueSetter={addDndBucketOptions}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className=" p-5 rounded-md ">
        <h1 className="font-normal">Enter the dragging words</h1>
        <div className="grid grid-cols-6 gap-8 p-5">
          {renderIter.map((val, key) => {
            return (
              <div className="col-span-2 ">
                <MUICard
                  addNewOption={addNewOption}
                  iteratorIndex={key}
                  iteratorObject={renderIter}
                  stateSetter={setRenderIter}
                  deleteSelectedOption={deleteSelectedOption}
                  activity_index={props.incrementer}
                  valueSetter={addDndDragOptions}
                />
              </div>
            );
          })}

          {/* <div className="col-span-2">
            <TextFieldCard />
          </div> */}
        </div>
      </div>
      <label>{/* <b>Task {props.incrementer + 1}</b> */}</label>
      <br />
    </div>
  );
};

const DDBucketOptionCard = (props) => {
  return (
    <Grid xs={4}>
      <center>
        <Card sx={{ width: "70%", height: "100%", padding: "2%" }}>
          <TextField
            id="standard-basic"
            variant="standard"
            sx={{ fontSize: 100 }}
            onChange={(
              e,
              asg_index = props.activity_index,
              iter_index = props.iteratorIndex
            ) => props.valueSetter(e, asg_index, iter_index)}
          />
          <br />
          <br />
          <center>
            <IconButton
              color="primary"
              aria-label="add new option"
              onClick={() =>
                props.addNewOption(props.iteratorObject, props.stateSetter)
              }
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() =>
                props.deleteSelectedOption(
                  props.iteratorIndex,
                  props.iteratorObject,
                  props.stateSetter
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </center>
        </Card>
      </center>
    </Grid>
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
                onClick={() =>
                  props.addNewOption(props.iteratorObject, props.stateSetter)
                }
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
                    props.iteratorObject,
                    props.stateSetter
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

const DDWordsOptionCard = (props) => {
  return (
    <Grid xs={4}>
      <center>
        <Card sx={{ width: "70%", height: "100%", padding: "2%" }}>
          <TextField
            id="standard-basic"
            variant="standard"
            sx={{ fontSize: 100 }}
            onChange={(
              e,
              asg_index = props.activity_index,
              iter_index = props.iteratorIndex
            ) => props.valueSetter(e, asg_index, iter_index)}
          />
          <br />
          <br />
          <center>
            <IconButton
              color="primary"
              aria-label="add new option"
              onClick={() =>
                props.addNewOption(props.iteratorObject, props.stateSetter)
              }
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() =>
                props.deleteSelectedOption(
                  props.iteratorIndex,
                  props.iteratorObject,
                  props.stateSetter
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </center>
        </Card>
      </center>
    </Grid>
  );
};

export default DragDropBuilder;
