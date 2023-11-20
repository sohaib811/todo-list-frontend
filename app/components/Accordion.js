"use client";

import ChevronIcon from "@/public/assets/icons/ChevronIcon";
import ListIcon from "@/public/assets/icons/ListIcon";
import { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[50%] mb-4">
      {/* Accordion Trigger */}
      <button
        className={`w-full backdrop-blur rounded flex justify-between text-white text-bolder text-left p-4 bg-transparent border-t border-b border-l border-r border-gray-300 ${
          isOpen ? "bg-gray-200" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex w-full">
          <ListIcon className="mr-2" />
          <span className="w-full">{title}</span>
        </div>
        <ChevronIcon
          className={` transition-transform transform ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-2">
          {/* Your content for the accordion item goes here */}
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
