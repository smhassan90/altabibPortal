import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patient: null,
};

const PatientCheckupSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    patientCheckup: (state, action) => {
      state.patient = action.payload;
    },
  },
});

export const { patientCheckup } = PatientCheckupSlice.actions;
export default PatientCheckupSlice.reducer;