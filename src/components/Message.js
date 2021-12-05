import React, { useRef, useEffect } from "react";
import moment from "moment";
import "moment/locale/tr";

moment.locale("tr");

const Message = ({ message, user1 }) => {
  const scrollRef = useRef();

  var myDate = new Date(message.createdAt.toDate());
  var hour = myDate.getHours();

  var minutes = myDate.getMinutes();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
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
        <br />
        <small>{`${hour.toString()}:${minutes.toString()}`}</small>
      </p>
    </div>
  );
};

export default Message;
