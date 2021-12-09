import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  setDoc,
  onSnapshot,
  Timestamp,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "./User";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

function useWindowResize() {
  const [size, setSize] = useState([window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  return size;
}

const Home = () => {
  let navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState([]);

  const [screenWidth] = useWindowResize();

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    if (screenWidth <= 768) {
      window.addEventListener("popstate", () => {
        navigate(-1);
        console.log("geri");
      });
    }
  }, []);

  useEffect(() => {
    for (let elements of document.getElementsByClassName("home-container")) {
      if (screenWidth > 768) {
        elements.style.gridTemplateColumns = "1fr 3fr";
      } else {
        if (chat !== "") {
          elements.style.gridTemplateColumns = "0 3fr";
        } else {
          elements.style.gridTemplateColumns = "3fr 0";
        }
      }
    }
  }, [screenWidth]);

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

  const selectUser = async (user) => {
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

    const querySnapshot = await getDocs(collection(db, "messages", id, "chat"));
    querySnapshot.forEach((document) => {
      if (document.data().from !== user1) {
        updateDoc(doc(db, "messages", id, "chat", document.id), {
          unread: false,
        });
      }
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
        unread: true,
      });

      await setDoc(doc(db, "lastMessage", id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        images: url || "",
        unread: true,
      });

      setText("");
      setImg("");
    }
  };

  return (
    <>
      <Navbar screenWidth={screenWidth} chat={chat} setChat={setChat}></Navbar>
      <div className="home-container">
        <div className="users-container">
          {users.map((user) => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
              screenWidth={screenWidth}
            />
          ))}
        </div>
        <div className={`messages-container`}>
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
                      <Message
                        key={index}
                        message={message}
                        user1={user1}
                        chat={chat}
                      />
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
            <h3 className="no-chat">Bir sohbet başlat</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
