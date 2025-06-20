import {
  checkUpFields,
  doctorFields,
  QualificationFields,
} from "@/utils/formField/formFIelds";
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
  addQualificationSchema,
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
import {
  ReadOnlyInputWithLabel,
  ReadOnlyMapingWithLabel,
} from "@/components/Inputs/ReadableInputs";
const title = "text-small 2xl:text-medium text-gray";
const text = "text-small 2xl:text-medium text-text";
const QualificationInformation = ({
  data: qualification,
  mode,
  setExpandedRow,
  functionData,
  setterFunctionData,
}) => {
  console.log(mode, "mode");
  const [loader, setLoader] = useState(false);
  const { TOKEN } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addQualificationSchema),
    defaultValues: {
      qualification: qualification?.name || "",
      color: qualification?.colorCode || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const payload = {
        id: qualification.id,
        name: data.qualification,
        colorCode: data.color,
        updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      const response = await Axios({
        ...summary.addQualification,
        data: payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Qualification Updated Successfully");
        setExpandedRow("");
        setterFunctionData(functionData.map((item) =>
          item.id === qualification.id ? {
            ...item,
            name: data.qualification,
            colorCode: data.color,
            updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        } : item)
      );
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
  return (
    <div>
      {mode == "editable" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-ratio1 gap-y-ratio2 mt-ratio2">
            {QualificationFields.map((field, idx) => {
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
                "Update Qualification"
              )}
            </AddButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default QualificationInformation;
