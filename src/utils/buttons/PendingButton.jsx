import React from "react";

const PendingButton = ({children,className}) => {
  return (
    <div className={`flex items-center gap-1 px-4 py-1 rounded-large bg-[#ffa6001a] text-Tertiary`}>
      {children}
    </div>
  );
};

export default PendingButton;
