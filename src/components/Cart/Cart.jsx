import { useEffect, useContext, useState } from "react";
import { cartContext } from "./../context/cartContext";
import { Link } from "react-router-dom";
import { tokenContext } from "../context/tokenContext";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function Cart() {
  // const [loader, setLoader] = useState(true)
  let { token } = useContext(tokenContext);
  let {
    cartDetails,
    updateCountToCart,
    removeItemFromCart,
    getCart,
    clearCart,
  } = useContext(cartContext);

  useEffect(() => {
    token && getCart();
  }, []);

  async function remove(id) {
    let data = await removeItemFromCart(id);
    await getCart();
  }

  return (
    <>
      <Helmet>
        <title>Cart </title>
      </Helmet>

      {cartDetails ? (
        <div className="p-4 flex justify-center items-center min-h-screen mt-[65px]">
          <div className="w-full max-w-5xl md:p-10 p-5 ">
            {cartDetails?.data?.products.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-[65vh]">
                <i className="fa-solid fa-cart-plus text-9xl text-gray-600/50 my-5"></i>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>

                <Link to={"/products"}>
                  <button className="btn bg-main p-5 text-white rounded-3xl m-5 font-bold ">
                    Shop now
                  </button>
                </Link>
              </div>
            ) : (
         <>
         <h2 className="font-bold text-4xl m-5 my-9">Your cart</h2>
                <div className=" my-10 relative shadow-md rounded-2xl  ">
                       
              
                  <div className="border-gray-400 border-2 md:p-5  shadow-lg rounded-2xl divide-y divide-gray-200 dark:divide-gray-700">
                    {cartDetails?.data?.products.map((product) => (
                      <div
                        key={product.product.id}
                        className="p-4 my-2 dark:bg-gray-800 bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <div className="flex w-full items-center gap-x-6">
                          <div className="w-2/6">
                            <img
                              src={product.product.imageCover}
                              className="w-[200px]"
                              alt={product.product.title}
                            />
                          </div>




                          <div className="md:w-2/3 w-full   ">
                            <div className="flex justify-between
                             mb-10 ">
                              <div className=" font-semibold text-gray-900 dark:text-white me-2 md:m-0">
                              {product.product.title.split(" ").splice(0, 2).join(" ")}
                            </div>
                             <button
                                onClick={() => remove(product.product.id)}
                                className="text-red-600 dark:text-red-500 hover:underline"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                            <div className="flex justify-between  ">
                               <div className="font-semibold text-gray-900 dark:text-white">
                              {product.price * product.count} EGP
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateCountToCart(
                                    product.product.id,
                                    product.count - 1
                                  )
                                }
                                className=" w-[20px]  flex justify-center items-center  text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                              >-</button>
                              <span>{product.count}</span>
                              <button
                                onClick={() =>
                                  updateCountToCart(
                                    product.product.id,
                                    product.count + 1
                                  )
                                }
                                className="w-[20px] flex justify-center items-center text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                              >
                                +
                              </button>
                            </div>
                           
                            </div>
                            <div>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 text-gray-700 dark:text-gray-400 text-xs font-semibold uppercase">
                  <span className="sm:text-2xl text-lg" >
                    Total Cart Price: {cartDetails?.data?.totalCartPrice}
                  </span>
                  <button
                    onClick={clearCart}
                    className="btn bg-red-600 text-white p-2 rounded-md mt-2 sm:mt-0"
                  >
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
        </div>
      ) : (
        <div className=" mt-[100px] flex justify-center items-center">
          <GridLoader color="#0aad0a" size={50} />
        </div>
      )}
    </>
  );
}