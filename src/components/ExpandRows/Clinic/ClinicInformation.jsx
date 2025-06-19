import { checkUpFields, clinicFields } from "@/utils/formField/formFIelds";
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
import {
  addAppointmentSchema,
  addClinicSchema,
  checkUpSchema,
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
const title = "text-small 2xl:text-medium text-gray";
const text = "text-small 2xl:text-medium text-text";
const ClinicInformation = ({
  data: clinic,
  mode,
  setExpandedRow,
  fetchAppointment,
}) => {
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
    resolver: zodResolver(addClinicSchema),
    defaultValues: {
      name: clinic?.name || "",
      address: clinic?.address || "",
      lat: clinic?.LatLong.split(",")[0] || "",
      lng: clinic?.LatLong.split(",")[1] || "",
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
        id: clinic.id,
        name: data?.name || "",
        address: data?.address || "",
        LatLong: `${data.lat},${data.lng}`,
      };
      const response = await Axios({
        ...summary.addClinic,
        data: payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Clinic Update Successfully");
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
        Clinic Information
      </h2>
      {mode == "editable" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-ratio1 gap-y-ratio2 mt-ratio2">
            {clinicFields.map((field, idx) => {
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
            })}
          </div>
          <div className="flex items-center justify-end mt-ratio2">
            <AddButton>
              {loader ? (
                <Spinner size={20} style={{ color: "white" }} />
              ) : (
                "Update Clinic"
              )}
            </AddButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default ClinicInformation;
