import {
  fetchBatcheIdBasedOnBatchName,
  fetchEnrolledStudentsInBatch,
} from "@/backend/Batches/BatchesDB";
import { fetchTeacherBatches } from "@/backend/Batches/BatchesForTeachersStudentsDB";
import {
  addChatData,
  fetchChatHistoryBasedOnBatch,
} from "@/backend/ChatData/ChatDataForBatch";
import {
  fetchStudentIdBasedOnEmail,
  fetchStudentNameBasedOnEmail,
  fetchStudentsData,
} from "@/backend/Students/StudentDB";
import {
  fetchTeacherNameBasedOnEmail,
  fetchTeachersData,
  fetchTeachersIdBasedOnEmail,
} from "@/backend/Teachers/TeacherDB";
import AuthContext from "@/components/Context/store/auth-context";
import { Avatar, Button } from "@mui/material";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import grayBgImg from "@/components/src/img/grayBgImgM.png";

const Message = {
  author: "",
  message: "",
};

export default function ChatUI({ user }) {
  const [chosenUsername, setChosenUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [allBatches, setAllBatches] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [chatHistory, setChatHistory] = useState();

  const [batchId, setBatchId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [studentId, setStudentId] = useState();
  const [userName, setUserName] = useState();

  const authCtx = useContext(AuthContext);
  const email = authCtx.userEmail;

  useEffect(() => {
    const getChats = async () => {
      if (batchId) {
        const data = await fetchChatHistoryBasedOnBatch(batchId);
        if (data && data[0]) {
          setChatHistory(data);
          setMessages(data);
        }
      }
    };
    getChats();
  }, [batchId]);

  useEffect(() => {
    if (email) {
      setChosenUsername(email);
    }
  }, [email]);

  useEffect(() => {
    if (user === "teacher") {
      const getTeacherId = async () => {
        if (email) {
          const data = await fetchTeacherNameBasedOnEmail(email);
          if (data[0]) {
            setUserName(data[0].name);
          }
        }
      };
      getTeacherId();
    }
  }, [email]);

  useEffect(() => {
    if (user === "student") {
      const getTeacherId = async () => {
        if (email) {
          const data = await fetchStudentNameBasedOnEmail(email);
          if (data[0]) {
            setUserName(data[0].name);
          }
        }
      };
      getTeacherId();
    }
  }, [email]);

  useEffect(() => {
    if (user === "teacher") {
      const getTeacherId = async () => {
        if (email) {
          const data = await fetchTeachersIdBasedOnEmail(email);
          if (data[0]) {
            setTeacherId(data[0].teacher_id);
          }
        }
      };
      getTeacherId();
    }
  }, [email]);

  useEffect(() => {
    if (user === "teacher") {
      const teacherBatches = async () => {
        if (teacherId) {
          const data = await fetchTeacherBatches(teacherId);
          setAllBatches(data);
        }
      };
      teacherBatches();
    }
  }, [teacherId]);

  useEffect(() => {
    const getStudentsId = async () => {
      if (user === "student") {
        if (email) {
          const data = await fetchStudentIdBasedOnEmail(email);
          if (data[0]) {
            setStudentId(data[0].student_id);
          }
        }
      }
    };
    getStudentsId();
  }, [email]);

  //getting the bacthId
  useEffect(() => {
    const fetchBatchId = async () => {
      if (selectedBatch) {
        const data = await fetchBatcheIdBasedOnBatchName(selectedBatch);
        if (data && data[0]) {
          setBatchId(data[0].batch_id);
        }
      }
      if (user === "student") {
        let batch = localStorage.getItem("batchName");
        const data = await fetchBatcheIdBasedOnBatchName(batch);
        if (data && data[0]) {
          setBatchId(data[0].batch_id);
        }
      }
    };
    fetchBatchId();
  }, [selectedBatch]);

  useEffect(() => {
    socketInitializer();
  }, []);

  let socket = io();

  // Set the username for the socket after it's connected
  useEffect(() => {
    if (socket && chosenUsername) {
      socket.emit("setUsername", chosenUsername);
    }
  }, [socket, chosenUsername]);

  const sendMessage = async () => {
    if (message !== "" && message.trim().length !== 0) {
      if (user === "teacher") {
        const data = await addChatData(
          teacherId,
          batchId,
          message,
          email,
          userName
        );

        console.log(data[0]);

        if (message.trim() !== "" && chosenUsername) {
          // const newMessage = {
          //   user_id: teacherId,
          //   user_name: userName,
          //   user_email: email,
          //   batch_id: batchId,
          //   message: message,
          //   created_at: new Date(),
          // };

          // Emit the "createdMessage" event to the server
          socket.emit("createdMessage", data[0]);

          setMessage("");
        }
      }
      if (user === "student") {
        const data = await addChatData(
          studentId,
          batchId,
          message,
          email,
          userName
        );
        console.log(data);
        if (message.trim() !== "" && chosenUsername) {
          // const newMessage = {
          //   user_id: studentId,
          //   user_name: userName,
          //   user_email: email,
          //   batch_id: batchId,
          //   message: message,
          //   created_at: new Date(),
          // };
          // Emit the "createdMessage" event to the server
          socket.emit("createdMessage", data[0]);
          setMessage("");
        }
      }
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13 && message.trim() !== "") {
      sendMessage();
    }
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [...currentMsg, msg]);
    });
  };

  console.log("batchId: ", batchId);
  console.log(selectedBatch);
  console.log("teacherid: ", teacherId);
  console.log("student id: ", studentId);
  console.log("chat history : ", chatHistory);
  console.log("message : ", messages);
  console.log("name : ", userName);

  return (
    <div className="bg-dark-purple h-screen">
      <div className="flex items-center  mx-auto justify-center ">
        <div className="gap-4 flex flex-col items-center justify-center w-full ">
          <>
            <div
              className="flex flex-col  justify-end  min-w-[33%] rounded-md h-screen  shadow-md"
              style={{
                backgroundImage: `url(${grayBgImg.src})`,
                backgroundAttachment: "fixed",
                backgroundSize: "100%",
                backgroundPosition: "center top",
                widows: "100vw",
                minHeight: "100vh",
              }}
            >
              <div className="bg-dark-purple w-screen ">
                <div className=" flex">
                  <div className="w-1/5 flex">
                    <Avatar src="/broken-image.jpg" className="m-2" />
                    <p className="font-bold text-white text-xl my-3">
                      {userName}
                    </p>
                  </div>
                  <div className="w-2/5 flex"></div>
                  <div className="w-2/5 px-5">
                    {user === "teacher" && (
                      <div className="flex">
                        <p className="w-40 mt-4 text-white">Selected Batch:</p>
                        <select
                          value={selectedBatch}
                          onChange={(e) => setSelectedBatch(e.target.value)}
                          className="rounded-md w-full outline-none px-2 py-2 my-2 "
                        >
                          <option value="">Select Batch</option>
                          {allBatches &&
                            allBatches.map((user) => (
                              <option key={user} value={user.batch_name}>
                                {user.batch_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-full last:border-b-0 overflow-y-scroll p-3 ">
                {messages &&
                  messages.map((msg, i) => {
                    if (batchId === msg.batch_id) {
                      const isOwnMessage = email === msg.user_email;

                      return (
                        <div
                          className={`w-full py-1 px-2 pb-5 border-gray-200 ${
                            isOwnMessage ? "text-right" : "text-left"
                          }`}
                          key={i}
                        >
                          <span
                            className={`inline-block py-2 px-5  ${
                              isOwnMessage
                                ? "bg-dark-purple text-white rounded-t-[12px] rounded-bl-[12px]"
                                : "bg-gray-300 rounded-t-[12px] rounded-br-[12px]"
                            }`}
                          >
                            <label
                              className={` font-bold text-xs flex  ${
                                isOwnMessage
                                  ? "text-amber-300"
                                  : "text-dark-purple"
                              }`}
                            >
                              {msg.user_name}
                            </label>
                            {msg.message}
                            <span className="text-[9px] pl-5 ">
                              {new Date(msg.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                // second: "2-digit",
                              })}
                            </span>
                          </span>
                        </div>
                      );
                    }
                  })}
              </div>

              <div className="border-4 border-dark-purple w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1 border-dark-purple border-2 rounded-sm"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-2 rounded-md border-white bg-dark-purple flex justify-center items-center  rounded-br-md group hover:bg-gray-100 transition-all">
                  {/* <button
                    className="group-hover:text-dark-purple px-3 h-full text-gray-100"
                    
                  >
                    Send
                  </button> */}
                  <Button
                    variant="contained"
                    onClick={sendMessage}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
