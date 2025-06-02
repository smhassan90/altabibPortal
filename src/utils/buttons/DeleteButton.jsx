import React from "react";

const DeleteButton = ({children,className,onClick}) => {
  return (
    <button onClick={onClick && onClick} className={`flex items-center gap-1 px-4 py-1 rounded-large bg-red-400 text-white cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default DeleteButton;
