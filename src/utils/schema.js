import { z } from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{6,}$/;
const time12HrRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const loginSchema = z.object({
  username: z.string().min(1, "User Name is required"),
  password: z.string().min(1, "Password is required"),
});

export const addClinicSchema = z.object({
  name: z.string().min(1, "Clinic Name is required"),
  address: z.string().min(1, "Address is required"),
  lat: z.string().min(1, "Location is required"),
  lng: z.string().min(1, "Location is required"),
});

export const addDoctorSchema = z.object({
  doctorName: z
    .string()
    .min(1, { message: "Doctor Name is required" }),
  userName: z.
    string()
    .min(1, { message: "User Name is required" }),
  password: z
    .string()
    .min(1, { message: "Password is Required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(passwordRegex, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one symbol",
    }),
  age: z
    .string()
    .min(1, { message: "Age is Required" })
    .refine((val) => {
        const date = new Date(val);
        const today = new Date();
        return !isNaN(date.getTime()) && date < today;
    },
    {message: "Date of Birth must be a valid past date"}
    ),
  gender: z
    .string()
    .min(1, { message: "Gender is Required" })
    .refine((val) => ["male", "female"].includes(val), {
      message: "Gender must be either 'male' or 'female'",
    }),
  address: z
    .string()
    .min(1, { message: "Address is required" }),
  specialization: z
    .array(z.number())
    .min(1, { message: "Specialization is required" }),
  qualification: z
    .array(z.number())
    .min(1, { message: "Qualification is required" }),
  doctorClinics: z.array(
      z.object({
        clinicId: z.coerce
          .string()
          .min(1, { message: "Clinic Name is required" }),
        charges: z.coerce
          .string()
          .min(1, { message: "Charges is required" }),
        startTime: z
          .string()
          .min(1, { message: "Start Time is required" }),
        endTime: z
          .string()
          .min(1, { message: "End Time is required" }),
      })
    )
    .min(1, { message: "Doctor Clinic is required" }),
});

export const editDoctorSchema = z.object({
  doctorName: z.string().min(1, { message: "Doctor Name is required" }),
  userName: z.string().min(1, { message: "User Name is required" }),
  gender: z
    .string()
    .min(1, { message: "Gender is Required" })
    .refine((val) => ["male", "female"].includes(val), {
      message: "Gender must be either 'male' or 'female'",
    }),
  address: z.string().min(1, { message: "Address is required" }),
  specialization: z
    .array(z.number())
    .min(1, { message: "Specialization is required" }),
  qualification: z
    .array(z.number())
    .min(1, { message: "Qualification is required" }),
  doctorClinic: z
    .array(
      z.object({
        clinicId: z.coerce
          .string()
          .min(1, { message: "Clinic Name is required" }),
        charges: z.coerce.string().min(1, { message: "Charges is required" }),
        startTime: z.string().min(1, { message: "Start Time is required" }),
        endTime: z.string().min(1, { message: "End Time is required" }),
      })
    )
    .min(1, { message: "Doctor Clinic is required" }),
});

export const addPatientSchema = z.object({
  name: z.string().min(1, "Patient Name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  contactNumber: z.string().min(1, "Contact Number is required"),
});

export const addAppointmentSchema = z.object({
  patientId: z.coerce.string().min(1, "Patient Name is required"),
  clinicId: z.coerce.string().min(1, "Clinic Name is required"),
  doctorId: z.coerce.string().min(1, "Doctor Name is required"),
  doctorName: z.coerce.string().min(1, "Doctor Name is required"),
  clinicName: z.coerce.string().min(1, "Clinic Name is required"),
  patientName: z.coerce.string().min(1, "Patient Name is required"),
  visitDate: z.coerce
    .date({
      required_error: "Visit Date is required",
      invalid_type_error: "Visit Date must be a valid date",
    })
    .min(today, { message: "Visit Date must be in the future" }),
  charges: z.coerce.string().min(1, "Charges is required"),
  weight: z.coerce.string().optional(),
  bloodPressure: z.coerce.string().optional(),
  prescription: z.coerce.string().optional(),
  diagnosis: z.coerce.string().optional(),
  treatments: z.coerce.string().optional(),
});

export const directAppointmentSchema = z.object({
  patientName: z.string().min(1, "Patient Name is required"),
  dob: z.coerce
    .date({
      required_error: "Age is Required",
      invalid_type_error: "DOB must be a valid date",
    })
    .refine((date) => date < today, {
      message: "Enter Correct Date of Birth",
    }),
  contactNumber: z.string().min(1, "Contact Number is required"),
  gender: z
    .string()
    .min(1, { message: "Gender is Required" })
    .refine((val) => ["male", "female"].includes(val), {
      message: "Gender must be either 'male' or 'female'",
    }),
  clinicId: z.coerce.string().min(1, "Clinic Name is required"),
  doctorId: z.coerce.string().min(1, "Doctor Name is required"),
  doctorName: z.coerce.string().min(1, "Doctor Name is required"),
  clinicName: z.coerce.string().min(1, "Clinic Name is required"),
  patientName: z.coerce.string().min(1, "Patient Name is required"),
  visitDate: z.coerce
    .date({
      required_error: "Visit Date is required",
      invalid_type_error: "Visit Date must be a valid date",
    })
    .min(today, { message: "Visit Date must be in the future" }),
  charges: z.coerce.string().min(1, "Charges is required"),
  weight: z.coerce.string().optional(),
  bloodPressure: z.coerce.string().optional(),
  prescription: z.coerce.string().optional(),
  diagnosis: z.coerce.string().optional(),
  treatments: z.coerce.string().optional(),
});

export const addQualificationSchema = z.object({
  qualification: z.string().min(1, "Qualification Name is required"),
  color: z.string().min(1, "Qualification Color is required"),
});

export const addSpecializationSchema = z.object({
  specialization: z.string().min(1, "Specialization Name is required"),
  color: z.string().min(1, "Specialization Color is required"),
});

export const checkUpSchema = z.object({
  bloodPressure: z.string().optional(),
  tokenNumber: z.coerce.string().optional(),
  weight: z.coerce.string().optional(),
  charges: z.coerce.string().min(1, "Charges is required"),
  prescription: z.string().optional(),
  diagnosis: z.string().optional(),
  followupDate: z.coerce
    .date({
      required_error: "Visit Date is required",
      invalid_type_error: "Visit Date must be a valid date",
    })
    .min(today, { message: "FollowUp Date must be in the future" })
    .min(tomorrow, { message: "FollowUp Date must be in the future (Not Today)" })
    .optional(),
});
