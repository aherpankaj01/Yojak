import React, { useId } from "react";

const Select = React.forwardRef(
  ({ options = [], label, className = "", ...props }, ref) => {
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

        <select
          id={id}
          ref={ref}
          {...props}
          className={`
            w-full
            px-3 sm:px-4 py-2 sm:py-2.5
            text-sm sm:text-base
            rounded-md sm:rounded-lg
            bg-white/20 text-white
            backdrop-blur-md
            border border-white/20
            outline-none
            transition-all duration-300
            focus:ring-2 focus:ring-purple-500
            focus:bg-white/30
            ${className}
          `}
        >
          <option value="" className="text-black text-sm sm:text-base">
            Select an option
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="text-black text-sm sm:text-base"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

export default Select;
