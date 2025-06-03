import { checkUpFields } from "@/utils/formField/formFIelds";
import React, { useContext, useState } from "react";
import {
  SingleSelectInputs,
  TextAreaInputWithLabel,
  TextInputsWithUnderLine,
} from "../../formInput/TextInput";
import { DateInputWithValidation } from "../../Inputs/DateInput";
import DeleteButton from "@/utils/buttons/DeleteButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAppointmentSchema, checkUpSchema } from "@/utils/schema";
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
const PatientInformation = ({ data: patient }) => {
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const { doctors, patients, fetchPatients, fetchDoctorDropdown, user, TOKEN } =
    useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkUpSchema),
    defaultValues: {
      bloodPressure: patient?.bloodPressure || "",
      weight: patient?.weight || "",
      charges: patient?.charges || "",
      prescription: patient?.prescription || "",
      diagnosis: patient?.diagnosis || "",
      followupDate: patient?.followupDate || "",
      tokenNumber: patient?.tokenNumber || "",
    },
  });
  const [treatments, setTreatments] = useState([
    { id: Date.now().toString(), treatment: "", description: "" },
  ]);

  const addTreatment = () => {
    const newTreatment = {
      id: Date.now().toString(),
      treatment: "",
      description: "",
    };
    setTreatments([...treatments, newTreatment]);
    console.log([...treatments, newTreatment]);
  };
  const removeTreatment = (id) => {
    if (treatments.length > 1) {
      setTreatments(treatments.filter((t) => t.id !== id));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const payload = {
        id: patient.id,
        patientName: patient.patientName,
        clinicName: patient.clinicName,
        doctorName: patient.doctorName,
        visitDate: checked
          ? patient.visitDate
          : dayjs(data.followupDate).format("YYYY-MM-DD"),
        tokenNumber: patient.tokenNumber,
        status: checked ? 1 : 0,
        charges: data.charges,
        prescription: data.prescription,
        diagnosis: data.diagnosis,
        weight: data.weight,
        bloodPressure:
          `${data.upperBp}/${data.lowerBp}` || patient.bloodPressure,
        followupDate: dayjs(data.followupDate).format("YYYY-MM-DD"),
        patientId: patient.patientId,
        clinicId: patient.clinicId,
        doctorId: patient.doctorId,
        treatments: [],
      };
      const response = await Axios({
        ...summary.setAppointment,
        params: {
          token: TOKEN,
          appointment: JSON.stringify(payload),
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: true });
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Checkup Successfully");
        reset({});
      }else{
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
        Patient Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-ratio1 gap-y-ratio2">
          {checkUpFields.map((field, idx) => {
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
                  className="flex items-end justify-between gap-2"
                />
              );
            } else if (field?.type == "date") {
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
                  className="flex items-end justify-between gap-2"
                />
              );
            }
          })}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-ratio2 mt-ratio1">
          {checkUpFields?.slice(-2)?.map((field, idx) => (
            <TextAreaInputWithLabel
              key={idx}
              label={field?.label}
              input={field?.input}
              type={field?.type}
              register={register}
              errors={errors}
              name={field?.name}
              control={control}
              className="flex space-y-ratio2"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-ratio2 border-t pt-ratio2 border-border">
          {treatments.map((treatment, index) => (
            <div key={treatment.id} className="">
              <div className="flex justify-between gap-4">
                <SingleSelectInputs
                  label={"Treatment Name"}
                  input={"Treatment"}
                  type={"select"}
                  control={control}
                  errors={errors}
                  name={"treatment"}
                  className="flex !mb-0 flex-6 treatmentSelector"
                />
                <TextAreaInputWithLabel
                  label={"Description"}
                  input={"Description"}
                  type={"textarea"}
                  errors={errors}
                  name={"treatmentDescription"}
                  control={control}
                  className="flex space-y-ratio2 flex-10"
                  isCheckup={true}
                />
                <div className="flex items-start justify-end flex-1">
                  <div className="flex gap-2">
                    {treatments.length > 1 && (
                      <DeleteButton
                        type="button"
                        onClick={() => removeTreatment(treatment?.id)}
                        className={"!rounded-full !px-2 !py-2"}
                      >
                        <Trash2 size={16} />
                      </DeleteButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {patient.status == 0 && (
          <div className="flex items-center justify-between mt-ratio2">
            <AddButton type="button" onClick={addTreatment}>
              Add Treatment
            </AddButton>
            <div className="flex items-center gap-4">
              <Checkbox
                className="custom-checkbox pr-5 !text-small 2xl:!text-medium"
                onChange={onChange}
              >
                Check Up Completed
              </Checkbox>
              <AddButton>{loader ? <Spinner size={20} style={{ color: "white" }} /> : "Check Up"}</AddButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PatientInformation;
