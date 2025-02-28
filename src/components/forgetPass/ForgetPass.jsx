import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ForgetPass() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const [isLoader, sertIsLoader] = useState(false);
 
  const initialValues = {
    email: "",
     }
  const callForgetPass = async (values) => {
    setApiError(null);
    sertIsLoader(true)
    try {

      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);


      navigate("/verifycode");

      sertIsLoader(false)
    } catch (error) {


      setApiError(error.response.data.message)

      sertIsLoader(false)

    }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    // resetCode: Yup.string().required("required"),
  })
  const formikForgetPass = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callForgetPass,


  })
//!------------------------------------------------


  return (
<>

  <form onSubmit={formikForgetPass.handleSubmit} className="w-6/12 m-auto mb-5">
{apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiError}
</div> : ""}

  <div className="mb-5"> 
  <label htmlFor="emailInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
  <input type="email" id="emailInput" name="email" value={formikForgetPass.values.email} onBlur={formikForgetPass.handleBlur} onChange={formikForgetPass.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5" />
  {formikForgetPass.errors.email && formikForgetPass.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formikForgetPass.errors.email}
  </div> : " "}
</div> 


<button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ms-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">{isLoader ? <ClipLoader size={20} color="#ffffff" /> : "send code"} </button>
</form>  
  




        </>
  )
}
