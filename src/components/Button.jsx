import React, { useContext } from "react";
const Button1 = ({ id, children, handler, isActive }) => {
  return (
    <button
      id={id}
      onClick={handler}
      className={`border-2 rounded-md w-full max-w-32 font-bold capitalize p-2 px-4 pr-6 flex items-center justify-center gap-2 hover:bg-hoverFocusBackground ${
        isActive
          ? `text-accent border-accent`
          : "text-secondaryText border-secondaryText"
      }`}
    >
      {children}
    </button>
  );
};

export default Button1;
