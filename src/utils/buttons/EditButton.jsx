import React from "react";

const EditButton = ({children,className,onClick}) => {
  return (
    <button type="submit" onClick={onClick && onClick} className={`flex items-center gap-1 px-4 py-1 rounded-large bg-Tertiary text-white cursor-pointer text-small 2xl:text-medium ${className}`}>
      {children}
    </button>
  );
};

export default EditButton;
