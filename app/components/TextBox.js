import React from "react";
import PlusIcon from "../assets/icons/PlusIcon";

const TextBox = ({ title, onTitleChange, createTask }) => {
  return (
    <form
      className="bg-white flex justify-between items-center mb-8 w-full md:w-[80%] lg:w-[50%] rounded"
      onSubmit={createTask}
    >
      <input
        placeholder="Add new task"
        className="m-2 ml-3 bg-transparent w-full"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <button type="submit" className="bg-[#b9af8b] text-white p-2 rounded m-1">
        <PlusIcon />
      </button>
    </form>
  );
};

export default TextBox;
