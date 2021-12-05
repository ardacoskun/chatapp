import React from "react";

const BackButton = ({ setChat }) => {
  const handleBackCliked = () => {
    for (let elements of document.getElementsByClassName("home-container")) {
      elements.style.gridTemplateColumns = "3fr 0";
    }
    setChat("");
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "25px",
        height: "25px",
        cursor: "pointer",
        color: "#fff",
        marginLeft: "10px",
      }}
      onClick={handleBackCliked}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
};

export default BackButton;
