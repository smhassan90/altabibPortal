"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Axios, summary } from "@/config/summaryAPI";
import { AxiosError } from "@/utils/axiosError";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
export const AppContext = createContext();
const AppProvider = ({ children }) => {
  const TOKEN = useSelector((state) => state?.auth?.user?.token);
  const user = useSelector((state) => state?.auth?.user);
  console.log(TOKEN, "token");
  const [isLoading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [doctorSummary, setDoctorSummary] = useState({});
  const [clinicSummary, setClinicSummary] = useState({});
  const [earningSummary, setEarningSummary] = useState({});
  const [patientSummary, setPatientSummary] = useState({});
  const [appointmentSummary, setAppointmentSummary] = useState({});
  const [clinicId, setClinicId] = useState(0)
  const [doctorId, setDoctorId] = useState(0)
  const [patientId, setPatientId] = useState(0)
  const [appointmentId, setAppointmentId] = useState(0)
  const [visitDate, setVisitDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [checkUpPatient, setCheckUpPatient] = useState({})
  const resetContext = () => {
    setClinics([]);
    setDoctors([]);
    setPatients([]);
    setAppointment([]);
    setQualification([]);
    setSpecialization([]);
    setDoctorSummary({});
    setClinicSummary({});
    setEarningSummary({});
    setPatientSummary({});
    setAppointmentSummary({});
    setClinicId(0);
    setDoctorId(0);
    setPatientId(0);
    setAppointmentId(0);
    setVisitDate(dayjs().format("YYYY-MM-DD"));
  };
  const fetchAllSummaryData = useCallback(async () => {
    setLoading(true)
    try {
      const [
        doctorsRes,
        clinicsRes,
        appointmentsRes,
        patientsRes,
        earningsRes,
      ] = await Promise.all([
        Axios({
          ...summary.getSummaryDoctors,
          params: { token: TOKEN },
        }),
        Axios({
          ...summary.getSummaryClinics,
          params: { token: TOKEN },
        }),
        Axios({
          ...summary.getSummaryAppointment,
          params: { token: TOKEN },
        }),
        Axios({
          ...summary.getSummaryPatients,
          params: { token: TOKEN },
        }),
        Axios({
          ...summary.getSummaryEarnings,
          params: { token: TOKEN },
        }),
      ]);
      setDoctorSummary(doctorsRes.data);
      setClinicSummary(clinicsRes.data);
      setEarningSummary(earningsRes.data);
      setPatientSummary(patientsRes.data);
      setAppointmentSummary(appointmentsRes.data);
    } catch (error) {
      AxiosError(error);
    } finally {
      setLoading(false)
    }
  }, []);
  const fetchClinicDropdown = async () => {
    try {
      setLoading(true)
      const { url, method, transformer = (data) => data } = summary.getClinics;
      const response = await Axios({
        url,
        method,
        params: {
          token: TOKEN,
        },
      });
      const transformed = transformer(response.data.data);
      setClinics(transformed);
    } catch (error) {
      AxiosError(error);
    } finally {
      setLoading(false)
    }
  };
  const fetchQualificationDropdown = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
    }
  };
  const fetchQSpecializationDropdown = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
    }
  };
  const fetchDoctorDropdown = async (setIsLoading) => {
    try {
      setIsLoading(true)
      const { url, method, transformer = (data) => data } = summary.getDoctors;
      const response = await Axios({
        url,
        method,
        params: {
          token: TOKEN,
          clinicId,
        },
      });
      const transformed = transformer(response.data.data);
      setDoctors(transformed);
    } catch (error) {
      AxiosError(error);
    } finally {
      setIsLoading(false)
    }
  };
  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...summary.getAllPatients,
        params: {
          token: TOKEN,
          clinicId,
          doctorId,
        },
      });
      setPatients(response.data.data);
    } catch (error) {
      AxiosError(error);
    } finally {
      setLoading(false)
    }
  };
  // useEffect(() => {
  //   fetchAllSummaryData();
  //   fetchClinicDropdown();
  //   fetchQualificationDropdown();
  //   fetchQSpecializationDropdown();
  //   fetchDoctorDropdown();
  // }, []);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        clinics,
        setClinics,
        doctors,
        setDoctors,
        patients,
        setPatients,
        appointment,
        setAppointment,
        qualification,
        setQualification,
        specialization,
        setSpecialization,
        clinicId,
        setClinicId,
        doctorId,
        setDoctorId,
        patientId,
        setPatientId,
        appointmentId,
        setAppointmentId,
        visitDate,
        setVisitDate,
        doctorSummary,
        clinicSummary,
        earningSummary,
        patientSummary,
        appointmentSummary,
        fetchAllSummaryData,
        fetchClinicDropdown,
        fetchQualificationDropdown,
        fetchQSpecializationDropdown,
        fetchDoctorDropdown,
        fetchPatients,
        resetContext,
        user
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
