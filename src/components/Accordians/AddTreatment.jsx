import AddButton from "@/utils/buttons/AddButton";
import { Input, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { TextAreaInputWithLabel } from "../formInput/TextInput";

const AddTreatment = ({
  treatments,
  setTreatments,
  control,
  errors,
  treatmentName,
  isEdit = false,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "treatment",
  });

  useEffect(() => {
    if (!isEdit) {
      if (fields.length === 0) {
        append({ name: "", detail: "" });
      }
    }
  }, [fields.length, append]);

  const addMoreTreatment = () => {
    setTreatments([
      ...treatments,
      {
        name: "",
        detail: "",
      },
    ]);
    append({ name: "", detail: "" });
  };

  const removeTreatment = (treatment) => {
    if (treatments.length > 1) {
      setTreatments(treatments.filter((item) => item.id !== treatment?.id));
      remove(treatment.name);
    }
  };
  return (
    <div className="mt-ratio2">
      {treatments.map((treatment, index) => (
        <div className="flex justify-between gap-ratio2 mt-ratio2">
          <div
            key={index}
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-ratio2"
          >
            <div className={`relative w-full`}>
              <label
                className={`block text-small 2xl:text-medium mb-1 text-text`}
                htmlFor="grid-password"
              >
                Treatment Name&nbsp;:
              </label>
              <Controller
                control={control}
                name={`treatment.${index}.name`}
                render={({ field: controllerField }) => {
                  // console.log(controllerField);
                  return (
                    <Select
                      options={treatmentName}
                      className="!h-[40px] placeholder:!text-gray w-full flex-2 !rounded-medium !border-border focus:!border-secondary focus:!ring-0 focus:!outline-none"
                      placeholder="Select Treatment"
                      status={
                        errors?.treatments?.[index]?.name
                          ? "error"
                          : ""
                      }
                      value={
                        controllerField.value
                          ? controllerField.value
                          : undefined
                      }
                      onChange={(value, option) => {
                        controllerField.onChange(value);
                      }}
                    />
                  );
                }}
              />
              {errors?.treatments?.[index]?.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors?.treatments?.[index]?.name?.message}
                </span>
              )}
            </div>
            <TextAreaInputWithLabel
              label={"Description"}
              input={"Enter Description"}
              type={"textarea"}
              errors={errors}
              name={`treatment.${index}.detail`}
              control={control}
              className=""
            />
          </div>
          {treatments.length > 1 && (
            <Trash2
              onClick={() => removeTreatment(treatment)}
              size={20}
              className="text-red-500"
            />
          )}
        </div>
      ))}
      <AddButton
        type="button"
        className="w-full !text-center justify-center mt-2 !bg-transparent !text-secondary font-semibold !text-medium border-2 !border-dashed !border-border !py-2"
        onClick={addMoreTreatment}
      >
        <Plus size={16} />
          Add Treatment
      </AddButton>
    </div>
  );
};

export default AddTreatment;
