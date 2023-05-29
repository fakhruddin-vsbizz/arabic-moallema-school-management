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
import { useContext } from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

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
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <>
          <p className="font-bold text-white text-xl">
            Your username: {userName}
          </p>
          <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md">
            <div className="h-full last:border-b-0 overflow-y-scroll">
              {messages &&
                messages.map((msg, i) => {
                  if (batchId === msg.batch_id) {
                    const isOwnMessage = email === msg.user_email;

                    return (
                      <div
                        className={`w-full py-1 px-2 border-b border-gray-200 ${
                          isOwnMessage ? "text-right" : "text-left"
                        }`}
                        key={i}
                      >
                        <span
                          className={`inline-block p-2 rounded-md ${
                            isOwnMessage
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          {msg.message}
                        </span>
                        <br />
                        <label>{msg.user_name}</label>
                        <br />
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </div>
                    );
                  }
                })}
            </div>
            {user === "teacher" && (
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="rounded-br-md outline-none px-2 py-2"
              >
                <option value="">Select Batch</option>
                {allBatches &&
                  allBatches.map((user) => (
                    <option key={user} value={user.batch_name}>
                      {user.batch_name}
                    </option>
                  ))}
              </select>
            )}
            <div className="border-t border-gray-300 w-full flex rounded-bl-md">
              <input
                type="text"
                placeholder="New message..."
                value={message}
                className="outline-none py-2 px-2 rounded-bl-md flex-1"
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeypress}
              />
              <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                <button
                  className="group-hover:text-white px-3 h-full"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      </main>
    </div>
  );
}
