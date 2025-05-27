import { Search } from "lucide-react";
import React from "react";

const SearchInput = () => {
  return (
    <div className="flex-3 relative">
      <Search size={14} className="absolute top-3 left-2" />
      <input
        type="text"
        placeholder="Search"
        className="w-full text-small pl-8 h-[35px] bg-white border border-border rounded-medium focus:outline-none "
      />
    </div>
  );
};

export default SearchInput;
