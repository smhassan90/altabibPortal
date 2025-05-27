import toast from "react-hot-toast"

export const AxiosError = (error) =>{
    toast.error(error?.response?.data?.message)
}