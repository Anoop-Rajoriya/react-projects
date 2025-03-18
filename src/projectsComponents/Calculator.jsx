import React, { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Input";
import IconButton from "../components/IconButton";

const CalculatorProject = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleCalculation = (event) => {
    event.preventDefault();

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

  // handle input
  const handleInput = (e) => setInput(e.target.value.trim());

  const handleKeyPress = (event) => {
    const key = event.target.textContent.trim();
    setInput((preInput) => preInput + key);
  };
  const handleDeleteKeyPress = () => {
    setInput(input.slice(0, input.length - 1));
  };
  const handleClearKeyPress = () => {
    setInput("");
  };

  return (
    <div className="w-full">
      <Heading>Basic Calculator</Heading>
      <form
        onSubmit={handleCalculation}
        className="w-full bg-complimentaryBackground p-2 md:p-3 rounded-lg max-w-xl mx-auto"
      >
        <Input
          handler={handleInput}
          value={input}
          required={true}
          placeholder="ex. (5+5)/2 = (5)"
          label="enter expression"
          labelBg="bg-complimentaryBackground"
          type="text"
          className=""
          errorLabel={error}
        />
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
          ].map((key, index) => (
            <IconButton
              key={index + key}
              className={`border-2 p-2 hover:border-accent hover:text-accent hover:bg-hoverFocusBackground ${
                key == "="
                  ? "text-success border-success bg-successTransparent"
                  : key == "DEL"
                  ? "col-span-2 text-error border-error bg-errorTransparent"
                  : "border-secondaryText text-secondaryText"
              }`}
              type={key == "=" ? "submit" : "button"}
              handler={
                key == "="
                  ? null
                  : key == "AC"
                  ? handleClearKeyPress
                  : key == "DEL"
                  ? handleDeleteKeyPress
                  : handleKeyPress
              }
            >
              {key}
            </IconButton>
          ))}
        </section>
      </form>
    </div>
  );
};

export default CalculatorProject;
