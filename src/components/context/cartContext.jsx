import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios';
import { tokenContext } from './tokenContext';
import { toast } from "react-toastify";



export let cartContext = createContext();

export default function CartContextProvider(props) {
    const [numOfItems, setNumOfItems] = useState(0)
    const [cartDetails, setCartDetails] = useState('')
    const [checked, setChecked] = useState([])
    

    let { token } = useContext(tokenContext)
    const headers = {
        token
    }

    async function addToCart(productId) {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            { productId },
            { headers })
        if (data.status == "success") {
            setNumOfItems(data.numOfCartItems)
            setCartDetails(data)
        }

        
      return data
    }

    async function updateCountToCart(productId,count) {

        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
            { headers })
        if (data.status == "success") {
            setNumOfItems(data.numOfCartItems)
await getCart()
        }
        

        toast.success(data.status, {
            position: "bottom-right",
            autoClose: 3000,
            draggable: true,
            theme: "colored",
            });
    }

    async function getCart() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
        if (data.status == "success") {
            setNumOfItems(data.numOfCartItems)
            setCartDetails(data)
            setChecked(data?.data?.products?.map(product => product.product.id) || []);  // ✅ تحديث القائمة فورًا
        }
        
        }


    async function removeItemFromCart(productId) {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { headers })
        if (data.status == "success") {
            setNumOfItems(data.numOfCartItems)
              
        }
        setCartDetails(data)
    }


    async function clearCart() {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
        if ( data.message== "success") {
            setNumOfItems(0)
        }
        setCartDetails(data)
        await getCart()
    }
    useEffect(() => {
        token && getCart();
            
        
    }, [token]);
            return <cartContext.Provider value={{setChecked, checked,setNumOfItems,addToCart,updateCountToCart,clearCart, numOfItems, getCart, cartDetails, setCartDetails, removeItemFromCart }}>
        {props.children}
    </cartContext.Provider>
}




