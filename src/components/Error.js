import React from "react";

// Styles
import { error } from "../styles/modules/error.module.css";

const Error = ({ message }) => {
  return (
    <div className={error}>
      <p>{message}</p>
    </div>
  );
};

export default Error;
