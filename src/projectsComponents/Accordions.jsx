import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import data from "../jsonDB/AccordionCardsData.json";
import Heading from "../components/Heading";
const Accordion = () => {
  const [accordionState, setAccordionState] = useState(() =>
    data.map(() => false)
  );

  const clickHandler = (event) => {
    const index = event.currentTarget.getAttribute("index");
    const newState = accordionState;
    newState[index] = !newState[index];
    setAccordionState([...newState]);
  };

  return (
    <div className="flex flex-col items-center justify-items-center">
      <Heading>Accordions</Heading>
      <div className="py-6 space-y-2">
        {data.map((obj, index) => {
          return (
            <button
              onClick={clickHandler}
              key={index}
              index={index}
              className={`border-2 bg-complimentaryBackground w-full rounded-lg hover:text-accent hover:border-accent ${
                accordionState[index]
                  ? "text-accent border-accent"
                  : "text-primaryText border-secondaryText"
              }`}
            >
              <p className="w-full flex items-center justify-between p-2 px-4 font-bold">
                {obj.title}
                {accordionState[index] ? (
                  <FaMinus className="size-5 md:size-6" />
                ) : (
                  <FaPlus className="size-5 md:size-6" />
                )}
              </p>
              <p
                className={`text-base md:text-lg text-secondaryText text-start pb-2 px-4 ${
                  !accordionState[index] && "hidden"
                }`}
              >
                {obj.content}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
