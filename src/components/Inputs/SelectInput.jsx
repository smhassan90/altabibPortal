import { ChevronDown } from "lucide-react";
import React from "react";

const SelectInput = ({selectedStatus,setSelectedStatus,options}) => {
  return (
    <div className="flex-1 relative">
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="w-full text-small appearance-none bg-white border border-gray-300 rounded-medium h-[35px] px-4 focus:outline-none focus:ring-1 focus:ring-secondary"
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        <option>All Status</option>
        <option>Successful</option>
        <option>Pending</option>
      </select>
      <ChevronDown size={18} className="absolute top-2.5 right-2" />
    </div>
  );
};

export default SelectInput;
