import { Circle } from "better-react-spinkit";
import React from "react";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://i.ibb.co/wwNZ5Lk/logo.jpg"
          style={{ marginBottom: 10, borderRadius: 10 }}
          alt=""
          height={200}
        />
        <Circle color="#2FB3E6" size={60} />
      </div>
    </center>
  );
};

export default Loading;
