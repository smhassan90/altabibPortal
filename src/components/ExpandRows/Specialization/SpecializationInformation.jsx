import {SpecializationFields} from "@/utils/formField/formFIelds";
import React, { useContext, useState } from "react";
import {TextInputsWithUnderLine,} from "../../formInput/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {addSpecializationSchema} from "@/utils/schema";
import { AppContext } from "@/provider/AppProvider";
import AddButton from "@/utils/buttons/AddButton";
import Spinner from "@/components/Spinner/Spinner";
import dayjs from "dayjs";
import { Axios, summary } from "@/config/summaryAPI";
import { AxiosError } from "@/utils/axiosError";
import toast from "react-hot-toast";
const SpecializationInformation = ({
  data: specialization,
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
    resolver: zodResolver(addSpecializationSchema),
    defaultValues: {
      specialization: specialization?.name || "",
      color: specialization?.colorCode || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const payload = {
        id: specialization.id,
        name: data.specialization,
        colorCode: data.color,
        updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      const response = await Axios({
        ...summary.addSpecialization,
        data: payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Specialization Updated Successfully");
        setExpandedRow("");
        setterFunctionData(functionData.map((item) =>
          item.id === specialization.id ? {
            ...item,
            name: data.specialization,
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
            {SpecializationFields.map((field, idx) => {
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
                "Update Specialization"
              )}
            </AddButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default SpecializationInformation;
