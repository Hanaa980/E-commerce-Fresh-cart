import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function ResetPass() {


  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoader, sertIsLoader] = useState(false);
  useEffect(() => { }, []);

  const initialValues = {
    email: "",
    newPassword: "",

  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    newPassword: Yup.string().matches(new RegExp('^[A-Za-z0-9]{6,15}$'), "newPassword must be strong between 6 and 15 chart").required("required"),
  })

  const callResetPass = async (values) => {
    setApiError(null);
    sertIsLoader(true)
    try {

      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
 
      localStorage.setItem("u-token", data.token);
      setToken(data.token);
      navigate("/");
      sertIsLoader(false)

    } catch (error) {

      setApiError(error.response.data.message)
      sertIsLoader(false)
    }
  }
  const formikResetPass = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callResetPass,
  })

  return (
    <> <Helmet><title> Reset password</title></Helmet>

    <form onSubmit={formikResetPass.handleSubmit} className="mt-[100px] w-6/12 m-auto mb-5">
      <h1 className="mb-5 ">Reset New Password</h1>
      {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiError}
      </div> : " "}


      <div className="mb-5">
        <label htmlFor="emailInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="emailInput" name="email" value={formikResetPass.values.email} onBlur={formikResetPass.handleBlur} onChange={formikResetPass.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5" />
        {formikResetPass.errors.email && formikResetPass.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formikResetPass.errors.email}
        </div> : " "}
      </div>

      <div className="mb-5">
        <label htmlFor="newPasswordInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your newPassword</label>
        <input type="password" id="newPasswordInput" name="newPassword" value={formikResetPass.values.newPassword} onBlur={formikResetPass.handleBlur} onChange={formikResetPass.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5" />
        {formikResetPass.errors.newPassword && formikResetPass.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formikResetPass.errors.newPassword}
        </div> : " "}
      </div>

      <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ms-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">{isLoader ? <ClipLoader size={20} color="#ffffff" /> : "reset"} </button>
    </form>
    </>
  )
}