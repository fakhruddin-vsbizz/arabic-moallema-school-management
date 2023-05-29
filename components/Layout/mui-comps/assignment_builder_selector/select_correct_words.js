import {
  CardContent,
  Card,
  Typography,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";

import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

const SelectCorrectWords = (props) => {
  const [matchLetters, setMatchLettersLeft] = useState({});

  const studentOneWord = (event, asg_index, iter_index) => {
    let id = "a" + asg_index + "_stu1" + iter_index;

    let obj = matchLetters;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_test_knowledge"]: matchLetters,
    };
    props.setLetterStudentOne(parent_obj);
  };
  const studentwoWord = (event, asg_index, iter_index) => {
    let id = "a" + asg_index + "_stu2" + iter_index;

    let obj = matchLetters;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_test_knowledge"]: matchLetters,
    };
    props.setLetterStudentTwo(parent_obj);
  };

  const studentThreeWord = (event, asg_index, iter_index) => {
    let id = "a" + asg_index + "_stu3" + iter_index;

    let obj = matchLetters;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_test_knowledge"]: matchLetters,
    };
    props.setLetterStudentThree(parent_obj);
  };

  const studentFourWord = (event, asg_index, iter_index) => {
    let id = "a" + asg_index + "_stu4" + iter_index;

    let obj = matchLetters;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_test_knowledge"]: matchLetters,
    };
    props.setLetterStudentFour(parent_obj);
  };

  const studentFiveWord = (event, asg_index, iter_index) => {
    let id = "a" + asg_index + "_stu5" + iter_index;

    let obj = matchLetters;
    obj[id] = event.target.value;
    let parent_obj = {
      [asg_index + "_test_knowledge"]: matchLetters,
    };
    props.setLetterStudentFive(parent_obj);
  };

  const [renderIter, setRenderIter] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      <h1 className="mt-10 px-5 pb-3 border-b-2 text-xl">Task: Select Words</h1>

      <div className=" p-5 rounded-md ">
        <h1 className="font-normal mt-8">Student 1</h1>
        <div className="grid grid-cols-10 gap-8 p-5">
          {renderIter.map((val, key) => {
            return (
              <>
                <div className="col-span-2 ">
                  <MUICard
                    iteratorIndex={key}
                    activity_index={props.incrementer}
                    valueSetter={studentOneWord}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className=" p-5 rounded-md ">
        <h1 className="font-normal mt-8">Student 2</h1>
        <div className="grid grid-cols-10 gap-4 p-5">
          {renderIter.map((val, key) => {
            return (
              <>
                <div className="col-span-2 ">
                  <MUICard
                    iteratorIndex={key}
                    activity_index={props.incrementer}
                    valueSetter={studentwoWord}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className=" p-5 rounded-md ">
        <h1 className="font-normal mt-8">Student 3</h1>
        <div className="grid grid-cols-10 gap-4 p-5">
          {renderIter.map((val, key) => {
            return (
              <>
                <div className="col-span-2 ">
                  <MUICard
                    iteratorIndex={key}
                    activity_index={props.incrementer}
                    valueSetter={studentThreeWord}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className=" p-5 rounded-md ">
        <h1 className="font-normal mt-8">Student 4</h1>
        <div className="grid grid-cols-10 gap-4 p-5">
          {renderIter.map((val, key) => {
            return (
              <>
                <div className="col-span-2 ">
                  <MUICard
                    iteratorIndex={key}
                    activity_index={props.incrementer}
                    valueSetter={studentFourWord}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className=" p-5 rounded-md ">
        <h1 className="font-normal mt-8">Student 5</h1>
        <div className="grid grid-cols-10 gap-4 p-5">
          {renderIter.map((val, key) => {
            return (
              <>
                <div className="col-span-2 ">
                  <MUICard
                    iteratorIndex={key}
                    activity_index={props.incrementer}
                    valueSetter={studentFiveWord}
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
        className="p-2 w-fit hover:bg-dark-purple   text-dark-purple text-bold place-content-center text-center shadow-lg"
      >
        <CardContent className="text-bold  ">
          <Typography sx={{ fontSize: 14 }} gutterBottom></Typography>
          <input
            className="w-44 h-24 text-center text-4xl border-b-2 rounded-md "
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
        <Stack direction="" className="mr-auto" spacing={1}></Stack>
      </Card>
    </div>
  );
};

export default SelectCorrectWords;
