import { useState, useEffect, useContext } from "react";
import { WishListContext } from "../context/WishListContext";
import { tokenContext } from "../context/tokenContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ProductItem from "./../ProductItem/ProductItem";

export default function WishList() {
  let { token } = useContext(tokenContext);
  let { getWishList, wishList } =
    useContext(WishListContext);

  useEffect(() => {
    token && getWishList();
  }, []);

  return (
    <>
      <Helmet>
        <title> Wish List</title>
      </Helmet>

      <div className=" mt-[100px] w-full   ">
        {wishList.length === 0 ? (
          <>
            <div className="flex flex-col justify-center items-center h-[65vh] w-full">
              <i className="fa-solid fa-heart text-9xl text-gray-600/50 my-5"></i>
              <h2 className="text-2xl font-bold">Your wish List is empty</h2>

              <Link to={"/products"}>
                <button className="btn bg-main p-5 text-white rounded-3xl m-5 font-bold ">
                  Browser products
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mx-5  ">
              Your Favorite products
            </h2>
            <div className=" flex flex-col sm:flex-row flex-wrap ">
              {wishList.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
