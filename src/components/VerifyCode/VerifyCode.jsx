import { useState, useEffect } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function VerifyCode() {
  let navigate = useNavigate();

  const [apiError, setApiError] = useState(null);

  const [isLoader, sertIsLoader] = useState(false);
  useEffect(() => {}, []);

  const initialValues = {
    resetCode: "",
  };
  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("required"),
  });

  const callCode = async (values) => {
    setApiError(null);
    sertIsLoader(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );

      navigate("/resetpassword");
      sertIsLoader(false);
    } catch (error) {
      setApiError(error.response.data.message);
      sertIsLoader(false);
    }
  };
  const formikCode = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callCode,
  });

  return (
    <>

      <Helmet>
        <title> Verify Code </title>
      </Helmet>
      <form onSubmit={formikCode.handleSubmit} className="mt-[100px] w-6/12 m-auto mb-5">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : (
          ""
        )}
        <div className="mb-5">
          <label
            htmlFor="codeInput"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code
          </label>
          <input
            type="text"
            id="codeInput"
            name="resetCode"
            value={formikCode.values.resetCode}
            onBlur={formikCode.handleBlur}
            onChange={formikCode.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikCode.errors.resetCode && formikCode.touched.resetCode ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikCode.errors.resetCode}
            </div>
          ) : (
            " "
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ms-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
        >
          {isLoader ? (
            <ClipLoader size={20} color="#ffffff" />
          ) : (
            "verify Your Code"
          )}
        </button>
      </form>
    </>
  );
}
