import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { tokenContext } from "./../context/tokenContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [isLoader, sertIsLoader] = useState(false);

  let navigate = useNavigate();
  let { setToken } = useContext(tokenContext);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
      .matches(
        new RegExp("^[A-Za-z0-9]{6,15}$"),
        "password must be strong between 6 and 15 chart"
      )
      .required("required"),
  });

  const callLogin = async (values) => {
    setApiError(null);
    sertIsLoader(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("u-token", data.token);
      setToken(data.token);
      navigate("/");
      sertIsLoader(false);
    } catch (error) {
      setApiError(error.response.data.message);
      sertIsLoader(false);
    }
  };

  const formikLogin = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <>
     <Helmet><title>Login </title></Helmet>
      <form
        onSubmit={formikLogin.handleSubmit}
        className="w-6/12 m-auto mb-5 mt-[150px]"
      >
        <h1 className="mb-5 ">Sign in </h1>
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : (
          " "
        )}

        <div className="mb-5">
          <label
            htmlFor="emailInput"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="emailInput"
            name="email"
            value={formikLogin.values.email}
            onBlur={formikLogin.handleBlur}
            onChange={formikLogin.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikLogin.errors.email && formikLogin.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikLogin.errors.email}
            </div>
          ) : (
            " "
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="passwordInput"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="passwordInput"
            name="password"
            value={formikLogin.values.password}
            onBlur={formikLogin.handleBlur}
            onChange={formikLogin.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikLogin.errors.password && formikLogin.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikLogin.errors.password}
            </div>
          ) : (
            " "
          )}
        </div>
        <Link to={"/forgetPassword"}>forget password?</Link>

        <button
          type="submit"
          className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ms-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
        >
          {isLoader ? <ClipLoader size={20} color="#ffffff" /> : "Login"}{" "}
        </button>
      </form>
    </>
  );
}
