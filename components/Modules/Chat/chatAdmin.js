import { fetchBatchesData } from "@/backend/Announcement/AnnouncementDB";
import { fetchBatcheIdBasedOnBatchName } from "@/backend/Batches/BatchesDB";
import { fetchTeacherBatches } from "@/backend/Batches/BatchesForTeachersStudentsDB";
import {
  addChatData,
  fetchChatHistoryBasedOnBatch,
} from "@/backend/ChatData/ChatDataForBatch";

import AuthContext from "@/components/Context/store/auth-context";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

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
    const data = await addChatData(1, batchId, message, email, "admin");
    console.log(data);
    if (message.trim() !== "" && chosenUsername) {
      socket.emit("createdMessage", data[0]);
      setMessage("");
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
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <>
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
          <p className="font-bold text-white text-xl">
            Your username: {"Admin"}
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
