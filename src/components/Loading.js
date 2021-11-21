import React from "react";
import Spin from "react-cssfx-loading/lib/Spin";

const Loading = () => {
  return (
    <div className="loading">
      <Spin color="#78b7ff" width="80px" height="80px" duration="1s" />
    </div>
  );
};

export default Loading;
