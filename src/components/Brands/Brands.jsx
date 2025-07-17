import { useState , useEffect} from "react";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";

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
 <>
    <Helmet><title>Brands </title></Helmet>

 { brands? 
   <div className="container mx-auto mt-[70px]  sm:flex flex-wrap p-10">
    {brands?.map((brand, index) => {
      return <div  key={index } className="mb-5 text-center xl:w-3/12 lg:w-4/12  sm:w-6/12   p-5 ">
  <div className="border-2  shadow-md shadow-gray-300 rounded-xl overflow-hidden ">
  <div className="img-box h-50 ">
    <img src={brand.image} className=" h-[100%] object-contain w-full" alt={brand.name} />
    </div>
    <h3 className="p-5 bg-gray-100 text-xl">{brand.name}</h3>
    
  </div>
  </div>
  
  })}
    </div>
    :<div className=" mt-[100px] flex justify-center items-center"><GridLoader
    color="#0aad0a" size={50}/></div>}
    </>
  )
}
