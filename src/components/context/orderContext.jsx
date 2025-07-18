import axios from "axios";
import { createContext, useContext } from "react";
import { tokenContext } from "./tokenContext";

export let OrderContext = createContext();

export default function OrderContextProvider(props) {
  let { token } = useContext(tokenContext);
  let headers = { token };
  async function cacheOrder(cartId, values) {
    let res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { values },
      { headers }
    );
    return res;
  }

  async function onlineOrder(cartId, values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://hanaa980.github.io/E-commerce-Fresh-cart/%23`,
      { values },
      { headers }
    );
    window.location.href = data.session.url;

    return data;
  }

  return (
    <OrderContext.Provider value={{ cacheOrder, onlineOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
}
