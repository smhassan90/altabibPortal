import { Select } from "antd";
import Spinner from "../Spinner/Spinner";
import { Controller } from "react-hook-form";

export const SelectInput = ({
  placeholder,
  register,
  data,
  loading,
  options,
  width,
  errors,
  className,
  onChange,
  show
}) => {
  const { Option } = Select;
  return (
    <div>
      <Select
        placeholder={placeholder}
        allowClear={true}
        disabled={show}
        // style={{ width: width || '100%' }}
        className={className}
        onChange={onChange}
      >
        {loading ? (
          <Option  key="loading" value="loading">
            <Spinner size={16} />
          </Option>
        ) : (
          data?.map(
            (item) =>
              item?.id != null &&
              item?.name != null && (
                <Option  key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
          )
        )}
      </Select>
    </div>
  );
};
