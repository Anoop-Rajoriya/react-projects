import React, { useContext } from "react";
import { AppContext } from "../App";

const TextCard = ({ handler, heading, children, id }) => {
  return (
    <div
      onClick={handler}
      id={id}
      className={`border-2 rounded-md p-3 max-w-sm hover:bg-hoverFocusBackground hover:border-accent hover:text-accent`}
    >
      <p className="text-lg md:text-xl font-semibold capitalize">{heading}</p>
      <p className="text-secondaryText capitalize pt-2">{children}</p>
    </div>
  );
};

export default TextCard;
