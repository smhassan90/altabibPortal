import { DatePicker, Modal } from "antd";
import React from "react";
import {
  DatePick,
  MultipleSelectInputs,
  SelectInputs,
  SingleSelectInputs,
  TextAreaInputWithLabel,
  TextAreaInputWithoutLabel,
  TextInputs,
} from "../formInput/TextInput";
import { Checkbox } from "antd";
import AddButton from "@/utils/buttons/AddButton";
import { Plus } from "lucide-react";
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
  treatments,
  setTreatments,
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
      <div className="flex items-center justify-between px-ratio2">
        <h2 className="text-medium">{title}</h2>
        {title === "Add New Appointment" && (
          <Checkbox className="custom-checkbox pr-5" onChange={onChange}>
            You Are New Patient
          </Checkbox>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 bg-white px-ratio2 max-h-[450px] overflow-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
          {formFields?.map((field, index) => {
            if (field.type === "select") {
              if (field.name === "gender" && !newPatientCheck) {
                return null;
              }
              return (
                <SelectInputs
                  key={index}
                  // label={field.label}
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
                  // label={field.label}
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
                  // label={field.label}
                  input={field.input}
                  type={field.type}
                  control={control}
                  errors={errors}
                  name={field.name}
                  options={[]}
                />
              );
            }
            if (field.type === "text" || field.type === "number") {
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
                  // label={field.label}
                  input={field.input}
                  type={field.type}
                  control={control}
                  errors={errors}
                  name={field.name}
                />
              );
            }
            if (field.type === "date") {
              return (
                <DatePick
                  key={index}
                  input={field.input}
                  control={control}
                  errors={errors}
                  name={field.name}
                  className={"datePick"}
                />
              );
            }
          })}
        </div>
        <div className="grid grid-cols-1 gap-ratio2">
          {formFields.slice(-2)?.map((field, index) => {
            if (field.type === "textarea") {
              return (
                <TextAreaInputWithLabel
                  key={index}
                  // label={field?.label}
                  input={field?.input}
                  type={field?.type}
                  errors={errors}
                  name={field?.name}
                  control={control}
                  className="flex flex-col space-y-ratio2"
                />
              );
            }
          })}
        </div>
        {title === "Add New Appointment" && (
          <div className="mt-ratio2 border-t border-border">
            {treatments.map((treatment, index) => (
              <div className="flex items-start gap-ratio2 pt-ratio2">
                <SingleSelectInputs
                  // label={field.label}
                  input={"Treatment"}
                  type={"select"}
                  control={control}
                  errors={errors}
                  name={"treatment"}
                  className="flex-1 !mb-0"
                />
                <TextAreaInputWithLabel
                  // label={field?.label}
                  input={"Description"}
                  type={"textarea"}
                  errors={errors}
                  name={"treatmentDescription"}
                  control={control}
                  className="flex flex-col space-y-ratio2 flex-2"
                />
              </div>
            ))}
            <AddButton type="button" className="w-full !text-center justify-center mt-2 !bg-transparent !text-secondary font-semibold !text-medium border-2 !border-dashed !border-border !py-2" onClick={() => setTreatments([...treatments, { treatmentName: "", treatmentDescription: "" }])}>
              <Plus size={16} />
              Add More Treatment
            </AddButton>
          </div>
        )}
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
