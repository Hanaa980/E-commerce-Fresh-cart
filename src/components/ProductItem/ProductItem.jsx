import { useContext} from "react";
import { Link} from 'react-router-dom';
import Btn from './../btn/btn';
import { cartContext } from "../context/cartContext";

export default function ProductItem({product}) {
  let {addToCart} =useContext(cartContext);
  return (
  <div className="product sm:w-6/12  md:w-4/12 lg:w-2/12 w-[80%] m-auto p-2 hover:bg-slate-100 duration-[1s]"  >
  <Link to={`/productDetails/${product.id}/${product?.category?._id}`}>
    <img src={product.imageCover} className="w-full py-2" alt="" />
    <h2>{product.title.split(" ").splice(0, 2).join(" ")}</h2>
  </Link>
  <Btn  product={product} addToCart={addToCart}   />
</div>
  )
}
