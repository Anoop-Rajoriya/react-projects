import React from "react";

const IconButton = ({ children, type, className, handler, id }) => {
  return (
    <button
      id={id}
      onClick={handler && handler}
      type={type && type}
      className={`rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
