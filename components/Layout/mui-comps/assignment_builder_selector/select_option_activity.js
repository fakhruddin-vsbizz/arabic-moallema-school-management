import {
  CardContent,
  Card,
  Typography,
  TextField,
  IconButton,
  Grid,
  Button,
} from "@mui/material";

import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

const SelectOption = (props) => {
  const [selectLetters, setSelectedLetters] = useState({});

  const addTraceWords = (event, asg_index, iter_index) => {
    let id = "a" + asg_index + "_sl" + iter_index;

    let obj = selectLetters;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_select"]: selectLetters,
    };
    props.setSelectedLetters(parent_obj);
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

  //audio upload
  const [audioUrl, setAudioUrl] = useState("");
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_uploads");
    formData.append("cloud_name", "dbqeq2yxq");
    formData.append("resource_type", "auto");

    fetch("https://api.cloudinary.com/v1_1/dbqeq2yxq/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAudioUrl(data.secure_url);
        props.setAudioForSelectActivity(data.secure_url);
        console.log(data.secure_url);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <h1 className="mt-10 px-5 pb-3 border-b-2 text-xl">
        Task: Select Option{" "}
      </h1>
      <div className=" p-5 rounded-md ">
        <div>
          <h1 className="font-normal">Uplod the audio file</h1>
          <input
            className=" my-8 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
          />
          {audioUrl && <audio className="mb-4" src={audioUrl} controls />}
        </div>
        <h1 className="font-normal">
          Enter the question for the word that can be selected by the students
        </h1>
        <input
          onChange={(e) => props.setquestionForSelectActivity(e.target.value)}
          type="text"
          className=" mt-8 rounded-lg w-96"
          placeholder="Enter the question"
        />
        <h1 className="font-normal mt-8">
          Enter the words that can be selected by the students
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

export default SelectOption;
