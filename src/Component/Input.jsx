import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", error, ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-1 sm:gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-xs sm:text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`
          w-full
          px-3 sm:px-4 py-2 sm:py-2.5
          text-sm sm:text-base
          rounded-md sm:rounded-lg
          bg-white/20 text-white
          placeholder-gray-300
          border border-white/20
          backdrop-blur-md
          outline-none
          transition-all duration-300

          focus:ring-2 focus:ring-indigo-500
          focus:bg-white/30

          ${error ? "border-red-400 focus:ring-red-500" : ""}

          ${className}
        `}
      />

      {error && (
        <span className="text-xs sm:text-sm text-red-400 mt-1">{error}</span>
      )}
    </div>
  );
});

export default Input;
