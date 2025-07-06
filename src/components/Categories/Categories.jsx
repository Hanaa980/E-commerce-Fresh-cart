import { useState, useEffect } from "react";
import axios from "axios";
import { GridLoader } from "react-spinners";

export default function Categories() {

  const [categories, setCategories] = useState();



  function getCategories() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories").then(({ data }) => {

      setCategories(data.data)


    }).catch(err => {  })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
<>
  { categories? <div className="container mx-auto md:flex flex-wrap mt-[70px]">
      {categories?.map((category, index) => {

        return <div key={index} className="mb-5  text-center  lg:w-3/12 md:w-6/12   p-5   ">
          <div className="border-2  hover:shadow-md hover:shadow-main duration-500">

            <div className="img-box h-96 ">
              <img src={category.image} className=" h-[100%] object-cover w-full" alt="" />
            </div>
            <h3 className="p-5 bg-white text-xl">{category.name}</h3>
          </div>
        </div>

      })}
    </div>
:<div className=" mt-[100px] flex justify-center items-center"><GridLoader
color="#0aad0a" size={50}/></div>
    }
</>

  )
}
