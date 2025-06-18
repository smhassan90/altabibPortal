import { checkUpFields, doctorFields } from "@/utils/formField/formFIelds";
import React, { useContext, useState } from "react";
import {
  MultipleSelectInputs,
  MultipleSelectInputsWithUnderLine,
  PasswordInputs,
  PasswordInputsWithUnderLine,
  SelectInputs,
  SelectInputsWithUnderLine,
  SingleSelectInputs,
  TextAreaInputWithLabel,
  TextInputsWithUnderLine,
} from "../../formInput/TextInput";
import { DateInputWithValidation } from "../../Inputs/DateInput";
import DeleteButton from "@/utils/buttons/DeleteButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAppointmentSchema,
  checkUpSchema,
  editDoctorSchema,
} from "@/utils/schema";
import { AppContext } from "@/provider/AppProvider";
import AddButton from "@/utils/buttons/AddButton";
import { Trash2 } from "lucide-react";
import { Checkbox } from "antd";
import Spinner from "@/components/Spinner/Spinner";
import dayjs from "dayjs";
import { Axios, summary } from "@/config/summaryAPI";
import { AxiosError } from "@/utils/axiosError";
import qs from "qs";
import toast from "react-hot-toast";
import AddDoctorClinic from "@/components/Accordians/AddDoctorClinic";
import { ReadOnlyInputWithLabel, ReadOnlyMapingWithLabel } from "@/components/Inputs/ReadableInputs";
const title = "text-small 2xl:text-medium text-gray";
const text = "text-small 2xl:text-medium text-text";
const DoctorInformation = ({
  data: doctor,
  mode,
  setExpandedRow,
  fetchAppointment,
}) => {
  console.log(mode, "mode");
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const { TOKEN, qualification, specialization, clinics } =
    useContext(AppContext);

  const sortedClinic =
    clinics &&
    clinics?.map((clinic) => ({
      label: clinic.name,
      value: clinic.id,
    }));

  const doctorTypes = [
    { id: 1, name: "Physician" },
    { id: 2, name: "Dentist" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editDoctorSchema),
    defaultValues: {
      doctorName: doctor?.name || "",
      userName: doctor?.userName || "",
      password: doctor?.password || "",
      address: doctor?.address || "",
      age: doctor?.age || "",
      gender: doctor?.gender || "",
      contactNumber: doctor?.contactNumber || "",
      type: doctor.type || "",
      specialization: doctor.specialization.map((spec) => spec.id) || [],
      qualification: doctor?.qualification.map((qual) => qual.id) || [],
      doctorClinic: doctor.clinic.map((clinic) => {
        return {
          clinicId: clinic.clinic.id,
          charges: clinic.charges,
          startTime: clinic.startTime,
          endTime: clinic.endTime,
          updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
      }),
    },
  });
  const [doctorClinics, setDoctorClinics] = useState(doctor?.clinic);

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const clinicIds = data.doctorClinic.map((clinic) => {
        return clinic.clinicId;
      });
      const payload = {
        id: doctor.id,
        name: data.doctorName || doctor.doctorName,
        address: data.address || doctor.address,
        gender: data.gender || doctor.gender,
        password: doctor.password,
        age: data.age || doctor.age,
        priority: 1,
        username: data.userName || doctor.username,
        type: data.type || doctor.type,
        updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        clinicIds: clinicIds,
        qualificationIds: data.qualification,
        specializationIds: data.specialization,
        doctorClinics: data.doctorClinic,
      };
      const response = await Axios({
        ...summary.addOrUpdateDoctor,
        data: payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Doctor Updated Successfully");
        setExpandedRow("");
        reset({});
      } else {
        toast.error(`Failed ${response?.data?.status}`);
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <div>
      <h2 className="text-text text-medium 2xl:text-large font-semibold">
        Doctor Information
      </h2>
      {mode == "editable" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-ratio1 gap-y-ratio2 mt-ratio2">
            {doctorFields.map((field, idx) => {
              if (field?.type == "text") {
                return (
                  <TextInputsWithUnderLine
                    key={idx}
                    label={field?.label}
                    // input={field?.input}
                    type={field?.type}
                    register={register}
                    errors={errors}
                    name={field?.name}
                    control={control}
                    className=""
                  />
                );
              }
              if (field?.type == "date") {
                return (
                  <DateInputWithValidation
                    key={idx}
                    label={field?.label}
                    // input={field?.input}
                    type={field?.type}
                    register={register}
                    errors={errors}
                    name={field?.name}
                    control={control}
                    className=""
                  />
                );
              }
              if (field.type === "select") {
                return (
                  <SelectInputsWithUnderLine
                    key={idx}
                    label={field.label}
                    input={field.input}
                    type={field.type}
                    control={control}
                    errors={errors}
                    name={field.name}
                    options={field.options}
                    className=""
                  />
                );
              }
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-ratio1 gap-y-ratio2 py-3 border-b border-border">
            {doctorFields?.slice(-2)?.map((field, idx) => {
              if (field.type === "selectoption") {
                const isQualification = field.name
                  .toLowerCase()
                  .includes("qualification");
                const isSpecialization = field.name
                  .toLowerCase()
                  .includes("specialization");
                return (
                  <MultipleSelectInputsWithUnderLine
                    key={idx}
                    label={field.label}
                    input={field.input}
                    type={field.type}
                    control={control}
                    errors={errors}
                    name={field.name}
                    className=""
                    options={
                      isQualification
                        ? qualification
                        : isSpecialization
                        ? specialization
                        : []
                    }
                  />
                );
              }
            })}
          </div>
          <h2 className="text-text text-medium 2xl:text-large font-semibold mt-ratio2">
            Clinic Information
          </h2>
          <AddDoctorClinic
            doctorClinics={doctorClinics}
            setDoctorClinics={setDoctorClinics}
            control={control}
            errors={errors}
            clinics={sortedClinic}
            isEdit={false}
          />
          <div className="flex items-center justify-end mt-ratio2">
            <AddButton>
              {loader ? (
                <Spinner size={20} style={{ color: "white" }} />
              ) : (
                "Update Doctor"
              )}
            </AddButton>
          </div>
        </form>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-ratio2 mt-ratio2">
            <ReadOnlyInputWithLabel
              label={"Doctor Name"}
              value={doctor?.name}
            />
            <ReadOnlyInputWithLabel
              label={"User Name"}
              value={doctor?.userName}
            />
            <ReadOnlyInputWithLabel
              label={"Address"}
              value={doctor?.address}
            />
            <ReadOnlyInputWithLabel
              label={"Age"}
              value={doctor?.age}
            />
            <ReadOnlyInputWithLabel
              label={"Gender"}
              value={doctor?.gender}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-ratio2 mt-ratio2 pb-ratio2 border-b border-border">
            <ReadOnlyMapingWithLabel
              label={"Specialization"}
              value={doctor?.specialization}
            />
            <ReadOnlyMapingWithLabel
              label={"Qualification"}
              value={doctor?.qualification}
            />
          </div>
          <h2 className="text-text text-medium 2xl:text-large font-semibold mt-ratio2">
            Clinic Information
          </h2>
          {doctor.clinic.map((clinic) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-ratio2 py-ratio2 border-b border-border">
              <ReadOnlyInputWithLabel
                label={"Clinic Name"}
                value={clinic?.clinic?.name}
              />
              <ReadOnlyInputWithLabel
                label={"Charges"}
                value={clinic?.charges}
              />
              <ReadOnlyInputWithLabel
                label={"Start Time"}
                value={clinic?.startTime}
              />
              <ReadOnlyInputWithLabel
                label={"End Time"}
                value={clinic?.endTime}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DoctorInformation;
