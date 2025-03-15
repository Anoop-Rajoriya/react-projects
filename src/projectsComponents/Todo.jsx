import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import Heading from "../components/Heading";
import Input from "../components/Input";
import IconButton from "../components/IconButton";

const TodoProject = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // handle form submit
  const handleForm = (event) => {
    event.preventDefault();
    setTodos((pre) => [...pre, input]);
    setInput("");
  };

  // handle todo filtering for delete todos
  const handleDelete = (event) => {
    const todoIndex = parseInt(event.currentTarget.id);
    const filterdTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos([...filterdTodos]);
  };

  // handle user input
  const handleInput = (e) => setInput(e.target.value.trim());

  return (
    <div className="w-full flex flex-col gap-2">
      <Heading>create task</Heading>
      <form
        onSubmit={handleForm}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <Input
          value={input}
          handler={handleInput}
          label="create task"
          type="text"
          placeholder="enter here"
          required={true}
        />
        <IconButton className="p-2 px-3 bg-accent self-stretch" type="submit">
          <IoIosAddCircle className="size-5 md:size-7" />
        </IconButton>
      </form>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <p
            key={index}
            className="w-full bg-complimentaryBackground rounded-lg flex items-center justify-start"
          >
            <span className="px-3 font-bold">{todo}</span>
            <IconButton
              className="p-2 ml-auto"
              id={index}
              handler={handleDelete}
            >
              <MdDeleteForever className="size-5 md:size-7 text-error" />
            </IconButton>
          </p>
        ))
      ) : (
        <p className="text-secondaryText text-base text-center p-2 capitalize">
          please create some tasks!
        </p>
      )}
    </div>
  );
};

export default TodoProject;
