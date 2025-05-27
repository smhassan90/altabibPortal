import React from "react";

const DateInput = () => {
  return (
    <div className="flex-1 relative">
      <input
        type="date"
        placeholder="Search"
        className="w-full text-small px-4 h-[35px] bg-white border border-gray-300 rounded-medium focus:outline-none "
      />
    </div>
  );
};

export default DateInput;
