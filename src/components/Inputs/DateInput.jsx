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

// export const DateInputWithValidation = ({
//   label,
//   control,
//   name,
//   type,
//   errors,
//   className,
//   input,
// }) => {
//   return (
//     <div className={`relative w-full ${className}`}>
//       <label
//         className="flex-1 text-small 2xl:text-medium text-gray"
//         htmlFor="grid-password"
//       >
//         {label}&nbsp;:
//       </label>
//       <div className="flex-1">
//         <Controller
//           control={control}
//           name={name}
//           render={({ field: controllerField }) => {
//             return (
//               <DatePicker
//                 placeholder={input ? input : ""}
//                 value={controllerField.value == "Invalid Date" ? null : dayjs(controllerField.value)}
//                 onChange={controllerField.onChange}
//                 className="!h-[40px] w-full !bg-transparent focus:!border-secondary focus:!ring-0 focus:!outline-none"
//                 allowClear={false}
//               />
//             );
//           }}
//         />
//         {errors[name] && (
//           <span className="text-red-500 text-sm">{errors[name]?.message}</span>
//         )}
//       </div>
//     </div>
//   );
// };
// import { Controller } from "react-hook-form";
// import { DatePicker } from "antd";
// import dayjs from "dayjs";

export const DateInputWithValidation = ({
  label,
  control,
  name,
  type,
  errors,
  className,
  input,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block !text-small 2xl:!text-medium text-text mb-1">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            placeholder={input || ""}
            value={field.value === "Invalid Date" || !field.value ? null : dayjs(field.value)}
            onChange={(date) => field.onChange(date)}
            allowClear={false}
            className="w-full !h-[35px] border border-gray-300 rounded-md shadow-sm !text-small 2xl:!text-medium focus:border-blue-500 focus:outline-none transition-all duration-200"
            format="YYYY-MM-DD"
          />
        )}
      />
      {errors[name] && (
        <span className="text-xs text-red-500 mt-1 block">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};
