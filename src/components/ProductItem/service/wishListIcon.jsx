import { useContext } from "react";
import { WishListContext } from "../../context/WishListContext";
import { toast } from "react-toastify";

export default function WishListIcon({ product, className }) {
  let { addToWishList, getWishList, removeFromWishList, wishListId } =
    useContext(WishListContext);
  const isInWishlist = wishListId?.includes(product.id);

  async function handleWishlistToggle() {
    if (isInWishlist) {
      let data = await removeFromWishList(product.id);
      if (data.status == "success") {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
          draggable: true,
          style: {
            borderRadius: "10px",
            color: "#555",
          },
        });
      }
    } else {
      let data = await addToWishList(product.id);
      if (data.status == "success") {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
          draggable: true,
          style: {
            borderRadius: "10px",
            color: "#555",
          },
        });
      }
    }
    getWishList();
  }

  return (
    <>
      <i
        onClick={handleWishlistToggle}
        className={`fa-heart ${
          isInWishlist ? "fa-solid text-red-700" : "fa-regular"
        } ${className} bg-slate-200 p-4 rounded-full text-xl cursor-pointer `}
      ></i>
    </>
  );
}
