import React, { useEffect, useState } from "react";
import Img from "../assets/vecihi.jpg";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const User = ({ screenWidth, chat, user1, user, selectUser }) => {
  const user2 = user?.uid;
  const [unreads, setUnreads] = useState([]);

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const q = query(
      collection(db, "messages", id, "chat"),
      where("from", "==", user2)
    );
    onSnapshot(q, (querySnapshot) => {
      const unreadMsg = [];
      querySnapshot.forEach((doc) => {
        unreadMsg.push(doc.data());
      });
      setUnreads(unreadMsg);
    });
  }, []);

  const unreadCount = unreads.filter((data) => data.unread === true);

  return (
    <div
      className={`users-wrapper ${chat.name === user.name && "selected-user"}`}
      onClick={() => {
        selectUser(user);
        for (let element of document.getElementsByClassName("home-container")) {
          if (screenWidth <= 768) {
            element.style.gridTemplateColumns = "0fr 3fr";
          }
        }
      }}
    >
      <div className="user-info">
        <div className="user-detail">
          <img
            src={user.profilePic || Img}
            alt="profile-pic"
            className="profile-pic"
          />
          <h4 className="username-tag">{user.name}</h4>
        </div>
        {unreadCount.length > 0 ? (
          <div
            className={`new-text  ${
              chat.name === user.name && "selected-chat"
            }`}
          >
            <h4 className="count-msg">{unreadCount.length}</h4>
          </div>
        ) : null}

        <div
          className={`user-status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
};

export default User;
