"use-client";
import React, { useMemo, useState } from "react";
import { Divider, Input, Select } from "antd";
import Spinner from "../Spinner/Spinner";
import { Controller } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
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
        type={
          name === "password" &&
          showPassword
            ? "text"
            : type
        }
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder={input}
        {...register(name, { required: true })}
      />
      {name === "password" && (
        <span
          onClick={() =>
            setShowPassword((prev) => (!prev))
          }
          className="cursor-pointer absolute right-3 top-9"
        >
          {showPassword ? (
            <Eye size={16} />
          ) : (
            <EyeClosed size={16} />
          )}
        </span>
      )}
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
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
}) => {
  return (
    <div className="relative w-full mb-3">
      <label
        className="block text-small mb-2 text-text"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <Input
            type={type}
            placeholder={input}
            className="!h-[35px]"
            status={errors[name] ? "error" : ""}
            value={controllerField.value}
            onChange={controllerField.onChange}
            disabled={disabled}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
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
}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="relative w-full mb-3">
      <label
        className="block text-small mb-2 text-text"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => (
          <Select
            options={options}
            className="!h-[35px] w-full"
            placeholder={input}
            status={errors[name] ? "error" : ""}
            value={controllerField.value ? controllerField.value : undefined}
            onChange={controllerField.onChange}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-small">{errors[name]?.message}</span>
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
      <label
        className="block text-small mb-2 text-text"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => {
          return (
            <Select
              mode="multiple"
              options={option}
              className="!h-[40px] w-full"
              placeholder={input}
              notFoundContent={loading ? <Spinner /> : "No data found"}
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
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
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
      <label
        className="block text-small mb-2 text-text"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: controllerField }) => {
          return (
            <Select
              options={option}
              className="!h-[35px] w-full"
              placeholder={input}
              status={errors[name] ? "error" : ""}
              value={controllerField.value ? controllerField.value : undefined}
              // onChange={controllerField.onChange}
              onChange={(value, option) => {
                controllerField.onChange(value);
              }}
            />
          );
        }}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export {
  TextInput,
  TextInputs,
  SelectInputs,
  MultipleSelectInputs,
  SingleSelectInputs,
};
