import AddButton from "@/utils/buttons/AddButton";
import { Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";

const AddDoctorClinic = ({
  doctorClinics,
  setDoctorClinics,
  control,
  errors,
  clinics,
  isEdit = false,
  // setDeleteModalVisible,
  removeClinics,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "doctorClinic",
  });

  console.log(doctorClinics, "doctorClinics");
  console.log(fields, "fields");

  useEffect(() => {
    if (!isEdit) {
      if (fields.length === 0) {
        append({
          id: "",
          clinicId: "",
          charges: "",
          startTime: "",
          endTime: "",
        });
      }
    }
  }, [fields.length, append]);

  const addMoreClinics = () => {
    console.log(doctorClinics.length, "doctorClinics.length");
    setDoctorClinics([
      ...doctorClinics,
      {
        id: doctorClinics.length + 1,
        clinicId: "",
        startTime: "",
        endTime: "",
        charges: "",
      },
    ]);
    append({
      id: doctorClinics.length + 1,
      clinicId: "",
      charges: "",
      startTime: "",
      endTime: "",
    });
  };

  // const removeClinics = (clinic, index) => {
  //   console.log(clinic, "clinic");
  //   console.log(index, "index");
  //   if (doctorClinics.length > 1) {
  //     // setDoctorClinics(doctorClinics.filter((item) => item.id !== clinic?.id));
  //     setDoctorClinics(doctorClinics.filter((_, i) => i !== index));
  //     remove(index);
  //   }
  // };
  return (
    <div className="mt-ratio2">
      {doctorClinics.map((clinic, index) => (
        <div key={index} className="flex justify-between gap-ratio2 mt-ratio2 pb-ratio2 border-b border-border">
          <div
            className={`w-full grid ${
              isEdit ? "grid-cols-4" : "grid-cols-2"
            } gap-ratio2`}
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
                name={`doctorClinic.${index}.clinicId`}
                render={({ field: controllerField }) => {
                  return (
                    <Select
                      options={clinics}
                      className="!h-[40px] placeholder:!text-gray w-full flex-2"
                      placeholder="Select Clinic"
                      status={
                        errors?.doctorClinic?.[index]?.clinicId ? "error" : ""
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
              {errors?.doctorClinic?.[index]?.clinicId && (
                <span className="text-red-500 text-xs mt-1">
                  {errors?.doctorClinic?.[index]?.clinicId?.message}
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
                name={`doctorClinic.${index}.charges`}
                render={({ field: controllerField }) => (
                  <Input
                    type="number"
                    placeholder="Enter Doctor Charges"
                    className="!h-[40px] placeholder:!text-gray"
                    status={
                      errors?.doctorClinic?.[index]?.charges ? "error" : ""
                    }
                    value={controllerField.value}
                    onChange={controllerField.onChange}
                  />
                )}
              />
              {errors?.doctorClinic?.[index]?.charges && (
                <span className="text-red-500 text-xs mt-1">
                  {errors?.doctorClinic?.[index]?.charges?.message}
                </span>
              )}
            </div>
            <div className={`relative w-full`}>
              <label className="block text-small 2xl:text-medium mb-2 text-text">
                Start Time&nbsp;:
              </label>
              <Controller
                control={control}
                name={`doctorClinic.${index}.startTime`}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TimePicker
                      use12Hours={false}
                      format="HH:mm"
                      className="!h-[40px] placeholder:!text-gray w-full"
                      minuteStep={15}
                      status={
                        errors?.doctorClinic?.[index]?.startTime ? "error" : ""
                      }
                      value={value ? dayjs(value, "HH:mm") : null}
                      onChange={(time, timeString) => {
                        const timeStr = time?.format("HH:mm");
                        onChange(timeStr);
                      }}
                    />
                    {errors?.doctorClinic?.[index]?.startTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.doctorClinic[index].startTime.message}
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
                name={`doctorClinic.${index}.endTime`}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TimePicker
                      use12Hours={false}
                      format="HH:mm"
                      className="!h-[40px] placeholder:!text-gray w-full"
                      minuteStep={15}
                      status={
                        errors?.doctorClinic?.[index]?.endTime ? "error" : ""
                      }
                      value={value ? dayjs(value, "HH:mm") : null}
                      onChange={(time, timeString) => {
                        const timeStr = time?.format("HH:mm");
                        onChange(timeStr);
                      }}
                    />
                    {errors?.doctorClinic?.[index]?.endTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.doctorClinic[index].endTime.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          {doctorClinics.length > 1 && (
            <Trash2
              onClick={() => {
                removeClinics(clinic, index);
                // isEdit && setDeleteModalVisible(true)
              }}
              size={20}
              className="text-red-500"
            />
          )}
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
