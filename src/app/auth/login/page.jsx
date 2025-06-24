"use client";
import {
  PasswordInputs,
  SelectInputs,
  TextInput,
  TextInputs,
} from "@/components/formInput/TextInput";
import { loginFields } from "@/utils/formField/authFields";
import { loginSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import logo from "@/assets/img/adaptive-icon.png";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner/Spinner";
import { baseURL } from "@/config/summaryAPI";
import { login, logout } from "@/redux/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AxiosError } from "@/utils/axiosError";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { HeartPulse } from "lucide-react";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      userType: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${baseURL}/login?username=${data.username}&password=${
          data.password
        }&UUID=${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}&type=${
          data.userType
        }`
      );
      if (response.data.status == "200") {
        toast.success("Login Successfully");
        dispatch(login(response.data.data.loginStatus));
        router.push("/dashboard");
      } else {
        toast.error("Failed Request");
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };

  const HospitalIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zm-6-8h2v2h-2v2h-2v-2H9v-2h2V9h2v2z" />
    </svg>
  );

  return (
    <>
      <div className="h-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="bg-secondary max-w-md w-full space-y-8 rounded-xl shadow-lg shadow-gray overflow-hidden px-8 pb-8 login-container transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="text-center">
            <div className="flex justify-center relative">
              <Image
                src={logo}
                width={500}
                height={500}
                className="h-36 w-44"
                alt="logo"
              />
              <div className="absolute top-1 right-20">
                <HeartPulse className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
            <h2 className="mt-ratio2 text-3xl font-bold text-white">LOGIN</h2>
            <p className="mt-2 text-sm text-white">
              Please sign in to access your account
            </p>
          </div>
          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {loginFields.map((field, index) => {
                if (field.type == "text") {
                  return (
                    <TextInputs
                      key={index}
                      label={field.label}
                      input={field.input}
                      type={field.type}
                      name={field.name}
                      control={control}
                      errors={errors}
                      classNamelabel="!text-white"
                      classNameInput="shadow-md"
                    />
                  );
                }
                if (field.type === "password") {
                  return (
                    <PasswordInputs
                      key={index}
                      label={field.label}
                      input={field.input}
                      type={field.type}
                      name={field.name}
                      errors={errors}
                      control={control}
                      classNamelabel="!text-white"
                      classNameInput="shadow-md"
                    />
                  );
                }
                if (field.type === "select") {
                  return (
                    <SelectInputs
                      key={index}
                      label={field.label}
                      input={field.input}
                      type={field.type}
                      control={control}
                      errors={errors}
                      name={field.name}
                      options={field.options}
                      classNamelabel="!text-white"
                      className="shadow-md"
                    />
                  );
                }
              })}
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-small font-medium rounded-md text-text bg-white cursor-pointer"
            >
              {loader ? (
                <Spinner size={16} style={{ color: "#0066A1" }} />
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

// "use client";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Eye,
//   EyeOff,
//   User,
//   Lock,
//   Crown,
//   Sparkles,
//   ChevronDown,
//   Stethoscope,
//   Heart,
//   Activity,
// } from "lucide-react";
// import { z } from "zod";
// import Image from "next/image";
// import logo from "@/assets/img/FrontPic.jpg";

// const loginSchema = z.object({
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   userType: z.string().min(1, "Please select user type"),
// });

// export default function VIPLogin() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [isSelectOpen, setIsSelectOpen] = useState(false);
//   const [selectedUserType, setSelectedUserType] = useState("");

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//       userType: "",
//     },
//   });

//   const userTypes = [
//     { value: "3", label: "👨‍⚕️ Doctor" },
//     { value: "4", label: "🏥 Clinic" },
//   ];

//   const handleUserTypeSelect = (value, label) => {
//     setSelectedUserType(label);
//     setValue("userType", value);
//     setIsSelectOpen(false);
//   };

//   const onSubmit = async (data) => {
//     try {
//       setLoader(true);
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       console.log("Login data:", data);
//       // Add your actual login logic here
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-[#467ee6]">
//       <div className="flex min-h-screen">
//         {/* Left Side - Hospital Image Section */}
//         <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//           <Image
//             src={logo}
//             height={1000}
//             width={1000}
//             className=""
//             alt="logo"
//           />
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="w-full lg:w-1/2 relative overflow-hidden">
//           {/* Background for right side */}

//           <div className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8">
//             {/* Main Card */}
//             <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
//               {/* Header */}
//               <div className="text-center pb-2 pt-8 px-8">
//                 <div className="flex justify-center mb-4">
//                   <div className="relative">
//                     <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
//                       <Crown className="w-10 h-10 text-white" />
//                     </div>
//                     <div className="absolute -top-1 -right-1">
//                       <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
//                     </div>
//                   </div>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
//                   VIP LOGIN
//                 </h1>
//                 <p className="text-white/70 text-sm mt-2">
//                   Welcome to the exclusive portal
//                 </p>
//               </div>

//               {/* Content */}
//               <div className="space-y-6 pt-4 px-8 pb-8">
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                   {/* Username Field */}
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="username"
//                       className="block text-white/90 font-medium text-sm"
//                     >
//                       Username
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
//                       <input
//                         id="username"
//                         type="text"
//                         placeholder="Enter your username"
//                         className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-200"
//                         {...register("username")}
//                       />
//                     </div>
//                     {errors.username && (
//                       <p className="text-red-400 text-sm">
//                         {errors.username.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Password Field */}
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="password"
//                       className="block text-white/90 font-medium text-sm"
//                     >
//                       Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
//                       <input
//                         id="password"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter your password"
//                         className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-200"
//                         {...register("password")}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="w-5 h-5" />
//                         ) : (
//                           <Eye className="w-5 h-5" />
//                         )}
//                       </button>
//                     </div>
//                     {errors.password && (
//                       <p className="text-red-400 text-sm">
//                         {errors.password.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* User Type Field - Custom Select */}
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="userType"
//                       className="block text-white/90 font-medium text-sm"
//                     >
//                       Login As
//                     </label>
//                     <div className="relative">
//                       <button
//                         type="button"
//                         onClick={() => setIsSelectOpen(!isSelectOpen)}
//                         className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-left focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none transition-all duration-200 flex items-center justify-between"
//                       >
//                         <span
//                           className={
//                             selectedUserType ? "text-white" : "text-white/50"
//                           }
//                         >
//                           {selectedUserType || "Select your role"}
//                         </span>
//                         <ChevronDown
//                           className={`w-5 h-5 text-white/50 transition-transform duration-200 ${
//                             isSelectOpen ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>

//                       {isSelectOpen && (
//                         <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
//                           {userTypes.map((type) => (
//                             <button
//                               key={type.value}
//                               type="button"
//                               onClick={() =>
//                                 handleUserTypeSelect(type.value, type.label)
//                               }
//                               className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-150 border-b border-white/10 last:border-b-0"
//                             >
//                               {type.label}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     {errors.userType && (
//                       <p className="text-red-400 text-sm">
//                         {errors.userType.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={loader}
//                     className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
//                   >
//                     {loader ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                         <span>Signing In...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Crown className="w-5 h-5" />
//                         <span>Enter VIP Portal</span>
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 {/* Footer */}
//                 <div className="text-center pt-4 border-t border-white/10">
//                   <p className="text-white/50 text-xs">
//                     Exclusive access for premium members only
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Click outside to close select */}
//           {isSelectOpen && (
//             <div
//               className="fixed inset-0 z-40"
//               onClick={() => setIsSelectOpen(false)}
//             ></div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
