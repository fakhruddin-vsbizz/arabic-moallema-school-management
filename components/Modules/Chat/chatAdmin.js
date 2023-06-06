import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import { fetchBatcheIdBasedOnBatchName } from "@/backend/Batches/BatchesDB";
import { fetchTeacherBatches } from "@/backend/Batches/BatchesForTeachersStudentsDB";
import grayBgImg from "@/components/src/img/grayBgImgM.png";
import {
  addChatData,
  fetchChatHistoryBasedOnBatch,
} from "@/backend/ChatData/ChatDataForBatch";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthContext from "@/components/Context/store/auth-context";
import { Avatar, Button } from "@mui/material";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
const Message = {
  author: "",
  message: "",
};

export default function ChatAdmin({ user }) {
  const [chosenUsername, setChosenUsername] = useState("Admin");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [allBatches, setAllBatches] = useState();
  const [selectedBatch, setSelectedBatch] = useState();

  const [batchId, setBatchId] = useState();

  const authCtx = useContext(AuthContext);
  const email = authCtx.userEmail;

  //getting the bacthId
  useEffect(() => {
    const fetchBatchId = async () => {
      if (selectedBatch) {
        const data = await fetchBatcheIdBasedOnBatchName(selectedBatch);
        if (data && data[0]) {
          setBatchId(data[0].batch_id);
        }
      }
    };
    fetchBatchId();
  }, [selectedBatch]);

  //getting the chat hisstory for the selected batch
  useEffect(() => {
    const getChats = async () => {
      if (batchId) {
        const data = await fetchChatHistoryBasedOnBatch(batchId);
        if (data && data[0]) {
          setMessages(data);
        }
      }
    };
    getChats();
  }, [batchId]);

  //getting all the batches

  useEffect(() => {
    const teacherBatches = async () => {
      const data = await fetchBatchesData();
      setAllBatches(data);
    };
    teacherBatches();
  }, []);

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
      const data = await addChatData(1, batchId, message, email, "admin");
      console.log(data);
      if (message.trim() !== "" && chosenUsername) {
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

  return (
    <div className=" bg-dark-purple">
      <div className="flex items-center  mx-auto justify-center ">
        <div className="gap-4 flex flex-col items-center justify-center  ">
          <>
            <div
              className="flex flex-col  justify-end   rounded-md h-screen  shadow-md"
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
                    <Link href="/admin">
                    <IconButton aria-label="delete" size="large" >
                      <ArrowBackIcon style={{color: 'white'}} fontSize="inherit" />
                    </IconButton>
                    </Link>
                    <Avatar src="/broken-image.jpg" className="m-2" />
                    <p className="font-bold text-white text-xl my-3">Admin</p>
                  </div>
                  <div className="w-2/5 flex"></div>
                  <div className="w-2/5 px-5">
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
                  </div>
                </div>
              </div>
              <div className="h-full last:border-b-0 overflow-y-scroll  ">
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

              {/* <div className="border-4 border-dark-purple w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1 border-dark-purple border-2 rounded-sm"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-2 rounded-md border-white bg-dark-purple flex justify-center items-center  rounded-br-md group hover:bg-gray-100 transition-all">
                  <Button
                    variant="contained"
                    onClick={sendMessage}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </div>
              </div> */}
              <div className="border-4 border-t-dark-purple w-full flex p-1 rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="outline-none py-2 px-2 rounded-l-xl flex-1 border-x-dark-purple border-2 rounded-sm animate-popupSlide"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-2 rounded-full border-white bg-dark-purple hover:bg-amber-400 hover:text-dark-purple ml-2  flex justify-center items-center group transition-all animate-popupSlide">
                  {/* <button
                    className="group-hover:text-dark-purple px-3 h-full text-gray-100"
                    
                  >
                    Send
                  </button> */}
                  <IconButton
                    aria-label="send"
                    className="text-white hover:animate-wiggleFull"
                    onClick={sendMessage}
                    size="large"
                  >
                    <SendIcon fontSize="inherit" className="text-white" />
                  </IconButton>
                  {/* <Button
                    variant="contained"
                    
                    endIcon={<SendIcon />}
                  >
                    Send 
                  </Button> */}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
