"use client";
import DeleteConformation from "@/components/DeleteConformation";
// import SearchBarClinic from "@/components/Search/searchBarClinic";
import SearchBarClinic from "@/components/Search/SearchBarClinic";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import { checkUpSchema } from "@/utils/schema";
import { clinicColumns, patientColumns } from "@/utils/tableData/TableColumns";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const page = () => {
  const { user, TOKEN } = useContext(AppContext);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loader, setLoader] = useState(false);
  const [searchClinic, setSearchClinic] = useState("");
  const [clinics, setClinics] = useState([]);
  const [filterClinic,setFilterClinic] = useState([])
  const [mode, setMode] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");
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


  useEffect(()=>{
    const filtered = clinics.filter((item,index)=>item.name.toLowerCase().includes(searchClinic.toLowerCase()))
    setFilterClinic(filtered);
  },[clinics,searchClinic])


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
    const fetchClinicDropdown = async () => {
      try {
        setLoader(true);
        const response = await Axios({
          ...summary.getClinics,
          params: {
            token: TOKEN,
          },
        });
        setClinics(response.data.data.clinics);
      } catch (error) {
        AxiosError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchClinicDropdown();
  }, []);

  const deleteClinic = (id) => {
    setDeleteModalVisible(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      setLoader(true);
      const response = await Axios({
        ...summary.deleteClinic,
        params: {
          token: TOKEN,
          clinicId: deleteId,
        },
      });
      if (response.data.status == 200) {
        toast.success("Clinic Delete Successfully");
        setDeleteModalVisible(false);
        setClinics((prev) => {
          return prev.filter((clinic) => clinic.id !== deleteId);
        });
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="mt-ratio2">
        <h2>Clinic Management</h2>
        <SearchBarClinic 
          clinics={clinics} 
          setClinics={setClinics} 
          searchClinic={searchClinic} 
          setSearchClinic={setSearchClinic}
        />
        <DynamicTable
          data={filterClinic}
          columns={clinicColumns(handleExpand, expandedRow, deleteClinic)}
          initialItemsPerPage={5}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          // filterPatient={patient}
          control={control}
          register={register}
          errors={errors}
          loader={loader}
          mode={mode}
          tableName="Clinic"
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
