import { useState , useEffect} from "react";
import RecentProduct from "../RecentProduct/RecentProduct";

export default function Products() {

    const [count,setCount]= useState(0);
    useEffect(()=>{} ,[]);

  return (
   
         <RecentProduct />
  )
}
