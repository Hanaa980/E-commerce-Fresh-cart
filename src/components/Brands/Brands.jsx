import { useState , useEffect} from "react";
import axios from "axios";

export default function Brands() {

  
  const [brands, setBrands] = useState();


    
  function getbrands() {
    axios.get("https://ecommerce.routemisr.com/api/v1/brands").then(({ data }) => {

      setBrands(data.data)



    }).catch(err => {  })
  }

  useEffect(() => {
    getbrands()
  }, []);

  return (
 
    <div className="container mt-[70px]  md:flex flex-wrap">
    {brands?.map((brand, index) => {
      return <div  key={index } className="mb-5  text-center  lg:w-3/12 md:w-6/12   p-5 ">
  <div className="border-2  hover:shadow-md hover:shadow-main duration-500">
  <div className="img-box h-96 ">
    <img src={brand.image} className=" h-[100%] object-contain w-full" alt="" />
    </div>
    <h3 className="p-5 bg-white text-xl">{brand.name}</h3>
    
  </div>
  </div>
  
  })}
    </div>
    
  )
}
