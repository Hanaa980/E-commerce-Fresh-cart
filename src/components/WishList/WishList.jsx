import { useState, useEffect, useContext } from "react";
import { WishListContext } from "../context/WishListContext";
import { tokenContext } from "../context/tokenContext";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { toast } from "react-toastify";

export default function WishList() {
  let { addToCart, setCartDetails } = useContext(cartContext);
  let { token } = useContext(tokenContext)
  let { getWishList, removeFromWishList, wishList } = useContext(WishListContext)


  async function finalAddToCart(id) {
    let data = await addToCart(id);
    setCartDetails(data)
    remove(id)

    if (data.status == "success") {
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
        theme: "colored",
      });
    }
  }

  async function remove(id) {
    await removeFromWishList(id)
  }
  useEffect(() => {
    token && getWishList()
  }, []);


  return (
    <div className=" flex  w-full  items-center  ">
      <div className="flex  flex-col sm:flex-row w-full gap-y-5">
        {wishList.map(product => {
          return <div key={product.id} className="product   sm:w-6/12  md:w-4/12 lg:w-2/12 w-full p-2"  >
            <Link to={`/productDetails/${product.id}/${product.category._id}`}>
              <div className="w-[80%] m-auto ">
                <img src={product.imageCover} className="w-full" alt="" /></div>
            </Link>
            <div className="  flex  flex-col justify-center items-center">
              <h2>{product.title.split(" ").splice(0, 2).join(" ")}</h2>

              <p>{product.price} eg</p>

              <button className="text-red-700 mb-3" onClick={() => remove(product.id)}>remove</button>
            </div>
            <button onClick={() => finalAddToCart(product.id)} className=" bg-main p-2 rounded-lg text-white w-full">add to cart</button>
          </div>

            ;
        })}
      </div>
    </div>
  )
}
