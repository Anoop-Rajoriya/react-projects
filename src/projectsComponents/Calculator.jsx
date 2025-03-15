import React, { useState } from "react";
import Heading from "../components/Heading";

const CalculatorProject = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const Calculator = () => {
    try {
      // Sanitize and check for invalid characters
      if (!/^[0-9+\-*/().% ]+$/.test(input)) {
        throw new Error("Invalid characters in expression");
      }

      // Use Function constructor for safer evaluation
      const result = new Function(`return (${input})`)();

      console.log(result);

      if (result === undefined || isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid calculation");
      }

      setInput(result);
    } catch (error) {
      console.error("Calculation Error:", error.message);
      setError(`Calculation Error:, ${error.message}`);
      setTimeout(() => setError(""), 2000);
    }
  };
  const keyHandler = (event) => {
    const key = event.target.textContent.trim();
    setInput((preInput) => preInput + key);
  };
  const deleteHandler = () => {
    setInput(input.slice(0, input.length - 1));
  };
  const allClear = () => {
    setInput("");
  };

  return (
    <div className="w-full">
      <Heading>Basic Calculator</Heading>
      <section className="w-full bg-complimentaryBackground p-2 md:p-3 rounded-lg max-w-xl mx-auto">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.trim())}
          type="text"
          placeholder="00"
          className="p-2 py-4 text-lg md:text-xl text-end capitalize w-full bg-transparent text-primaryText outline-none border-secondaryText border-2 rounded-lg"
        />
        {error && (
          <p className="w-full bg-errorTransparent text-error border-error p-2 rounded-lg text-lg md:text-xl text-center capitalize">
            {error}
          </p>
        )}
        <section className="grid grid-cols-4 my-6 gap-2 text-primaryText">
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            "0",
            ".",
            "=",
            "+",
            "AC",
            "DEL",
            "%",
          ].map((key, index) => {
            // if(key === "AC"){
            //     return
            // }
            // if (key === "DEL") {
            //   return (
            //     <button
            //       key={index}
            //       className=" col-span-2 p-2 text-lg md:text-xl text-error rounded-full bg-errorTransparent border-error hover:text-secondaryText"
            //     >
            //       {key}
            //     </button>
            //   );
            // }
            // if (key === "=") {
            //   return (
            //     <button
            //       key={index}
            //       className=" p-2 text-lg md:text-xl text-success rounded-full bg-successTransparent border-success hover:text-secondaryText"
            //     >
            //       {key}
            //     </button>
            //   );
            // }
            return (
              <button
                key={index}
                className={`p-2 text-lg md:text-xl rounded-full bg-primaryBackground hover:text-secondaryText  ${
                  key === "DEL" && "col-span-2 text-error border-error"
                } ${key === "=" && "text-success border-success"}`}
                onClick={
                  key === "="
                    ? Calculator
                    : key === "AC"
                    ? allClear
                    : key === "DEL"
                    ? deleteHandler
                    : keyHandler
                }
              >
                {key}
              </button>
            );
          })}
        </section>
      </section>
    </div>
  );
};

export default CalculatorProject;
