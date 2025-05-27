import React from "react";

const AddButton = ({children,className,onClick}) => {
  return (
    <button type="submit" onClick={onClick && onClick} className={`flex items-center gap-1 px-4 py-1 rounded-large bg-secondary text-white cursor-pointer`}>
      {children}
    </button>
  );
};

export default AddButton;
