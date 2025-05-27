import { Modal } from "antd";
import React from "react";
import {
  MultipleSelectInputs,
  SelectInputs,
  SingleSelectInputs,
  TextInputs,
} from "../formInput/TextInput";
import { Checkbox } from "antd";
const FormModal = ({
  open,
  setOpen,
  title,
  formFields,
  handleSubmit,
  onSubmit,
  control,
  errors,
  onChange,
  newPatientCheck,
}) => {
  return (
    <Modal
      title=""
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      okText="Add"
      cancelText="Cancel"
      okButtonProps={{
        className: "bg-secondary text-white",
      }}
      cancelButtonProps={{
        className: "border border-gray-300 text-gray-700",
      }}
      footer={null}
      header={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      modalRender={(node) => (
        <div className="rounded-large overflow-hidden">{node}</div>
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-medium">{title}</h2>
        <Checkbox className="custom-checkbox pr-5" onChange={onChange}>
          You Are New Patient
        </Checkbox>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 max-h-[300px] overflow-auto">
          {formFields?.map((field, index) => {
            if (field.type === "select") {
              if (field.name === "gender" && !newPatientCheck) {
                return null;
              }
              return (
                <SelectInputs
                  key={index}
                  label={field.label}
                  input={field.input}
                  type={field.type}
                  control={control}
                  errors={errors}
                  name={field.name}
                  options={field.options}
                />
              );
            }
            if (field.type === "singleSelect") {
              if (field.name === "patientId" && newPatientCheck) {
                return null;
              }
              return (
                <SingleSelectInputs
                  key={index}
                  label={field.label}
                  input={field.input}
                  type={field.type}
                  control={control}
                  errors={errors}
                  name={field.name}
                />
              );
            }
            if (field.type === "selectoption") {
              return (
                <MultipleSelectInputs
                  key={index}
                  label={field.label}
                  input={field.input}
                  type={field.type}
                  control={control}
                  errors={errors}
                  name={field.name}
                  options={[]}
                />
              );
            } else {
              if (
                (field.name === "patientName" ||
                  field.name === "dob" ||
                  field.name === "contactNumber") &&
                !newPatientCheck
              ) {
                return null;
              }
              return (
                <TextInputs
                  key={index}
                  label={field.label}
                  input={field.input}
                  type={field.type}
                  control={control}
                  errors={errors}
                  name={field.name}
                />
              );
            }
          })}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 !py-1 border border-border rounded-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 !py-1 bg-secondary text-white rounded-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
