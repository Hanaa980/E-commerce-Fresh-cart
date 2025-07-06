import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import { lazy, Suspense, useContext, useEffect } from 'react';
import { tokenContext } from './components/context/tokenContext';
import ProtectedRoutes from './components/context/protectedRoutes';
import { ToastContainer } from 'react-toastify';


function App() {
  let { setToken } = useContext(tokenContext)
  useEffect(() => {
    if (localStorage.getItem("u-token")) {
      setToken(localStorage.getItem("u-token"))
    }
  })


  const Cart =lazy(()=>import('./components/Cart/Cart'))
  const Home =lazy(()=>import('./components/Home/Home'))
  const Orders =lazy(()=>import('./components/Orders/Orders'))
  const WishList =lazy(()=>import('./components/WishList/WishList'))
  const Register =lazy(()=>import('./components/Register/Register'))
  const Login =lazy(()=>import('./components/Login/Login'))
  const ProductDetails =lazy(()=>import('./components/ProductDetails/ProductDetails'))
  const Checkout =lazy(()=>import('./components/Checkout/Checkout'))
  const Layout =lazy(()=>import('./components/Layout/Layout'))
  const Products =lazy(()=>import('./components/Products/Products'))
  const ForgetPass =lazy(()=>import('./components/forgetPass/ForgetPass'))
  const ResetPass =lazy(()=>import('./components/resetPass/ResetPass'))
  const VerifyCode =lazy(()=>import('./components/VerifyCode/VerifyCode'))
  
  const Router = createHashRouter([
    {
      path: "", element:
       <Suspense> <Layout /></Suspense>,
      children: [
        {
          path: "", element:<Suspense> <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
          </Suspense>
        },
        { path: "brands", element: <ProtectedRoutes> <Brands /> </ProtectedRoutes> },
        { path: "products", element: <Suspense> <ProtectedRoutes><Products /> </ProtectedRoutes> </Suspense>},
        { path: "productDetails/:id/:categoryId", element:<Suspense> <ProtectedRoutes><ProductDetails /> </ProtectedRoutes></Suspense> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "login", element:<Suspense> <Login /></Suspense> },
        { path: "forgetpassword", element:<Suspense> <ForgetPass /> </Suspense>},
        { path: "resetpassword", element:<Suspense> <ResetPass /></Suspense> },
        { path: "verifycode", element: <Suspense><VerifyCode /></Suspense> },
        { path: "register", element:<Suspense> <Register /></Suspense> },
        { path: "cart", element: <Suspense><ProtectedRoutes><Cart /></ProtectedRoutes></Suspense> },
        { path: "checkout/:cartId", element:<Suspense> <ProtectedRoutes><Checkout /></ProtectedRoutes></Suspense> },
        { path: "allorders", element:<Suspense> <ProtectedRoutes><Orders /></ProtectedRoutes></Suspense> },
        { path: "whishlist", element:<Suspense> <ProtectedRoutes><WishList /></ProtectedRoutes></Suspense> },



        { path: "*", element: <NotFound /> }
      ]
    }
  ])
  return (

    <>
      <RouterProvider router={Router}>
      </RouterProvider>

      <ToastContainer />
    </>
  )
}

export default App



