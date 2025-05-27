import { Search } from "lucide-react";
import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const SearchInput = ({
  onSearch,
  placeholder,
}) => {
  return (
    <div className="sm:w-full w-auto">
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined size={15} className="mr-2 w"/>}
        onChange={(e) => onSearch(e.target.value)}
        allowClear
      />
    </div>
  );
};

export default SearchInput;
