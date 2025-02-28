import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";



export let WishListContext =createContext();


export default function WishListContextProvider(props){

    const [wishList,setWishList]=useState([])
    const [countList,setCountList]=useState([])
    const [wishListId,setWishListId]=useState([])
    let { token } = useContext(tokenContext)
    const headers = {
        token
    }

    async function addToWishList(productId) {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
            { productId },
            { headers });
            setWishListId(data.data);
        setCountList(data.count)
        return data;
    }

    async function removeFromWishList(productId) {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
           setWishListId(data.data); 
        getWishList(); 
        setCountList(data.count)
        return data;
    }

    async function getWishList() {
        try {
            let  {data}  = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
           setWishList(data.data);
            setCountList(data.count)
            setWishListId(data.data.map(item => item._id));
            return data;
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }
useEffect(()=>{
   token && getWishList()

},[token])



return <WishListContext.Provider value={{countList,wishListId,removeFromWishList,getWishList,addToWishList,setWishList,wishList}}>
    {props.children}
</WishListContext.Provider>
}

