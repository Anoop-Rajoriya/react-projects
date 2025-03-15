import React, { useContext } from "react";

const RoundedButton = ({ children, handler }) => {
  return (
    <button
      onClick={handler}
      className={`border-2 rounded-full md:w-32 font-bold capitalize p-2 md:pr-4 flex items-center justify-center gap-2 hover:bg-hoverFocusBackground text-accent border-accent`}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
