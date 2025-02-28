import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Btn from './../btn/btn';
import RelatedProducts from './../RelatedProducts/RelatedProducts';
import Slider from 'react-slick';
import { GridLoader } from 'react-spinners';
import { cartContext } from "../context/cartContext";

export default function ProductDetails() {

  let {addToCart} =useContext(cartContext); 
  const [loader, setLoader] = useState(true)
  const [productDetails, setProductDetails] = useState({})
  let { id } = useParams()

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 1000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {

        setProductDetails(data.data);
        setLoader(false);
      }).catch(err => { 
        setLoader(false);
      });
  }


  useEffect(() => {

    getProducts();

  }, [id])

  return (
    <>
    {loader ? <div className=" flex w-fullh-lvh items-center justify-center"><GridLoader
        color="#0aad0a" size={50}/></div> : <div className="w-11/12 m-auto sm:flex-row flex-col  flex  gap-y-5 justify-center my-10 items-center">
        <div className=" w-full p-2 sm:w-4/12 ">
        
         <Slider {...settings}>
         {productDetails.images.map((src,index) =><img  src={src} key={index}   />)}
            </Slider>

        </div>
        <div className="w-full flex  flex-col sm:w-8/12 ">
          <h2 className="my-5 text-2xl ">{productDetails.title}</h2>

          <p className=" text-gray-400">{productDetails.description}</p>
          <span className="my-2 ">{productDetails.category.name}</span>

          <Btn product={productDetails} addToCart={addToCart}/>
        </div>

      </div>
}

      <RelatedProducts product={productDetails}   />
    </>

  )
}