"use client";
import DeleteConformation from "@/components/DeleteConformation";
// import SearchBarClinic from "@/components/Search/searchBarClinic";
import SearchBarClinic from "@/components/Search/SearchBarClinic";
import SearchBarSpecialization from "@/components/Search/SearchBarSpecialization";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import { checkUpSchema } from "@/utils/schema";
import {
  clinicColumns,
  patientColumns,
  specializationColumns,
} from "@/utils/tableData/TableColumns";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const page = () => {
  const { user, TOKEN } = useContext(AppContext);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loader, setLoader] = useState(false);
  const [mode, setMode] = useState("");
  const [specialization, setSpecialization] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("")

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
    const fetchSpecialization = async () => {
      try {
        setLoader(true);
        const response = await Axios({
          ...summary.getSpecialization,
          params: {
            token: TOKEN,
          },
        });
        setSpecialization(response.data.data.specializations);
      } catch (error) {
        AxiosError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchSpecialization();
  }, []);

  console.log(specialization, "specialization");

  const confirmDelete = async () => {
    try {
      setLoader(true);
      const response = await Axios({
        ...summary.deleteSpecialization,
        params: {
          token: TOKEN,
          specializationId: deleteId,
        },
      });
      if (response.data.status == 200) {
        toast.success("Specialization Delete Successfully");
        setDeleteModalVisible(false);
        setSpecialization((prev) => {
          return prev.filter((spec) => spec.id !== deleteId);
        });
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };

  const deleteSpecialization = (id) => {
    setDeleteModalVisible(true);
    setDeleteId(id)
  };

  return (
    <>
      <div className="mt-ratio2">
        <h2>Specialization Management</h2>
        <SearchBarSpecialization 
          specialization={specialization}
          setSpecialization={setSpecialization}
        />
        <DynamicTable
          data={specialization}
          columns={specializationColumns(handleExpand, expandedRow, deleteSpecialization)}
          initialItemsPerPage={5}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          // filterPatient={patient}
          control={control}
          register={register}
          errors={errors}
          loader={loader}
          mode={mode}
          tableName="Specialization"
          functionData={specialization}
          setterFunctionData={setSpecialization}
        />
      </div>
      {deleteModalVisible && (
        <DeleteConformation
          deleteModalVisible={deleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          confirmDelete={confirmDelete}
        />
      )}
    </>
  );
};

export default page;
