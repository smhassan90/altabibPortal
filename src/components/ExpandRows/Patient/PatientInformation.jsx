import { checkUpFields } from "@/utils/formField/formFIelds";
import React, { useContext, useEffect, useState } from "react";
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
import AddTreatment from "@/components/Accordians/AddTreatment";
import {
  ReadOnlyInputWithLabel,
  ReadOnlyTextAreaWithLabel,
} from "@/components/Inputs/ReadableInputs";
const title = "text-small 2xl:text-medium text-gray";
const text = "text-small 2xl:text-medium text-text";
const PatientInformation = ({
  data: patient,
  mode,
  setExpandedRow,
  fetchAppointment,
}) => {
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  console.log(patient, "patient");
  const {
    doctors,
    patients,
    treatments: treatmentBank,
    fetchPatients,
    fetchDoctorDropdown,
    fetchTreatmentDropdown,
    user,
    TOKEN,
  } = useContext(AppContext);

  useEffect(() => {
    fetchTreatmentDropdown();
  }, []);

  const sortedTreatment = treatmentBank?.map((treatment) => ({
    label: treatment?.name,
    value: treatment?.name,
  }));

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
      followupDate: patient?.followupDate
        ? dayjs(patient?.followupDate).format("YYYY-MM-DD")
        : dayjs(patient?.visitDate).format("YYYY-MM-DD"),
      tokenNumber: patient?.tokenNumber || "",
      treatment: patient.treatments ? patient.treatments.map((treatment) => {
        return {
          name: treatment.name,
          detail: treatment.detail,
        };
      }) : [{name: "", detail: ""}],
    },
  });
  const [treatments, setTreatments] = useState(patient.treatments || [{name: "", detail: ""}]);
  console.log(treatments, "treatments");
  const onSubmit = async (data) => {
    console.log(data, "data");
    // return
    try {
      setLoader(true);
      console.log(patient.visitDate);
      console.log(data.followupDate);
      const payload = {
        id: patient.id,
        patientName: patient.patientName,
        clinicName: patient.clinicName,
        doctorName: patient.doctorName,
        visitDate: patient.visitDate,
        tokenNumber: patient.tokenNumber,
        status: checked ? 1 : 0,
        charges: data.charges,
        prescription: data.prescription,
        diagnosis: data.diagnosis,
        weight: data.weight,
        bloodPressure: data.bloodPressure || patient.bloodPressure,
        followupDate:
          patient.visitDate == dayjs(data.followupDate).format("YYYY-MM-DD")
            ? ""
            : dayjs(data.followupDate).format("YYYY-MM-DD"),
        patientId: patient.patientId,
        clinicId: patient.clinicId,
        doctorId: patient.doctorId,
        treatments: patient.treatments ? data.treatment.filter(treatment=>
          !patient.treatments.some(pt => pt.name === treatment.name)
          ) : data.treatment,
      };

      console.log(payload, "payload");
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
        setExpandedRow("");
        fetchAppointment();
        reset({});
      } else {
        toast.error(`Failed ${response?.data?.status}`);
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
      // setTreatments([
      //   {
      //     id: 1,
      //     name: "",
      //     detail: "",
      //   },
      // ]);
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
      {mode == "editable" ? (
        <form onSubmit={handleSubmit(onSubmit)} className=" rounded-large">
          {/* --- Inputs Grid --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-ratio2 mt-ratio2">
            {checkUpFields.map((field, idx) => {
              if (field?.type === "text") {
                return (
                  <TextInputsWithUnderLine
                    label={field?.label}
                    type={field?.type}
                    register={register}
                    errors={errors}
                    name={field?.name}
                    control={control}
                    className=""
                  />
                );
              } else if (field?.type === "date") {
                return (
                  <DateInputWithValidation
                    label={field?.label}
                    type={field?.type}
                    register={register}
                    errors={errors}
                    name={field?.name}
                    control={control}
                    className=""
                  />
                );
              }
            })}
          </div>

          {/* --- Textareas --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-ratio2 py-ratio2 border-b border-border">
            {checkUpFields?.slice(-2)?.map((field, idx) => (
              <TextAreaInputWithLabel
                label={field?.label}
                input={field?.input}
                type={field?.type}
                register={register}
                errors={errors}
                name={field?.name}
                control={control}
                className=""
              />
            ))}
          </div>

          <AddTreatment
            treatments={treatments}
            setTreatments={setTreatments}
            control={control}
            errors={errors}
            treatmentName={sortedTreatment}
            // isEdit={true}
          />
          <div className="flex justify-end mt-ratio2">
            <Checkbox
              className="!text-small 2xl:!text-medium"
              onChange={onChange}
            >
              Check Up Completed
            </Checkbox>
            <AddButton>
              {loader ? (
                <Spinner size={20} style={{ color: "white" }} />
              ) : (
                "Check Up"
              )}
            </AddButton>
          </div>
        </form>
      ) : (
        <>
          {/* Patient Basic Info - 3 per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-ratio2 mt-ratio2">
            <ReadOnlyInputWithLabel
              label={"Blood Pressure"}
              value={patient.bloodPressure}
            />
            <ReadOnlyInputWithLabel label={"Weight"} value={patient.weight} />
            <ReadOnlyInputWithLabel
              label={"FollowUp Date"}
              value={patient.followupDate}
            />
            <ReadOnlyInputWithLabel
              label={"Token Number"}
              value={patient.tokenNumber}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-ratio2 mt-ratio2 pb-ratio2 border-b border-border">
            <ReadOnlyTextAreaWithLabel
              label={"Prescription"}
              value={patient.prescription}
            />
            <ReadOnlyTextAreaWithLabel
              label={"Diagnosis"}
              value={patient.diagnosis}
            />
          </div>
          <h2 className="text-text text-medium 2xl:text-large font-semibold mt-ratio2">
            Treatment Information
          </h2>
          {/* Treatments */}
          <div className="mt-ratio2">
            {patient?.treatments?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {patient?.treatments?.map((record, index) => (
                  <div key={index} className="grid grid-cols-2 gap-ratio2">
                    <ReadOnlyInputWithLabel
                      label={"Treatment Name"}
                      value={record?.name}
                    />
                    <ReadOnlyTextAreaWithLabel
                      label={"Treatment Description"}
                      value={record?.detail}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-medium text-text text-center">No Treatments</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PatientInformation;
