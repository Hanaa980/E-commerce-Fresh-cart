import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Btn from "./../btn/btn";
import RelatedProducts from "./../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { GridLoader } from "react-spinners";
import { cartContext } from "../context/cartContext";
import { Helmet } from "react-helmet";
import WishListIcon from "../ProductItem/service/wishListIcon";

export default function ProductDetails() {
  let { addToCart } = useContext(cartContext);
  const [loader, setLoader] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  let { id } = useParams();

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 1000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }

  useEffect(() => {
    setProductDetails({});
    setLoader(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProducts();
  }, [id]);

  return (
    <>
      <Helmet>
        <title> Product Details </title>
      </Helmet>
      {loader ? (
        <div className="mt-[100px] flex w-fullh-lvh items-center justify-center">
          <GridLoader color="#0aad0a" size={50} />
        </div>
      ) : (
        <>
          <div className=" mt-[100px] w-8/12 md:w-8/12 m-auto md:flex-row flex-col  flex  gap-5 justify-center md:justify-between my-10 items-center ">
            <div className="w-full px-5 md:w-5/12 border ">
              <Slider {...settings}>
                {productDetails.images.map((src, index) => (
                  <img src={src} key={index} />
                ))}
              </Slider>
            </div>
            <div className="w-full flex  flex-col md:w-7/12  ">
              <div className="flex justify-between items-center ">
                <h2 className="my-5 text-2xl ">{productDetails.title}</h2>
                <WishListIcon product={productDetails} />
              </div>
              <p className=" text-gray-400">{productDetails.description}</p>
              <span className="my-2 ">{productDetails.category.name}</span>

              <Btn product={productDetails} addToCart={addToCart} />
            </div>
          </div>
        </>
      )}
      <RelatedProducts />

    </>
  );
}
