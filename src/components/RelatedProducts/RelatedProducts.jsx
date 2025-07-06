import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ProductItem from './../ProductItem/ProductItem';
import { filterData } from "../ProductDetails/service/filter";

export default function RelatedProducts({ product }) {
  
  let { id ,categoryId} = useParams()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [originData, setOriginData] = useState([])
  function getProducts() {
    axios.get("https://ecommerce.routemisr.com/api/v1/products").then(({ data }) => {
      setOriginData(data.data)
      let res = filterData(data.data,categoryId,id);
      setRelatedProducts(res)
    }).catch(err => { })
  }


  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    let res = filterData(originData,categoryId,id)
    setRelatedProducts(res)
  }, [id])

  return (
    <>
      <h2 className="text-2xl">RelatedProducts </h2>
      <div className="flex flex-wrap my-10" >
      {relatedProducts.map(relatedProduct =>
        <ProductItem product={relatedProduct} key={relatedProduct.id}/>
      )}
      </div>
      
    </>
  )
}