import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "@/components/Context/store/auth-context";
import {
  fetchTeachersData,
  fetchTeachersIdBasedOnEmail,
} from "@/backend/Teachers/TeacherDB";
import { postCreateBatch } from "@/backend/Batches/BatchesDB";
import BatchContext from "@/components/Context/store/batch-context";
import Spinner from "@/components/Layout/spinner/Spinner";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BatchEdit = ({ actionBtn, link, setOpen }) => {
  const [error, setError] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTeacher, setSelecteTeacher] = useState();
  const [teacherId, setTeacherId] = useState();

  const [submitted, setSubmitted] = useState(false);
  const batchCtx = useContext(BatchContext);
  const [isLoading, setIsLoading] = useState(false);

  //handle input fields data
  const nameRef = useRef();
  const typeRef = useRef();
  const timeRef = useRef();
  const dateRef = useRef();
  const gmeetLink = useRef();

  //getting the data of teacher
  React.useEffect(() => {
    const fetchTeacherId = async () => {
      const data = await fetchTeachersIdBasedOnEmail(selectedTeacher);
      console.log(data);
      if (data && data[0]) {
        console.log("in");
        setTeacherId(data[0].teacher_id);
      }
    };
    fetchTeacherId();
  }, [selectedTeacher]);

  //filtering the bathches data
  // const detail = batchDetail.filter((batch) => batch.batch_name === batchName);

  console.log(teacherId);

  //convert time formate
  function convertTimeTo12HourFormat(time) {
    let [hours, minutes] = time.split(":");
    let hours12 = (hours % 12 || 12).toString();
    hours12 = hours12.padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    return `${hours12}:${minutes} ${ampm}`;
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  //handle selected days
  const handleChange = (event) => {
    const day = event.target.value;
    if (event.target.checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    }
  };

  const authCtx = useContext(AuthContext);
  let options = authCtx.teachersList;

  //getting the teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await fetchTeachersData();
      authCtx.setTeachersData(data);
    };
    fetchTeachers();
  }, []);

  const onBatchCreateHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //getting the values
    const enteredBatchName = nameRef.current.value;
    const enteredType = typeRef.current.value;
    const time = timeRef.current.value;
    const date = dateRef.current.value;
    const glink = gmeetLink.current.value;

    console.log(time);

    const obj = {
      days: selectedDays,
      time: time,
      startDate: date,
      batchName: enteredBatchName,
    };

    let finalTeacherId;
    if (teacherId) {
      finalTeacherId = teacherId;
    }

    console.log(obj);
    console.log(finalTeacherId);

    const data1 = await postCreateBatch(
      enteredBatchName,
      finalTeacherId,
      enteredType,
      obj,
      glink
    );

    if (data1) {
      console.log("in");
      setError(false);
      nameRef.current.value = "";
      timeRef.current.value = "";
      dateRef.current.value = "";
      dateRef.current.value = "";
      setSelectedDays([]);
      setOpen(false);
      setIsLoading(false);
      batchCtx.setSubmittedHandler(true);
    } else {
      console.log("else");
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onBatchCreateHandler}>
      {isLoading && <Spinner title="Creating batch" />}

      <div className="overflow-hidden ">
        <div className="">
          <h1 className="text-2xl mt-0 text-dark-purple text-center pb-5">
            {actionBtn}
          </h1>
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6 ">
              <div className="col-span-6">
                <div className="grid grid-cols-8 gap-3">
                  <div className="col-span-8 sm:col-span-4">
                    <label
                      htmlFor="batch-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Batch name
                    </label>
                    <input
                      type="text"
                      name="batch-name"
                      id="first-name"
                      ref={nameRef}
                      autoComplete="given-name"
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {error && (
                      <p className=" text-red-500 mt-2">Batch already exists</p>
                    )}
                  </div>
                  <div className="col-span-8 sm:col-span-4">
                    <label
                      htmlFor="Teacher"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Type
                    </label>
                    <select
                      id="Teacher"
                      name="Teacher"
                      ref={typeRef}
                      autoComplete="teacher-name"
                      required
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Adult</option>
                      <option>Kid</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <div className="grid grid-cols-6 gap-3">
                  <div className="col-span-9 sm:col-span-3">
                    <label
                      htmlFor="Type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Teacher
                    </label>

                    <select
                      value={selectedTeacher}
                      onChange={(e) => setSelecteTeacher(e.target.value)}
                      required
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      {options &&
                        options.map((option) => (
                          <option key={option.id} value={option.email}>
                            {option.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-span-9 sm:col-span-3">
                    <label
                      htmlFor="gmeet"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Add Google Meet
                    </label>
                    <input
                      ref={gmeetLink}
                      type="text"
                      name="gmeet"
                      required
                      placeholder="Class Link"
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <div className="grid grid-cols-8 gap-3">
                  <div className="col-span-8 sm:col-span-4">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700"
                    >
                      At what time of day?
                    </label>
                    <input
                      type="time"
                      min="07:00"
                      max="20:00"
                      name="time"
                      id="time"
                      ref={timeRef}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-8 sm:col-span-4">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Starting Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      min={getCurrentDate()}
                      ref={dateRef}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 daily-on">
                <h4 className="my-2">Weekly on.</h4>
                <div className="grid grid-cols-8 gap-3 sm:grid-cols-7 lg:gap-5">
                  {days.map((day) => (
                    <div className="col-span-2 pb-3 pl-1 border-2 border-gray-300 rounded-md shadow-sm appearance-none cursor-pointer sm:col-span-1">
                      <input
                        type="checkbox"
                        id={day}
                        value={day}
                        name={day}
                        onChange={handleChange}
                        checked={selectedDays.includes(day)}
                        className="block mt-1 border-solid rounded-full appearance-none day-card focus:outline-none after:border-none focus:border-none sm:text-sm"
                      />
                      <label
                        htmlFor={day}
                        className="block text-sm font-medium text-center text-gray-700 cursor-pointer"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>

      <div className="items-center  py-3 text-right mt-5">
        <button
          variant="contained"
          className=" w-full bg-dark-purple text-white p-2 "
        >
          {actionBtn}
        </button>
      </div>
    </form>
  );
};

export default BatchEdit;
