import React from "react";
import Img from "../assets/vecihi.jpg";

const User = ({ user, selectUser }) => {
  return (
    <div className="users-wrapper" onClick={() => selectUser(user)}>
      <div className="user-info">
        <div className="user-detail">
          <img
            src={user.profilePic || Img}
            alt="profile-pic"
            className="profile-pic"
          />
          <h4>{user.name}</h4>
        </div>
        <div
          className={`user-status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
};

export default User;
