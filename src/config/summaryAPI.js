import axios from "axios";
// export const baseURL = "http://192.168.18.21:8080/tabib";
export const baseURL = "http://66.135.60.203:8080/tabib";

export const Axios = axios.create({
  baseURL: baseURL,
  //   withCredentials: true,
});
// Axios.interceptors.request.use(async (config) => {
//     const Token = localStorage.getItem('token')
//     if (Token) {
//         config.headers.Authorization = `Bearer ${Token}`
//     }
//     return config
// },
//     (error) => {
//         return Promise.reject(error)
//     })
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
      })),
  },
  getClinics: {
    url: "/getAllClinics",
    method: "get",
    transformer: (data) =>
      data.clinics.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name,
        address: item.address,
        LatLong: item.LatLong,
      })),
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
  getAppointment: {
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
