import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Navbar from './../Navbar/Navbar';
import { Outlet } from "react-router-dom";
import ScrollToTop from '../scroll/scroll';

export default function Layout() {

  return (
    <>
<Navbar/>
<ScrollToTop/>
<Outlet/>
<Footer/> 
    </>
  )
}
