import { useState , useEffect} from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import { Helmet } from "react-helmet";

export default function Products() {

    const [count,setCount]= useState(0);
    useEffect(()=>{} ,[]);

  return (
   <> <Helmet><title> Products</title></Helmet>

         <RecentProduct />
         </>
  )
}
