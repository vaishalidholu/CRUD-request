import React from "react";
import spinner from "../images/loading.gif";

export default function Spinner() {
  return (
    <div>
      <div className="image">
        <img src={spinner} alt="loading" />
      </div>
    </div>
  );
}
