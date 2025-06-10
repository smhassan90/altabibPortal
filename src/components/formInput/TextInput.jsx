"use-client";
import React, { useMemo, useState } from "react";
import { DatePicker, Divider, Input, Select } from "antd";
import Spinner from "../Spinner/Spinner";
import { Controller, set } from "react-hook-form";
import { Eye, EyeClosed, Search } from "lucide-react";
import AddButton from "@/utils/buttons/AddButton";
const { TextArea } = Input;
const TextInput = ({ label, input, type, register, errors, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-gray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <input
        type={name === "password" && showPassword ? "text" : type}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder={input}
        {...register(name, { required: true })}
      />
      {name === "password" && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer absolute right-3 top-9"
        >
          {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
        </span>
      )}
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const TextInputs = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  control,
  disabled,
  className,
}) => {
  return (
    <div className={`relative w-full mb-3 ${className}`}>
      {label && (
        <label
          className="block text-small 2xl:text-medium mb-2 text-text"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <Input
            type={type}
            placeholder={input}
            className="!h-[40px] placeholder:!text-gray"
            status={errors[name] ? "error" : ""}
            value={controllerField.value}
            onChange={controllerField.onChange}
            disabled={disabled}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const PasswordInputs = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  control,
  disabled,
  className,
}) => {
  return (
    <div className={`relative w-full mb-3 ${className}`}>
      {label && (
        <label
          className="block text-small 2xl:text-medium mb-2 text-text"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <Input.Password
            type={type}
            placeholder={input}
            className="!h-[40px] placeholder:!text-gray"
            status={errors[name] ? "error" : ""}
            value={controllerField.value}
            onChange={controllerField.onChange}
            disabled={disabled}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const TextInputsWithUnderLine = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  control,
  disabled,
  className,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <label className="text-small 2xl:text-medium text-gray" htmlFor="grid-password">
        {label}&nbsp;:
      </label>
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field: controllerField }) => (
            <Input
              type={type}
              placeholder={input ? input : ""}
              className="!h-[40px] !w-full flex-1 !bg-transparent focus:!border-secondary focus:!ring-0 focus:!outline-none"
              status={errors[name] ? "error" : ""}
              value={controllerField.value}
              onChange={controllerField.onChange}
              disabled={disabled}
            />
          )}
        />
        {errors[name] && (
          <span className="text-red-500 text-small 2xl:text-medium">{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

const SelectInputs = ({
  label,
  input,
  type,
  control,
  errors,
  name,
  options,
  className,
}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={`relative w-full mb-3`}>
      {label && (
        <label
          className="block text-small 2xl:text-medium mb-2 text-text"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <Select
            options={options}
            className={`!h-[40px] placeholder:!text-gray w-full rounded-medium !bg-transparent ${className}`}
            placeholder={input}
            status={errors[name] ? "error" : ""}
            value={controllerField.value ? controllerField.value : undefined}
            onChange={controllerField.onChange}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const SelectInputWithoutLabel = ({
  label,
  input,
  type,
  control,
  errors,
  name,
  options,
  className,
}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={`relative w-full ${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <Select
            placeholder={input}
            options={options}
            className={`!h-[35px] w-full rounded-medium !bg-transparent ${className}`}
            status={errors[name] ? "error" : ""}
            value={controllerField.value ? controllerField.value : undefined}
            onChange={controllerField.onChange}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const MultipleSelectInputs = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  options,
  control,
}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const option = useMemo(() => {
    return options?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [options]);

  return (
    <div className="relative w-full mb-3">
      {label && (
        <label
          className="block text-small 2xl:text-medium mb-2 text-text"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => {
          return (
            <Select
              mode="multiple"
              options={option}
              className="!min-h-[40px] placeholder:!text-gray w-full"
              placeholder={input}
              // notFoundContent={loading ? <Spinner /> : "No data found"}
              status={errors[name] ? "error" : ""}
              value={
                Array.isArray(controllerField.value)
                  ? controllerField.value
                  : []
              }
              onChange={controllerField.onChange}
            />
          );
        }}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const SingleSelectInputs = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  options,
  control,
  className,
  setValue,
  labelClassName
}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const option = useMemo(() => {
    return options?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [options]);

  return (
    <div className={`relative w-full mb-3 ${className}`}>
      {label && <label
        className={`block text-small 2xl:text-medium mb-2 text-text`}
        htmlFor="grid-password"
      >
        {label}&nbsp;:
      </label>}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => {
          return (
            <Select
              options={option}
              className="!h-[40px] placeholder:!text-gray w-full flex-2"
              placeholder={input}
              status={errors[name] ? "error" : ""}
              value={controllerField.value ? controllerField.value : undefined}
              onChange={(value, option) => {
                controllerField.onChange(value);
                if (name === "patientId") {
                  setValue("patientName", option.label);
                } else if (name === "doctorId") {
                  setValue("doctorName", option.label);
                } else if (name === "clinicId") {
                  setValue("clinicName", option.label);
                }
              }}
            />
          );
        }}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const SearchInput = ({ placeholder, className }) => {
  return (
    <div className={`${className} flex items-center relative`}>
      <Input placeholder={placeholder} className="!h-[35px]" />
      <AddButton className="absolute right-0 !bg-transparent">
        <Search size={16} className="text-text" />
      </AddButton>
    </div>
  );
};

const TextAreaInput = ({ placeholder, className }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <TextArea
        placeholder={placeholder}
        autoSize={{ minRows: 2, maxRows: 4 }}
        className="pr-10"
      />
    </div>
  );
};

const TextAreaInputWithLabel = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  control,
  disabled,
  className,
  isCheckup
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {label && <label className="text-small 2xl:text-medium text-gray" htmlFor="grid-password">
        {label}&nbsp;:
      </label>}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <TextArea
            type={type}
            placeholder={input}
            className={`placeholder:!text-gray w-full !bg-transparent !rounded-medium !border-border focus:!border-secondary focus:!ring-0 focus:!outline-none`}
            status={errors[name] ? "error" : ""}
            value={controllerField.value}
            onChange={controllerField.onChange}
            disabled={disabled}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};


const DatePick = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  control,
  disabled,
  className,
}) => {
  return (
    <div className={`relative w-full mb-3 ${className}`}>
      {label && (
        <label
          className="block text-small 2xl:text-medium mb-2 text-text"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <DatePicker
            placeholder={input}
            selected={controllerField.value}
            status={errors[name] ? "error" : ""}
            onChange={controllerField.onChange}
            className="!h-[40px] placeholder:!text-gray w-full"
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const TimePick = ({
  label,
  input,
  type,
  register,
  errors,
  name,
  control,
  disabled,
  className,
}) => {
  return (
    <div className={`relative w-full mb-3 ${className}`}>
      {label && (
        <label
          className="block text-small 2xl:text-medium mb-2 text-text"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <DatePicker
            placeholder={input}
            selected={controllerField.value}
            status={errors[name] ? "error" : ""}
            onChange={controllerField.onChange}
            className="!h-[40px] placeholder:!text-gray w-full"
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export {
  TextInput,
  TextInputs,
  SelectInputs,
  SelectInputWithoutLabel,
  MultipleSelectInputs,
  SingleSelectInputs,
  SearchInput,
  TextAreaInput,
  TextInputsWithUnderLine,
  TextAreaInputWithLabel,
  DatePick,
  PasswordInputs
};
