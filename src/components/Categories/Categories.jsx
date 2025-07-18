import { useState, useEffect } from "react";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState();

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title> Categories</title>
      </Helmet>
      {categories ? (
        <div className="container mx-auto sm:flex flex-wrap mt-[100px] px-10">
          {categories?.map((category, index) => {
            return (
              <div
                key={index}
                className="mb-5  text-center  xl:w-3/12 lg:w-4/12  sm:w-6/12   p-5"
              >
                <div className="border-2  shadow-md shadow-gray-300 rounded-xl overflow-hidden duration-500 ">
                  <div className="img-box sm:h-40  ">
                    <img
                      src={category.image}
                      className=" h-[100%] object-cover w-full"
                      alt={category.name}
                    />
                  </div>
                  <h3 className="p-5 bg-gray-100 text-xl">{category.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" mt-[100px] flex justify-center items-center">
          <GridLoader color="#0aad0a" size={50} />
        </div>
      )}
    </>
  );
}
