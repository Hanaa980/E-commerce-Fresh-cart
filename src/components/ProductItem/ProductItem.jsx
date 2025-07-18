import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "./../btn/btn";
import { cartContext } from "../context/cartContext";
import Rating from "./service/rating";
import WishListIcon from "./service/wishListIcon";

export default function ProductItem({ product }) {
  let { addToCart } = useContext(cartContext);

  return (
    <div className="product relative my-5 sm:px-[2px] px-6 sm:w-6/12 md:w-4/12 xl:w-3/12  w-[100%]  ">
      <WishListIcon
        product={product}
        className=" absolute z-10 right-7 top-7  "
      />

      <div className="border rounded-2xl overflow-hidden   m-1">
        <Link to={`/productDetails/${product.id}/${product?.category?._id}`}>
          <div className="overflow-hidden w-full">
            <img
              src={product.imageCover}
              className="w-full rounded-t-2xl scale-[113%] "
              alt=""
            />
          </div>
        </Link>
        <div className="border rounded-b-2xl  p-3 bg-gray-200/50">
          <h2 className="my-3 font-bold text-lg line-clamp-1">
            {product.title.split(" ").splice(0, 2).join(" ")}
          </h2>
          <Rating rating={product.ratingsAverage} />
          <p className="text-sm my-2 line-clamp-1">{product.description}</p>

          <Btn product={product} addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
}
