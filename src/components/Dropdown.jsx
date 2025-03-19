import { useState, useRef, useEffect } from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Dropdown = ({
  className,
  options,
  onSelect,
  value = null,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setIsOpen((pre) => !pre);
  };

  const handleSelect = (e) => {
    const id = e.currentTarget.id;
    if (id == "default") onSelect(null, placeholder);
    else onSelect(id, placeholder);

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <button
      ref={dropdownRef}
      onClick={handleClick}
      className={`border-2 rounded-lg p-3 px-6 capitalize font-semibold flex items-center justify-center gap-2 hover:bg-hoverFocusBackground relative ${className} ${
        isOpen
          ? "text-accent border-accent"
          : "text-secondaryText border-secondaryText"
      }`}
    >
      {value ? value : placeholder}
      {isOpen ? (
        <IoIosArrowUp className="size-5 md:size-7" />
      ) : (
        <IoIosArrowDown className="size-5 md:size-7" />
      )}
      {isOpen && (
        <ul
          onClick={(e) => e.stopPropagation()}
          className={`absolute bg-complimentaryBackground p-2 rounded-lg w-full top-full translate-y-2 border-2 border-secondaryText space-y-2 z-50`}
        >
          {options.map((option, index) => (
            <li
              id={option}
              onClick={handleSelect}
              className="hover:bg-hoverFocusBackground py-1"
              key={index}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default Dropdown;
