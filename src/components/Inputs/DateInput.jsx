import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";

export const DateInput = ({ visitDate, setVisitDate }) => {
  return (
    <div className="flex-1 relative">
      <DatePicker
        value={dayjs(visitDate)}
        onChange={(date, dateString) => setVisitDate(dateString)}
        className="w-full text-small px-4 h-[35px] bg-white border border-gray-300 rounded focus:outline-none"
        allowClear={false}
      />
    </div>
  );
};

export const DateInputWithValidation = ({
  label,
  control,
  name,
  type,
  errors,
  className,
  input
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <label className="flex-1 text-small 2xl:text-medium text-gray" htmlFor="grid-password">
        {label}&nbsp;:
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <DatePicker
            placeholder={input ? input : ""}
            value={controllerField.value}
            onChange={controllerField.onChange}
            className="!h-[40px] w-full flex-1 !bg-transparent focus:!border-secondary focus:!ring-0 focus:!outline-none"
            allowClear={false}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};
