import React from "react";

const MessageSendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "30px",
        height: "30px",
        cursor: "pointer",
        color: "#78B7FF",
        borderRadius: "50%",
      }}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default MessageSendIcon;
