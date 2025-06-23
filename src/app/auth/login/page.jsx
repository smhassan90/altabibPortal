"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/schema";
import { loginFields } from "@/utils/formField/authFields";
import { Axios, baseURL, summary } from "@/config/summaryAPI";
import { AxiosError } from "@/utils/axiosError";
import { useDispatch } from "react-redux";
import { login, logout } from "@/redux/auth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Select } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import AddButton from "@/utils/buttons/AddButton";
import { TextInput } from "@/components/formInput/TextInput";
const { Option } = Select;
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [type, setType] = useState(5);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${baseURL}/login?username=${data.username}&password=${
          data.password
        }&UUID=${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}&type=${type}`
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
  return (
    <div className="w-screen h-screen bg-cover bg-center bg-blend-overlay bg-[#0066a1] flex items-center justify-center">
      <div className="flex content-center items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute w-full lg:w-5/12 px-4">
        <div className="bg-white relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="rounded-t text-center mb-0 px-6 py-6">
            <h6 className="text-gray-600 text-xl font-bold">LOG IN</h6>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-4 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              {loginFields.map((field, index) => (
                <TextInput
                  key={index}
                  label={field.label}
                  input={field.input}
                  type={field.type}
                  name={field.name}
                  register={register}
                  errors={errors}
                />
              ))}
              <Select
                placeholder="Select Type"
                allowClear={true}
                className="w-full !mb-3 !h-[40px]"
                onChange={(value) => {
                  if (value === undefined) {
                    setType("5")
                  } else {
                    setType(value)
                  }
                }}
              >
                <Option key="4" value="4">
                  As a Clinic
                </Option>
                <Option key="3" value="3">
                  As a Doctor
                </Option>
              </Select>
              <AddButton>Log in</AddButton>

              {/* <div className="w-1/2">
                <a
                  href="#pablo"
                  // onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
