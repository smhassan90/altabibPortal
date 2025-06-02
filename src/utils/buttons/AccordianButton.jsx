import { ChevronDown } from "lucide-react";
import React from "react";

const AccordianButton = ({children,onClick}) => {
  return (
    <button onClick={onClick} className="!bg-white w-full flex items-center justify-between px-3 py-2 text-left "
    >
      {children}
    </button>
  );
};

export default AccordianButton;
