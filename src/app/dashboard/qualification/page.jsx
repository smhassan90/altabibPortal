"use client";
import SearchBarQualification from "@/components/Search/SearchBarQualification";
import SearchBarSpecialization from "@/components/Search/SearchBarSpecialization";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import { checkUpSchema } from "@/utils/schema";
import { qualificationColumns } from "@/utils/tableData/TableColumns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { user, TOKEN } = useContext(AppContext);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loader, setLoader] = useState(false);
  const [mode, setMode] = useState("");
  const [qualification, setQualification] = useState([]);

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
      bloodPressure: "",
      weight: "",
      charges: "",
      prescription: "",
      diagnosis: "",
      followupDate: "",
    },
  });

  const handleExpand = (id, Selectmode) => {
    if (expandedRow === id) {
      if (mode !== Selectmode) {
        setMode(Selectmode);
      } else {
        setExpandedRow(null);
        setMode("");
      }
    } else {
      setExpandedRow(id);
      setMode(Selectmode);
    }
  };

  useEffect(() => {
    const fetchQualification = async () => {
      try {
        setLoader(true);
        const response = await Axios({
          ...summary.getQualification,
          params: {
            token: TOKEN,
          },
        });
        setQualification(response.data.data.qualifications);
      } catch (error) {
        AxiosError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchQualification();
  }, []);

  return (
    <div className="mt-ratio2">
      <h2>Qualification Management</h2>
      <SearchBarQualification />
      <DynamicTable
        data={qualification}
        columns={qualificationColumns(handleExpand, expandedRow)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
        // filterPatient={patient}
        control={control}
        register={register}
        errors={errors}
        loader={loader}
        mode={mode}
        tableName="Qualification"
      />
    </div>
  );
};

export default page;
