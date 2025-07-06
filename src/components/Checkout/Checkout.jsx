import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useNavigate, useParams } from "react-router-dom";
import { OrderContext } from "../context/orderContext";
import { cartContext } from "../context/cartContext";
export default function Checkout() {


  const [orderType, setOrderType] = useState();
let{cartId}=useParams();
let{cacheOrder,onlineOrder}=useContext(OrderContext)
let{setNumOfItems,setCartDetails}=useContext(cartContext)



let navigate = useNavigate();

  function getOrderType(e) {
    setOrderType(e.target.value);
    
  }

  const initialValues = {

    details: "",
    phone: "",
    city: ""
  }

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("required"),
    phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'), "invalid phone number").required("required"),
    city: Yup.string().required("required"),
  })

 async function prepareCheckOut(values) {
if(orderType=="cache"){
   let res= await cacheOrder(cartId,values)
   setNumOfItems(0)
   setCartDetails(null)
   navigate("/allorders")
   
}else if(orderType=="online"){
  let res= await onlineOrder(cartId,values)
  
  setNumOfItems(0)
  setCartDetails(null)
}
  }

  const addressForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: prepareCheckOut

  })

  return (

    <form onSubmit={addressForm.handleSubmit} className="w-6/12 m-auto mb-5">
      <h1 className="mb-5 ">Checkout form</h1>



      <div className="mb-5">
        <label htmlFor="addressInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
        <input type="text" id="addressInput" name="details" value={addressForm.values.details} onBlur={addressForm.handleBlur} onChange={addressForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5" />
        {addressForm.errors.details && addressForm.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{addressForm.errors.details}
        </div> : " "}
      </div>
      <div className="mb-5">
        <label htmlFor="phoneInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
        <input type="tel" id="phoneInput" name="phone" value={addressForm.values.phone} onChange={addressForm.handleChange} onBlur={addressForm.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5" />
        {addressForm.errors.phone && addressForm.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{addressForm.errors.phone}
        </div> : " "}
      </div>
      <div className="mb-5">
        <label htmlFor="cityInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
        <input type="text" id="cityInput" name="city" value={addressForm.values.city} onBlur={addressForm.handleBlur} onChange={addressForm.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5" />
        {addressForm.errors.city && addressForm.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{addressForm.errors.city}
        </div> : " "}
      </div>
      <div className="mb-3  text-lg">
        <input onChange={getOrderType} className="mx-1" type="radio" value={"cache"} id="cache" name="orderType" />
        <label htmlFor="cache">Cach</label>
      </div>
      <div className="text-lg">
        <input onChange={getOrderType} className="mx-1" aria-selected="true" type="radio" value={"online"} id="online" name="orderType" />
        <label htmlFor="online">Online</label>
      </div>

      <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ms-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">submit </button>
    </form>


  )
}

