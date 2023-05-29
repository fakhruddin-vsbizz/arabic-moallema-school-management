import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import MultipleSelectChip from "@/components/Layout/elements/MultiChipSelector";
import InputWithLable from "@/components/Layout/elements/InputWithLable";
import { Button, Box, Modal } from "@mui/material";
import RemoveUser from "@/components/Modules/batches/RemoveUser";
import {
  addStudentTeacherToDB,
  createStudentTeacher,
} from "@/backend/CreateUser/CreateStudentTeacherDB";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { updateStudentDetail } from "@/backend/Students/StudentDB";
import {
  updateTeacherDetail,
  updateTeacherEmail,
} from "@/backend/Teachers/TeacherDB";
import BatchContext from "@/components/Context/store/batch-context";
import Spinner from "@/components/Layout/spinner/Spinner";
import supabase from "@/supabaseClient";
import supabaseAdmin from "@/backend/DeleteUser/SupabaseAdmin";
import { updateTeacherEmailFromAuth } from "@/backend/Teachers/UpdateTeacherEmail";
import ValidationCard from "@/components/Layout/card/ValidationCard";

// const names = ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddUser({
  link,
  user,
  title,
  setOpen,
  action,
  userType,
  profileData,
  batchesData,
  setErrorProfile,
  errorProfile,
}) {
  const theme = useTheme();

  //inputFields
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");

  const [teacherId, setTeacherId] = React.useState("");

  //validation states
  const [error, setError] = React.useState(false);
  const [validateError, setvalidateError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [contactError, setContactError] = React.useState(false);
  const [editEmailError, setEditEmailError] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const batchCtx = React.useContext(BatchContext);

  let isEdit;

  const showChip = () => {
    if (action == "edit") {
      isEdit = true;
    }
  };
  showChip();

  user = user.charAt(0).toUpperCase() + user.slice(1);

  React.useEffect(() => {
    if (userType === "showTeacher") {
      if (profileData && batchesData) {
        setName(profileData[0].name);
        setContact(profileData[0].contact);
        setEmail(profileData[0].email);
        setNewEmail(profileData[0].email);
        setTeacherId(profileData[0].teacher_id);
      }
    }
  }, [profileData, batchesData]);

  const addTeacherHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log("adding teacher");

    if (name === "" || email === "" || contact === "") {
      setvalidateError(true);
      return;
    }

    console.log(contact.length);
    if (contact.length !== 10) {
      console.log("in");
      setContactError(true);
      setEmailError(false);
      setvalidateError(false);

      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setvalidateError(false);
      setContactError(false);

      return;
    }

    if (name && contact && emailRegex.test(email) && contact.length === 10) {
      const password = uuidv4() + "@123AM"; // Generate a unique password for each user

      const data = await createStudentTeacher(email, password, "instructor");

      if (!data) {
        setError(true);
        setEmailError(false);
        setvalidateError(false);
        // throw new Error(`Error creating user ${email}: ${error.message}`);
        return;
      }

      if (data) {
        setIsLoading(true);
        setError(false);
        setEmailError(false);
        setContactError(false);
        setvalidateError(false);
      }
      await axios
        .post("/api/send-email", {
          email,
          password,
          userPath: "instructor",
          name,
          contact,
        })
        .then((res) => {
          console.log("res: ", res);

          const getData = async () => {
            let finalUser = "teacher";
            let typeUser = "instructor";

            const dataUser = await addStudentTeacherToDB(
              finalUser,
              email,
              name,
              contact,
              typeUser
            );

            console.log("final data: ", dataUser);

            setvalidateError(false);
            setEmailError(false);
            setError(false);
            setContactError(false);
          };
          getData();
        })
        .catch((err) => console.log("error: ", err));

      console.log(`User ${data.email} created successfully`);
      setIsLoading(false);
      setOpen(false);
      batchCtx.setSubmittedHandler(true);
    } else {
      setIsLoading(false);
      setvalidateError(true);
      console.log("Please fill in all fields");
    }
  };

  const editTeachersDetail = async (e) => {
    e.preventDefault();
    console.log("update Teacher Detail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || contact === "") {
      console.log("ind");
      setErrorProfile(true);
      return;
    }
    if (contact.length !== 10) {
      console.log("in");
      setErrorProfile(true);

      return;
    }
    if (!emailRegex.test(email)) {
      setErrorProfile(true);
      return;
    }

    if (name && contact && teacherId && contact.length === 10) {
      updateTeacherDetail(email, name, contact, teacherId);
      batchCtx.setSubmittedHandler(true);
      setErrorProfile(false);
    }
  };

  const EditEmailHandler = async (e) => {
    e.preventDefault();
    console.log("update Teacher Email");
    console.log(teacherId);

    console.log(email);
    console.log(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newEmail === "") {
      setEditEmailError(true);
      return;
    }

    if (!emailRegex.test(newEmail)) {
      setEditEmailError(true);
      return;
    }

    if (newEmail) {
      updateTeacherEmail(newEmail, teacherId);
      setEditEmailError(false);
    }

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    const userList = data.users;

    const updateUser = userList.filter((user) => user.email === email);

    const userId = updateUser[0].id;

    if (userId && newEmail) {
      updateTeacherEmailFromAuth(userId, newEmail);
      setEditEmailError(false);
    }

    if (email && newEmail) {
      await axios
        .post("/api/update-email", {
          newEmail,
          email,
          user: "teacher",
        })
        .then((res) => console.log("res: ", res))
        .catch((err) => console.log("error: ", err));

      // setIsLoading(false);
      // setOpen(false);
      // batchCtx.setSubmittedHandler(true);
    } else {
      // setIsLoading(false);
      console.log("Please fill in all fields");
    }

    if (email && newEmail) {
      await axios
        .post("/api/updated-email-message", {
          newEmail,
          email,
          user: "teacher",
        })
        .then((res) => console.log("res: ", res))
        .catch((err) => console.log("error: ", err));

      // setIsLoading(false);
      // setOpen(false);
      // batchCtx.setSubmittedHandler(true);
    } else {
      // setIsLoading(false);
      console.log("Please fill in all fields");
    }

    window.location.href = `/admin/teachers/teacherprofile/${newEmail}`;
  };

  return (
    <div className=" p-5 rounded-md bg-white  pl-2">
      {!error &&
        !validateError &&
        !emailError &&
        !contactError &&
        isLoading && <Spinner title="Adding Teacher" />}

      {error && (
        <div>
          <ValidationCard
            message="Email Address Already Exists!"
            title="Warning"
          />
        </div>
      )}
      {validateError && (
        <ValidationCard
          message="All Fields should be filled!"
          title="Warning"
        />
      )}
      {emailError && (
        <ValidationCard
          message="Please Enter a correct email address"
          title="Warning"
        />
      )}
      {contactError && (
        <ValidationCard
          message="Please Enter a correct contact"
          title="Warning"
        />
      )}
      <h1 className="text-2xl pl-2 pb-2">{title || user + " Details"}</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        className=" border-t-2 border-gray-300 mt-1"
      >
        <InputWithLable
          value={name}
          defaultValue={name}
          setValue={setName}
          lable="Name"
          id="name"
          type="text"
        />
        <InputWithLable
          value={contact}
          defaultValue={contact}
          setValue={setContact}
          lable="Contact"
          id="contact"
          type="number"
        />
        {userType !== "showTeacher" && (
          <InputWithLable
            value={email}
            defaultValue={email}
            setValue={setEmail}
            lable="Email"
            id="email"
            type="email"
          />
        )}
      </Box>

      {!isEdit && userType !== "addTeacher" && (
        <div className="m-0 p-0 w-full">
          {batchesData && <MultipleSelectChip batchesData={batchesData} />}
        </div>
      )}

      <div className="items-center  py-3 text-right mt-2">
        <Button
          onClick={
            userType === "showTeacher" ? editTeachersDetail : addTeacherHandler
          }
          variant="contained"
          className="w-full bg-dark-purple my-3 mx-2"
          disableElevation
        >
          {title || "Edit " + user + " Details"}
        </Button>
      </div>

      {isEdit && (
        <div className="m-0 p-0 w-full">
          {batchesData && <MultipleSelectChip batchesData={batchesData} />}
          <div></div>
          <Button
            variant="contained"
            className="w-full bg-dark-purple my-3 mx-2"
            disableElevation
          >
            Edit Batch
          </Button>
        </div>
      )}

      {isEdit && userType !== "addTeacher" && (
        <div className=" mt-5 p-5 rounded-md bg-white  pl-2">
          {isLoading && <Spinner title="Adding Student" />}
          <h1 className="text-2xl pl-2 pb-2">Change Email Address</h1>
          {editEmailError && (
            <ValidationCard
              message="Please Enter a correct Email "
              title="Warning"
            />
          )}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            className=" border-t-2 border-gray-300 mt-1"
          >
            <InputWithLable
              value={newEmail}
              defaultValue={newEmail}
              setValue={setNewEmail}
              lable="Email"
              id="email"
              type="email"
            />
          </Box>

          <div className="items-center  py-3 text-right mt-2">
            <Button
              onClick={EditEmailHandler}
              variant="contained"
              className="w-full bg-dark-purple my-3 mx-2"
              disableElevation
            >
              Edit Email
            </Button>
          </div>
        </div>
      )}

      {/* {isEdit && userType !== "addTeacher" && (
        <div className=" mt-5 p-5 rounded-md bg-white  pl-2">
          {isLoading && <Spinner title="Adding Student" />}
          <h1 className="text-2xl pl-2 pb-2">Change Email Address 4</h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            className=" border-t-2 border-gray-300 mt-1"
          >
            <InputWithLable
              value={email}
              defaultValue={email}
              setValue={setEmail}
              lable="Email"
              id="email"
              type="email"
            />
          </Box>

          <div className="items-center  py-3 text-right mt-2">
            <Button
              // onClick={
              //   userType === "EditStudent" ? editStudentDetail : addStudentHandler
              // }
              variant="contained"
              className="w-full bg-dark-purple my-3 mx-2"
              disableElevation
            >
              Edit Email
            </Button>
          </div>
        </div>
      )} */}

      <Modal
        // open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RemoveUser
            user="Batch 1"
            isReplace={false}
            type="Batch"
            action="Remove"
          />
        </Box>
      </Modal>
    </div>
  );
}
