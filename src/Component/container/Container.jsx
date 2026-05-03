import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`
        w-full
        max-w-7xl
        mx-auto
        px-3 sm:px-4 md:px-6 lg:px-8
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
