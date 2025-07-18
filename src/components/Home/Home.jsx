import { useState, useEffect } from "react";
import RecentProduct from "./../RecentProduct/RecentProduct";
import Slider from "react-slick";
import axios from "axios";
import { Helmet } from "react-helmet";
import heroIcon from "./../../assets/imges/hero-section.png";
import { Link } from "react-router-dom";

export default function Home() {
  const [categories, setCategories] = useState();

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getCategories();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 1000,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Home </title>
      </Helmet>

      <div className="bg-gradient-to-b from-[#7de47da5] to-white p-1">
        <div className=" bg-cover bg-center flex flex-col lg:flex-row wrap justify-between items-center py-20 px-8 text-center lg:h-[70vh] mt-[70px] ">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
              Your essentials, your style.
            </h1>
            <p className="text-lg mb-6 max-w-xl mx-auto">
              Explore a curated selection of pieces that elevate your everyday
              life — from timeless looks to smart essentials. Find what inspires
              you and make it yours.
            </p>
          </div>
          <div className="lg:w-1/2 ">
            <img src={heroIcon} className="w-full" alt="" />
          </div>
        </div>
        <div className="text-center">
          <Link to={"/products"}>
            <button className="btn  bg-main p-5 text-white rounded-3xl m-5 font-bold ">
              Discover more
            </button>
          </Link>
        </div>
      </div>
      <div className="w-[90%] m-auto bg-black f my-10 ">
        <div className="w-full p-2  custom  bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mx-auto my-10 p-2 border-b-2 w-[240px] text-center">
            Our Categories
          </h2>
          <Slider {...settings}>
            {categories?.map((img, index) => {
              return (
                <div key={index}>
                  <div className="border  bg-gray-100  p-3  shadow-lg sm:mx-2 shadow-gray-300 rounded-xl overflow-hidden  w-[90%] m-auto">
                    <div className="lg:w-[180px] lg:h-[180px] sm:w-[150px] sm:h-[150px] h-[180px]  w-[180px]  m-auto rounded-full overflow-hidden ">
                      <img src={img.image} className="w-full" />
                    </div>
                  </div>
                  <h3 className="text-center m-2 font-semibold">{img.name}</h3>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className=" ">
        <RecentProduct count={4} />
        <div className="text-center">
          <Link to={"/products"}>
            <button className="  justify-center bg-main p-5 text-white rounded-3xl m-5 font-bold ">
              See all products
              <i className="fa-solid fa-arrow-right fa-fade "></i>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
