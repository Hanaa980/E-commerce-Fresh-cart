import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../context/tokenContext";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [isLoader, sertIsLoader] = useState(false);
  let navigate = useNavigate();
  let { setToken } = useContext(tokenContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min lenght is 3")
      .max(15, "max lenght is 15")
      .required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
      .matches(
        new RegExp("^[A-Za-z0-9]{6,15}$"),
        "password must be strong between 6 and 15 chart"
      )
      .required("required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword should be matched")
      .required("required"),
    phone: Yup.string()
      .matches(new RegExp("^01[0125][0-9]{8}$"), "invalid phone number")
      .required("required"),
  });

  const callRegsiter = async (values) => {
    setApiError(null);
    sertIsLoader(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      localStorage.setItem("u-token", data.token);
      setToken(data.token);
      navigate("/login");
      sertIsLoader(false);
    } catch (error) {
      setApiError(error.response.data.message);
      sertIsLoader(false);
    }
  };

  const formikRegister = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callRegsiter,
  });

  return (
    <>
      <Helmet>
        <title>Register </title>
      </Helmet>

      <form
        onSubmit={formikRegister.handleSubmit}
        className="w-6/12 m-auto mb-5 mt-[150px]"
      >
        <h1 className="mb-5 ">Register Now:</h1>
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
            htmlFor="NameInput"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="NameInput"
            name="name"
            value={formikRegister.values.name}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikRegister.errors.name && formikRegister.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikRegister.errors.name}
            </div>
          ) : (
            " "
          )}
        </div>

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
            value={formikRegister.values.email}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikRegister.errors.email && formikRegister.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikRegister.errors.email}
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
            value={formikRegister.values.password}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikRegister.errors.password && formikRegister.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikRegister.errors.password}
            </div>
          ) : (
            " "
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="rePasswordInput"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your repassword
          </label>
          <input
            type="password"
            id="rePasswordInput"
            name="rePassword"
            value={formikRegister.values.rePassword}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikRegister.errors.rePassword &&
          formikRegister.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikRegister.errors.rePassword}
            </div>
          ) : (
            " "
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="phoneInput"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            type="tel"
            id="phoneInput"
            name="phone"
            value={formikRegister.values.phone}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
          />
          {formikRegister.errors.phone && formikRegister.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formikRegister.errors.phone}
            </div>
          ) : (
            " "
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ms-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
        >
          {isLoader ? <ClipLoader size={20} color="#ffffff" /> : "submit"}
        </button>
      </form>
    </>
  );
}
