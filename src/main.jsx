import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import 'flowbite/dist/flowbite.min.js'
import TokenContextProvider from './components/context/tokenContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './components/context/cartContext.jsx'
import OrderContextProvider from './components/context/orderContext.jsx'
import WishListContextProvider from './components/context/WishListContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>

    < TokenContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
        <OrderContextProvider>
        <App />
        </OrderContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </TokenContextProvider>

  </StrictMode>,
)
