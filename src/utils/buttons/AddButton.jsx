import React from "react";

const AddButton = ({children,className,onClick,type="submit"}) => {
  return (
    <button type={type} onClick={onClick && onClick} className={`flex items-center gap-1 px-4 py-1 rounded-large bg-secondary text-white cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default AddButton;
