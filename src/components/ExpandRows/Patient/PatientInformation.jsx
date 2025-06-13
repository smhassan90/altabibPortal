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
const title = "text-small 2xl:text-medium text-gray";
const text = "text-small 2xl:text-medium text-text";
const PatientInformation = ({ data: patient, mode, setExpandedRow, fetchAppointment }) => {
  console.log(mode, "mode");
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
      followupDate: dayjs(patient.followupDate).format("YYYY-MM-DD") || "",
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
        visitDate: patient.visitDate,
        tokenNumber: patient.tokenNumber,
        status: checked ? 1 : 0,
        charges: data.charges,
        prescription: data.prescription,
        diagnosis: data.diagnosis,
        weight: data.weight,
        bloodPressure: data.bloodPressure || patient.bloodPressure,
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
        setExpandedRow("")
        fetchAppointment()
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
        Patient Information
      </h2>
      {mode == "editable" ? (
        // <form onSubmit={handleSubmit(onSubmit)}>
        //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-ratio1 gap-y-ratio2 mt-ratio2">
        //     {checkUpFields.map((field, idx) => {
        //       if (field?.type == "text") {
        //         return (
        //           <TextInputsWithUnderLine
        //             key={idx}
        //             label={field?.label}
        //             // input={field?.input}
        //             type={field?.type}
        //             register={register}
        //             errors={errors}
        //             name={field?.name}
        //             control={control}
        //             className="flex items-center justify-between gap-ratio2"
        //           />
        //         );
        //       } else if (field?.type == "date") {
        //         return (
        //           <DateInputWithValidation
        //             key={idx}
        //             label={field?.label}
        //             // input={field?.input}
        //             type={field?.type}
        //             register={register}
        //             errors={errors}
        //             name={field?.name}
        //             control={control}
        //             className="flex items-center justify-between gap-ratio2"
        //           />
        //         );
        //       }
        //     })}
        //   </div>
        //   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-ratio1 gap-y-ratio2 mt-3">
        //     {checkUpFields?.slice(-2)?.map((field, idx) => (
        //       <TextAreaInputWithLabel
        //         key={idx}
        //         label={field?.label}
        //         input={field?.input}
        //         type={field?.type}
        //         register={register}
        //         errors={errors}
        //         name={field?.name}
        //         control={control}
        //         className="flex justify-between gap-ratio2"
        //       />
        //     ))}
        //   </div>
        //   <div className="grid grid-cols-1 gap-4 mt-ratio1 pt-ratio1 border-t pt-ratio2 border-border">
        //     {treatments.map((treatment, index) => (
        //       <div key={treatment.id} className="">
        //         <div className="flex justify-between gap-4">
        //           <SingleSelectInputs
        //             label={"Treatment Name"}
        //             input={"Treatment"}
        //             type={"select"}
        //             control={control}
        //             errors={errors}
        //             name={"treatment"}
        //             className="flex !mb-0 flex-6 treatmentSelector"
        //           />
        //           <TextAreaInputWithLabel
        //             label={"Description"}
        //             input={"Description"}
        //             type={"textarea"}
        //             errors={errors}
        //             name={"treatmentDescription"}
        //             control={control}
        //             className="flex justify-between gap-ratio2 flex-10"
        //             isCheckup={true}
        //           />
        //           <div className="flex items-start justify-end flex-1">
        //             <div className="flex gap-2">
        //               {treatments.length > 0 && (
        //                 <DeleteButton
        //                   type="button"
        //                   onClick={() => removeTreatment(treatment?.id)}
        //                   className={"!rounded-full !px-2 !py-2"}
        //                 >
        //                   <Trash2 size={16} />
        //                 </DeleteButton>
        //               )}
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </div>
        //   {patient?.status == 0 && (
        //     <div className="flex items-center justify-between mt-ratio2">
        //       <AddButton type="button" onClick={addTreatment}>
        //         Add Treatment
        //       </AddButton>
        //       <div className="flex items-center gap-4">
        //         <Checkbox
        //           className="custom-checkbox pr-5 !text-small 2xl:!text-medium"
        //           onChange={onChange}
        //         >
        //           Check Up Completed
        //         </Checkbox>
        //         <AddButton>
        //           {loader ? (
        //             <Spinner size={20} style={{ color: "white" }} />
        //           ) : (
        //             "Check Up"
        //           )}
        //         </AddButton>
        //       </div>
        //     </div>
        //   )}
        // </form>
//         <form
//   onSubmit={handleSubmit(onSubmit)}
//   className="bg-white p-6 rounded-lg shadow-md space-y-6"
// >
//   {/* --- Inputs Grid --- */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
//     {checkUpFields.map((field, idx) => {
//       if (field?.type === "text") {
//         return (
//           <div key={idx} className="flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">{field?.label}</label>
//             <TextInputsWithUnderLine
//               type={field?.type}
//               register={register}
//               errors={errors}
//               name={field?.name}
//               control={control}
//               className="!py-1 !text-sm"
//             />
//           </div>
//         );
//       } else if (field?.type === "date") {
//         return (
//           <div key={idx} className="flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">{field?.label}</label>
//             <DateInputWithValidation
//               type={field?.type}
//               register={register}
//               errors={errors}
//               name={field?.name}
//               control={control}
//               className="!py-1 !text-sm"
//             />
//           </div>
//         );
//       }
//     })}
//   </div>

//   {/* --- Textareas --- */}
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {checkUpFields?.slice(-2)?.map((field, idx) => (
//       <div key={idx} className="flex flex-col">
//         <label className="text-sm text-gray-700 mb-1">{field?.label}</label>
//         <TextAreaInputWithLabel
//           input={field?.input}
//           type={field?.type}
//           register={register}
//           errors={errors}
//           name={field?.name}
//           control={control}
//           className="!py-1 !text-sm"
//         />
//       </div>
//     ))}
//   </div>

//   {/* --- Treatments --- */}
//   <div className="space-y-4 border-t border-gray-200 pt-4">
//     {treatments.map((treatment, index) => (
//       <div key={treatment.id}>
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//           <div className="lg:col-span-3 flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">Treatment Name</label>
//             <SingleSelectInputs
//               input={"Treatment"}
//               type={"select"}
//               control={control}
//               errors={errors}
//               name={"treatment"}
//               className="!py-1 !text-sm"
//             />
//           </div>
//           <div className="lg:col-span-8 flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">Description</label>
//             <TextAreaInputWithLabel
//               input={"Description"}
//               type={"textarea"}
//               errors={errors}
//               name={"treatmentDescription"}
//               control={control}
//               className="!py-1 !text-sm"
//               isCheckup={true}
//             />
//           </div>
//           <div className="lg:col-span-1 flex justify-end items-start pt-6">
//             {treatments.length > 0 && (
//               <DeleteButton
//                 type="button"
//                 onClick={() => removeTreatment(treatment?.id)}
//                 className="!rounded-full !px-2 !py-2 bg-red-100 hover:bg-red-200"
//               >
//                 <Trash2 size={16} />
//               </DeleteButton>
//             )}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>

//   {/* --- Buttons --- */}
//   {patient?.status === 0 && (
//     <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-gray-200 pt-4">
//       <AddButton type="button" onClick={addTreatment}>
//         Add Treatment
//       </AddButton>
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//         <Checkbox
//           className="!text-sm"
//           onChange={onChange}
//         >
//           Check Up Completed
//         </Checkbox>
//         <AddButton>
//           {loader ? (
//             <Spinner size={20} style={{ color: "white" }} />
//           ) : (
//             "Check Up"
//           )}
//         </AddButton>
//       </div>
//     </div>
//   )}
// </form>
<form
  onSubmit={handleSubmit(onSubmit)}
  className="bg-white p-4 rounded-lg shadow-md space-y-6"
>
  {/* --- Inputs Grid --- */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-1 gap-y-1">
    {checkUpFields.map((field, idx) => {
      if (field?.type === "text") {
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-700 ">{field?.label}</label>
            <TextInputsWithUnderLine
              type={field?.type}
              register={register}
              errors={errors}
              name={field?.name}
              control={control}
              className="!py-1 !text-sm"
            />
          </div>
        );
      } else if (field?.type === "date") {
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-700 ">{field?.label}</label>
            <DateInputWithValidation
              type={field?.type}
              register={register}
              errors={errors}
              name={field?.name}
              control={control}
              className="!py-1 !text-sm"
            />
          </div>
        );
      }
    })}
  </div>

  {/* --- Textareas --- */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 ">
    {checkUpFields?.slice(-2)?.map((field, idx) => (
      <div key={idx} className="flex flex-col">
        <label className="text-sm text-gray-700">{field?.label}</label>
        <TextAreaInputWithLabel
          input={field?.input}
          type={field?.type}
          register={register}
          errors={errors}
          name={field?.name}
          control={control}
          className="!py-1 !text-sm"
        />
      </div>
    ))}
  </div>

  {/* --- Treatments Section --- */}
  <div className="space-y-4 border-t border-gray-200 pt-4 mt-6 bg-gray-50 p-4 rounded-md shadow-sm">
    {treatments.map((treatment, index) => (
      <div key={treatment.id}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3 flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Treatment Name</label>
            <SingleSelectInputs
              input={"Treatment"}
              type={"select"}
              control={control}
              errors={errors}
              name={"treatment"}
              className="!py-1 !text-sm"
            />
          </div>
          <div className="lg:col-span-8 flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Description</label>
            <TextAreaInputWithLabel
              input={"Description"}
              type={"textarea"}
              errors={errors}
              name={"treatmentDescription"}
              control={control}
              className="!py-1 !text-sm"
              isCheckup={true}
            />
          </div>
          <div className="lg:col-span-1 flex justify-end items-start pt-6">
            {treatments.length > 0 && (
              <DeleteButton
                type="button"
                onClick={() => removeTreatment(treatment?.id)}
                className="!rounded-full !px-2 !py-2 bg-red-100 hover:bg-red-200"
              >
                <Trash2 size={16} />
              </DeleteButton>
            )}
          </div>
        </div>
      </div>
    ))}

    {/* --- Buttons Section --- */}
    {patient?.status === 0 && (
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-gray-200 pt-4">
        <AddButton type="button" onClick={addTreatment}>
          Add Treatment
        </AddButton>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Checkbox className="!text-sm" onChange={onChange}>
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
      </div>
    )}
  </div>
</form>

      ) : (
        // <>
        //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-ratio1 gap-y-ratio2 mt-ratio2">
        //     <div className="flex items-center justify-start gap-ratio1">
        //       <h5 className={`${title}`}>Blood Pressure:</h5>
        //       <p className={`${text}`}>
        //         {patient.bloodPressure || "Not Found"}
        //       </p>
        //     </div>
        //     <div className="flex items-start justify-start gap-ratio1">
        //       <h5 className={`${title}`}>Weight:</h5>
        //       <p className={`${text}`}>{patient.weight || "Not Found"}</p>
        //     </div>
        //     <div className="flex items-start justify-start gap-ratio1">
        //       <h5 className={`${title}`}>FollowUp Date:</h5>
        //       <p className={`${text}`}>{patient.followupDate || "Not Found"}</p>
        //     </div>
        //     <div className="flex items-start justify-start gap-ratio1">
        //       <h5 className={`${title}`}>Token Number:</h5>
        //       <p className={`${text}`}>{patient.tokenNumber || "Not Found"}</p>
        //     </div>
        //   </div>
        //   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-ratio1 gap-y-ratio2 mt-ratio1">
        //     <div className="flex items-start justify-start gap-ratio1">
        //       <h5 className={`${title}`}>Prescription:</h5>
        //       <p className={`${text}`}>{patient.prescription || "Not Found"}</p>
        //     </div>
        //     <div className="flex items-start justify-start gap-ratio1">
        //       <h5 className={`${title}`}>Diagnosis:</h5>
        //       <p className={`${text}`}>{patient.diagnosis || "Not Found"}</p>
        //     </div>
        //   </div>
        //   <div className="grid grid-cols-1 gap-x-ratio1 gap-y-ratio2 border-t border-border mt-ratio1 pt-ratio1">
        //     {patient?.treatments?.length > 0 ? patient?.treatments?.map((record, index) => (
        //         <div className="flex items-start gap-ratio2">
        //           <div className="flex-1 flex items-start justify-start gap-ratio1">
        //             <h5 className={`${title}`}>Treatment Name:</h5>
        //             <p className={`${text}`}>{record.treatment || "Not Found"}</p>
        //           </div>
        //           <div className="flex-2 flex items-start justify-start gap-ratio1">
        //             <h5 className={`${title}`}>Description:</h5>
        //             <p className={`${text}`}>{record.description || "Not Found"}</p>
        //           </div>
        //         </div>
        //       )) : (
        //       <p className={`${text} text-center`}>No Treatments Available</p>
        //     )}
        //   </div>
        // </>
        <>
  {/* Patient Basic Info - 3 per row */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    <div className="flex flex-col animate-fade-in-up">
      <label className="text-sm font-semibold text-gray-700 mb-1">Blood Pressure</label>
      <input
        type="text"
        readOnly
        value={patient.bloodPressure || "Not Found"}
        className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
      />
    </div>

    <div className="flex flex-col animate-fade-in-up">
      <label className="text-sm font-semibold text-gray-700 mb-1">Weight</label>
      <input
        type="text"
        readOnly
        value={patient.weight || "Not Found"}
        className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
      />
    </div>

    <div className="flex flex-col animate-fade-in-up">
      <label className="text-sm font-semibold text-gray-700 mb-1">FollowUp Date</label>
      <input
        type="text"
        readOnly
        value={patient.followupDate || "Not Found"}
        className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
      />
    </div>

    <div className="flex flex-col animate-fade-in-up">
      <label className="text-sm font-semibold text-gray-700 mb-1">Token Number</label>
      <input
        type="text"
        readOnly
        value={patient.tokenNumber || "Not Found"}
        className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
      />
    </div>

    <div className="flex flex-col animate-fade-in-up">
      <label className="text-sm font-semibold text-gray-700 mb-1">Prescription</label>
      <input
        type="text"
        readOnly
        value={patient.prescription || "Not Found"}
        className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
      />
    </div>

    <div className="flex flex-col animate-fade-in-up">
      <label className="text-sm font-semibold text-gray-700 mb-1">Diagnosis</label>
      <input
        type="text"
        readOnly
        value={patient.diagnosis || "Not Found"}
        className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
      />
    </div>
  </div>

  {/* Treatments */}
  <div className="border-t mt-8 pt-6">
    {patient?.treatments?.length > 0 ? (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {patient.treatments.map((record, index) => (
          <div key={index} className="col-span-1 animate-fade-in-up">
            <div className="flex flex-col mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-1">Treatment Name</label>
              <input
                type="text"
                readOnly
                value={record.treatment || "Not Found"}
                className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Description</label>
              <input
                type="text"
                readOnly
                value={record.description || "Not Found"}
                className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none hover:border-orange-400 focus:border-orange-400-500"
              />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-600 text-center">No Treatments Available</p>
    )}
  </div>
</>
      )}
    </div>
  );
};

export default PatientInformation;
