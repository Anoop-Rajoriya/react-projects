import React, { useId } from "react";

const Input = ({
  label,
  type,
  placeholder,
  required,
  handler,
  value,
  name,
  labelBg,
  errorLabel,
  className,
}) => {
  const id = useId();
  return (
    <div
      className={`flex flex-col items-start justify-center w-full relative ${className}`}
    >
      <label
        htmlFor={id + label.replace(" ", "-")}
        className={`capitalize text-sm text-accent absolute top-0 -translate-y-1/2 translate-x-6 px-2 ${
          labelBg ? labelBg : "bg-primaryBackground"
        }`}
      >
        {label}
      </label>
      <input
        name={name}
        id={id + label.replace(" ", "-")}
        value={value}
        onChange={handler}
        required={required && required}
        type={type}
        placeholder={placeholder}
        className="w-full border-2 border-secondaryText bg-transparent text-primaryText p-2 pt-3 rounded-lg outline-none focus:border-accent placeholder:capitalize focus:placeholder:text-accent"
      />
      {errorLabel && (
        <p className="w-full text-end px-3 text-sm font-semibold text-error">
          {errorLabel}
        </p>
      )}
    </div>
  );
};

export default Input;
