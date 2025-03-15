import React, { useEffect, useState } from "react";
import data from "../jsonDB/TestimonialsCardsData.json";
import Heading from "../components/Heading";
import IconButton from "../components/IconButton";

const TestimonialsProject = () => {
  const [index, setIndex] = useState(0);

  const handleClick = ({ currentTarget }) =>
    setIndex(parseInt(currentTarget.id));

  return (
    <div id="wraper">
      <Heading>Users Feedback (Testimonials)</Heading>
      <div
        id="card"
        className="flex flex-col items-center justify-end bg-complimentaryBackground p-2 py-6 rounded-2xl"
      >
        <div className="rounded-full size-28 md:size-36 border-accent border-4 overflow-hidden">
          <img id="user-picture" src={data[index].image} alt="" />
        </div>
        <h1
          id="user-name"
          className="text-accent capitalize font-bold text-xl md:text-2xl pt-6"
        >
          {data[index].name}
        </h1>
        <h2 id="user-email" className="text-secondaryText p-1">
          {data[index].email}
        </h2>
        <p
          id="user-feadback"
          className="w-full pt-2 md:px-20 text-center font-semibold"
        >
          {data[index].feedback}
        </p>
      </div>
      <div className="flex items-center justify-center p-2 gap-2">
        {data.map((_, i) => (
          <IconButton
            key={i}
            handler={handleClick}
            id={i}
            className={`size-4 md:size-5 ${
              i == index ? "bg-accent" : "bg-secondaryText"
            }`}
          ></IconButton>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsProject;
