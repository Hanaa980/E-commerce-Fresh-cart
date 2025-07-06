import {  useEffect, useContext, useState } from "react";
import { cartContext } from './../context/cartContext';
import { Link } from "react-router-dom";
import { tokenContext } from "../context/tokenContext";
import { GridLoader } from "react-spinners";

export default function Cart() {
  
  // const [loader, setLoader] = useState(true)
  let{token}=useContext(tokenContext)
  let {cartDetails, updateCountToCart, removeItemFromCart, getCart,  clearCart } = useContext(cartContext)

  useEffect(() => {
 token && getCart();
    
    
}, []);

  async function remove(id) {
    let data = await removeItemFromCart(id);
    await getCart()
  }

  return (<>
  { cartDetails? <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-5xl">
        {cartDetails?.data?.products.length === 0 ? (
          <div className="flex justify-center items-center h-[65vh]">
            <h2>Shop Now ***</h2>
          </div>
        ) : (
          <>
            <div className="mt-[65px] my-10 relative shadow-md sm:rounded-lg">
              <div className="hidden md:grid grid-cols-2 sm:grid-cols-5 gap-4 text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-700 text-xs font-semibold uppercase">
                <span>Image</span>
                <span className="hidden sm:block">Product</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Action</span>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartDetails?.data?.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <div>
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </div>
                    <div className="hidden sm:block font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCountToCart(product.product.id, product.count - 1)}
                        className="p-1 text-gray-500 bg-red-700 border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                      >
                        -
                      </button>
                      <span>{product.count}</span>
                      <button
                        onClick={() => updateCountToCart(product.product.id, product.count + 1)}
                        className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count}
                    </div>
                    <div>
                      <button
                        onClick={() => remove(product.product.id)}
                        className="text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 text-gray-700 dark:text-gray-400 text-xs font-semibold uppercase">
              <span className="text-2xl">Total Cart Price: {cartDetails?.data?.totalCartPrice}</span>
              <button onClick={clearCart} className="btn bg-red-600 text-white p-2 rounded-md mt-2 sm:mt-0">
                Clear All Cart <i className="fa-solid fa-trash ml-2"></i>
              </button>
            </div>
            <div className="flex flex-col w-full sm:w-[90%] mx-auto mt-4">
              <Link
                to={`/checkout/${cartDetails.cartId}`}
                className="btn bg-main p-4 rounded-md text-white text-center"
              >
                Check out
              </Link>
            </div>
          </>
        )}
      </div>
    </div>:<div className=" mt-[100px] flex justify-center items-center"><GridLoader
        color="#0aad0a" size={50}/></div>}</>
  )
}
