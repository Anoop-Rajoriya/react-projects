import React from "react";

const Heading = ({ children }) => {
  return (
    <h1 className="text-accent text-2xl md:text-4xl font-bold capitalize text-center p-2">{children}</h1>
  );
};

export default Heading;
