import React, { useRef, useEffect } from "react";

const Message = ({ message, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`message-wrapper ${message.from === user1 ? "user1" : ""}`}
      ref={scrollRef}
    >
      <p className={message.from === user1 ? "me" : "contact"}>
        {message.images ? (
          <img src={message.images} alt={message.text} />
        ) : null}
        {message.text}
      </p>
    </div>
  );
};

export default Message;
