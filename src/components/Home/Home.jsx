import { useState, useEffect } from "react";
import RecentProduct from './../RecentProduct/RecentProduct';
import Slider from "react-slick";
import axios from "axios";
import slider1 from "./../../assets/imges/slider-image-2.jpeg"
import slider2 from "./../../assets/imges/slider-image-3.jpeg"
import banner1 from "./../../assets/imges/grocery-banner.png"
import banner2 from "./../../assets/imges/grocery-banner-2.jpeg"


export default function Home() {

  const [categories, setCategories] = useState();


  function getCategories() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories").then(({ data }) => {

      setCategories(data.data)




    }).catch(err => {  })
  }

  useEffect(() => {
    getCategories()

  }, []);

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 1000,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  let settings2 = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 1000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>

      <div className="flex mt-[65px] ">
        <div className="w-8/12 p-2   custom-2  bg-white">
          <Slider {...settings2}>
            <img src={slider1} alt="" />
            <img src={slider2} alt="" />
          </Slider>
        </div>
        <div className="w-4/12 flex  banner flex-col justify-around">
          <img src={banner1} alt="" className=""/>
          <img src={banner2} alt="" />
        </div>
      </div>


      <div className="w-[90%] m-auto bg-black f my-10 ">
        <div className="w-full p-2  custom  bg-white">
          <Slider {...settings}>
            {categories?.map((img, index) => {
              return <div key={index} ><img src={img.image} />
                <h3>{img.name}</h3> </div>
            }
            )}
          </Slider>
        </div>
      </div>

      <RecentProduct  />

    </>
  )
}
