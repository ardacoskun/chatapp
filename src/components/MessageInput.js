import React from "react";
import MessageSendIcon from "./MessageSendIcon";
import UploadImage from "./UploadImage";

const MessageInput = ({ text, setText, handleChat, setImg }) => {
  return (
    <form className="messages-wrapper" onSubmit={handleChat}>
      <div className="message-box">
        <input
          type="text"
          placeholder="Mesaj..."
          className="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="upload-image">
          <label htmlFor="img">
            <UploadImage />
          </label>
          <input
            type="file"
            accept="image/*"
            id="img"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
      </div>
      <div className="btn-send-container">
        <button type="submit" className="btn-send">
          <MessageSendIcon />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
