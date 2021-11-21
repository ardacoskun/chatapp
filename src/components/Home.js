import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "./User";
import MessageInput from "./MessageInput";
import Message from "./Message";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "not-in", [user1]));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unSubscribe();
  }, []);

  const selectUser = (user) => {
    setChat(user);

    const user2 = user.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const q = query(
      collection(db, "messages", id, "chat"),
      orderBy("createdAt", "asc")
    );
    const subscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMsg(messages);
    });
  };

  const handleChat = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;

    let url;
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()}-${img.name}`);

      const snap = await uploadBytes(imgRef, img);
      const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = downloadUrl;
    }

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    if (img || text) {
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        images: url || "",
      });
      setText("");
      setImg("");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="home-container">
        <div className="users-container">
          {users.map((user) => (
            <User key={user.uid} user={user} selectUser={selectUser} />
          ))}
        </div>
        <div className="messages-container">
          {chat ? (
            <>
              <div className="messages-chat">
                <div className="user-bar">
                  <div
                    className={`user-status ${
                      chat.isOnline ? "online" : "offline"
                    }`}
                  ></div>
                  <h3>{chat.name}</h3>
                </div>
              </div>
              <div className="messages">
                {msg.length
                  ? msg.map((message, index) => (
                      <Message key={index} message={message} user1={user1} />
                    ))
                  : null}
              </div>
              <MessageInput
                handleChat={handleChat}
                text={text}
                setText={setText}
                setImg={setImg}
              ></MessageInput>
            </>
          ) : (
            <h3 className="no-chat">Bir sohbet başlatın.</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
