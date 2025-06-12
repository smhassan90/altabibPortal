import axios from "axios";
export const baseURL = "http://192.168.18.21:8080/tabib";
// export const baseURL = "http://66.135.60.203:8080/tabib";
// export const baseURL = "http://192.168.18.6:8080/tabib";

export const Axios = axios.create({
  baseURL: baseURL,
  //   withCredentials: true,
});
export const summary = {
  login: {
    url: "/login",
    method: "get",
  },
  getDoctors: {
    url: "/getAllDoctors",
    method: "get",
    transformer: (data) =>
      data.doctors.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name,
        userName:item.username,
        password:item.password,
        specialization: item.specializations || "No Specialization",
        qualification: item.qualifications,
        address: item.address,
        gender: item.gender,
        clinic: item.doctorClinicDALS,
        age: item.age,
        type: item.type
      })),
  },
  getClinics: {
    url: "/getAllClinics",
    method: "get",
  },
  getDoctorClinics: {
    url: "/getClinics",
    method: "get",
  },
  getQualification: {
    url: "/getAllQualification",
    method: "get",
  },
  getSpecialization: {
    url: "/getAllSpecialization",
    method: "get",
  },
  addClinic: {
    url: "/addClinics",
    method: "post",
  },
  updateClinic: {
    url: "/updateClinic",
    method: "post",
  },
  deleteClinic: {
    url: "/deleteClinic",
    method: "post",
  },
  getSummaryDoctors: {
    url: "/getSummaryDoctors",
    method: "get",
  },
  getSummaryClinics: {
    url: "/getSummaryClinics",
    method: "get",
  },
  getSummaryAppointment: {
    url: "/getSummaryAppointment",
    method: "get",
  },
  getSummaryEarnings: {
    url: "/getSummaryEarnings",
    method: "get",
  },
  getSummaryPatients: {
    url: "/getSummaryPatients",
    method: "get",
  },
  addSpecialization: {
    url: "/addSpecialization",
    method: "post",
  },
  deleteSpecialization: {
    url: "/deleteSpecialization",
    method: "post",
  },
  addQualification: {
    url: "/addQualification",
    method: "post",
  },
  deleteQualification: {
    url: "/deleteQualification",
    method: "post",
  },
  setAppointment: {
    url: "/setAppointment",
    method: "get",
  },
  directPatientAppointment: {
    url: "/directPatientAppointment",
    method: "post",
  },
  addOrUpdateDoctor: {
    url: "/addOrUpdateDoctor",
    method: "post",
  },
  viewAppointment: {
    url: "/viewAppointments",
    method: "get",
  },
  addGlobalPatient:{
    url: "/addGlobalPatient",
    method: "post",
  },
  getAllPatients:{
    url: "/getAllPatients",
    method: "get",
  },
  getSummary:{
    url: "/getSummary",
    method: "get",
  },
  getPatientHistory:{
    url: "/getPatientHistory",
    method: "get",
  }
};
