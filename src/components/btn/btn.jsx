import {  useContext } from "react";
import { cartContext } from './../context/cartContext';
import { toast } from "react-toastify";
import { WishListContext } from "../context/WishListContext";




export default function Btn({ product }) {
  let { addToWishList, getWishList, removeFromWishList, wishListId } = useContext(WishListContext)

  let { setCartDetails,checked,cartDetails,updateCountToCart ,setChecked,getCart,addToCart} = useContext(cartContext)
  const isInWishlist = wishListId?.includes(product.id);
const isChecked=checked?.includes(product.id)
  async function handleWishlistToggle() {
    if (isInWishlist) {
    let data=  await removeFromWishList(product.id);
      if (data.status == "success") {
  
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
          draggable: true,
          theme: "colored",
        });
      }
    } else {
   let data=   await addToWishList(product.id);
      if (data.status == "success") {
  
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
          draggable: true,
          theme: "colored",
        });
      }
    }
    getWishList();
  }


async function handleAddToCart() {
  if (!isChecked) {

    let data = await addToCart(product.id);
    if (data.status === "success") {
      setCartDetails(data)
      setChecked(data?.data?.products?.map(product => product.product.id) );  
            
      await getCart(); 
      toast.success(data.message, { position: "bottom-right", autoClose: 3000, draggable: true, theme: "colored" });
    }
  }
}
const cartProduct = cartDetails?.data?.products?.find(item => item.product.id === product.id);
const productCount = cartProduct ? cartProduct.count : 0;
  return (
    <>
      <div className="flex justify-around mb-2">
        <p>{product.price} eg</p>
        <p><i className="fa fa-star text-yellow-300"></i>{product.ratingsAverage}</p>
        <i onClick={handleWishlistToggle}
          className={`fa-heart ${isInWishlist ? "fa-solid text-red-700" : "fa-regular"}`}>
        </i>
      </div>
      {isChecked && productCount > 0 ?<div className="flex items-center justify-center ">
                  <button onClick={() => updateCountToCart(product.id, productCount - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100px] text-center">
                      { productCount}
                    </span>
                  </div>
                  <button onClick={() => updateCountToCart(product.id, productCount + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>:  <button onClick={ handleAddToCart} className="btn bg-main p-2 rounded-lg text-white w-full">add to cart</button>}
     
    </>
  )
}