import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
const Loader = () => {
  return (
    <div className="flex items-center justify-center py-6">
      <BiLoaderAlt className="size-8 md:size-10 text-primaryText animate-spin " />
    </div>
  );
};

export default Loader;
