import { useContext } from "react";
import { cartContext } from './../context/cartContext';
import { toast } from "react-toastify";
import Rating from "../ProductItem/service/rating";
import { ClipLoader } from "react-spinners";




export default function Btn({ product }) {

  let { isLoader,setCartDetails, checked, cartDetails, updateCountToCart, setChecked, getCart, addToCart } = useContext(cartContext)
  const isChecked = checked?.includes(product.id)


  async function handleAddToCart() {
    if (!isChecked) {

      let data = await addToCart(product.id);
      if (data.status === "success") {
        setCartDetails(data)
        setChecked(data?.data?.products?.map(product => product.product.id));

        await getCart();
        toast.success(data.message, { position: "bottom-right", autoClose: 3000, draggable: true, theme: "colored" });
      }
    }
  }

  const cartProduct = cartDetails?.data?.products?.find(item => item.product.id === product.id);
  const productCount = cartProduct ? cartProduct.count : 0;
  return (
    <>

   
      <div className="flex justify-between m-3 w-[90%]  ">
        <p className="text-base font-bold text-main">{product.price} EGP</p> 
         {isChecked && productCount > 0 ? <div className="flex w-[50px] items-center justify-center ">
        <button onClick={() => updateCountToCart(product.id, productCount - 1)} className="inline-flex items-center justify-center p-1 me-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
          <span className="sr-only">Quantity button</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
          </svg>
        </button>
        <div>
          <span className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg block  py-1.5  w-[30px] text-center">
            {productCount}
          </span>
        </div>
        <button onClick={() => updateCountToCart(product.id, productCount + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
          <span className="sr-only">Quantity button</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div> : <button onClick={handleAddToCart} className="btn bg-main p-2 rounded-lg text-white">{isLoader ? <ClipLoader size={20} color="#ffffff" /> : "Add +"}{" "}</button>}
        

      </div>
     

    </>
  )
}
