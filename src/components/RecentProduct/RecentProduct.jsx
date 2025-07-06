import { useState, useEffect } from "react";
import axios from 'axios';
import ProductItem from './../ProductItem/ProductItem';
import { GridLoader } from 'react-spinners';

export default function RecentProduct() {
  const [loader, setLoader] = useState(true)
  const [products, setProducts] = useState([])

  function getProducts() {



    axios.get("https://ecommerce.routemisr.com/api/v1/products").then(({ data }) => {

      setProducts(data.data)
      setLoader(false)


    }).catch(err => {

      setLoader(false)
    })

  }
  useEffect(() => {

    getProducts()

  }, [])


  return (<div className="mt-[100px]">
 
      {loader ? <div className=" flex w-full h-lvh items-center justify-center "><GridLoader
        color="#0aad0a" size={50}/></div> : <div className="flex  h-auto flex-wrap gap-y-5">
        {products.map(product =>
          <ProductItem product={product} key={product.id} />
        )}
      </div>}
  </div>
  )
}
