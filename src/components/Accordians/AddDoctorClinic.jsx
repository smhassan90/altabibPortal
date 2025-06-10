import AddButton from "@/utils/buttons/AddButton";
import { Input, Select, TimePicker } from "antd";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";

const AddDoctorClinic = ({
  doctorClinics,
  setDoctorClinics,
  control,
  errors,
  clinics,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "doctorClinics",
  });

  console.log(fields, "fields");

  useEffect(() => {
    if (fields.length === 0) {
      append({ clinicId: "", charges: "", startTime: "", endTime: "" });
    }
  }, [fields.length, append]);

  const addMoreClinics = () => {
    setDoctorClinics([
      ...doctorClinics,
      { clinicId: "", startTime: "", endTime: "", charges: "" },
    ]);
    append({ clinicId: "", charges: "", startTime: "", endTime: "" });
  };
  return (
    <div className="mt-ratio2">
      {doctorClinics.map((clinic, index) => (
        <div>
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 gap-ratio2 pt-ratio2 pb-ratio1 border-t border-border"
          >
            <div className={`relative w-full`}>
              <label
                className={`block text-small 2xl:text-medium mb-2 text-text`}
                htmlFor="grid-password"
              >
                Clinic Name&nbsp;:
              </label>
              <Controller
                control={control}
                name={name}
                render={({ field: controllerField }) => {
                  return (
                    <Select
                      options={clinics}
                      className="!h-[40px] placeholder:!text-gray w-full flex-2"
                      placeholder="Select Clinic"
                      status={errors[name] ? "error" : ""}
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
              {errors?.doctorClinics?.[index]?.clinicId && (
                <span className="text-red-500 text-xs mt-1">
                  {errors?.doctorClinics?.[index]?.clinicId?.message}
                </span>
              )}
              {errors[name] && (
                <span className="text-red-500 text-sm">
                  {errors[name]?.message}
                </span>
              )}
            </div>
            <div className="relative w-full">
              <label
                className="block text-small 2xl:text-medium mb-2 text-text"
                htmlFor="grid-password"
              >
                Charges&nbsp;:
              </label>
              <Controller
                control={control}
                name={`${name}.${index}.charges`}
                render={({ field: controllerField }) => (
                  <Input
                    type="number"
                    placeholder="Enter Doctor Charges"
                    className="!h-[40px] placeholder:!text-gray"
                    status={errors[name] ? "error" : ""}
                    value={controllerField.value}
                    onChange={controllerField.onChange}
                  />
                )}
              />
              {errors?.doctorClinics?.[index]?.charges && (
                <span className="text-red-500 text-xs mt-1">
                  {errors?.doctorClinics?.[index]?.charges?.message}
                </span>
              )}
            </div>
            <div className={`relative w-full`}>
              <label className="block text-small 2xl:text-medium mb-2 text-text">
                Start Time&nbsp;:
              </label>
              <Controller
                control={control}
                name={`${name}.${index}.startTime`}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TimePicker
                      use12Hours={false}
                      format="HH:mm"
                      className="!h-[40px] placeholder:!text-gray w-full"
                      minuteStep={15}
                      value={value ? dayjs(value, "HH:mm") : null}
                      onChange={(time, timeString) => {
                        const timeStr = time?.format("HH:mm");
                        console.log(timeStr);
                        onChange(timeStr);
                      }}
                    />
                    {errors?.doctorClinics?.[index]?.startTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.doctorClinics[index].startTime.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className={`relative w-full`}>
              <label className="block text-small 2xl:text-medium mb-2 text-text">
                End Time&nbsp;:
              </label>
              <Controller
                control={control}
                name={`${name}.${index}.startTime`}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TimePicker
                      use12Hours={false}
                      format="HH:mm"
                      className="!h-[40px] placeholder:!text-gray w-full"
                      minuteStep={15}
                      value={value ? dayjs(value, "HH:mm") : null}
                      onChange={(time, timeString) => {
                        const timeStr = time?.format("HH:mm");
                        console.log(timeStr);
                        onChange(timeStr);
                      }}
                    />
                    {errors?.doctorClinics?.[index]?.endTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.doctorClinics[index].endTime.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          
        </div>
      ))}
      <AddButton
        type="button"
        className="w-full !text-center justify-center mt-2 !bg-transparent !text-secondary font-semibold !text-medium border-2 !border-dashed !border-border !py-2"
        onClick={addMoreClinics}
      >
        <Plus size={16} />
        Add More Clinics
      </AddButton>
    </div>
  );
};

export default AddDoctorClinic;
