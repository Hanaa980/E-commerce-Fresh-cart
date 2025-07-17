import { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "./../../assets/imges/freshcart-logo.svg";
import { tokenContext } from "../context/tokenContext";
import { cartContext } from "../context/cartContext";
import { WishListContext } from "../context/WishListContext";

export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const { numOfItems } = useContext(cartContext);
  const { countList } = useContext(WishListContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [token,location]);

  function logOut() {
    localStorage.removeItem("u-token");
    setToken("");
    navigate("/login");
  }
  


  return (
    <nav className="bg-white border-gray-200 fixed top-0 start-0 end-0 z-[100000]">
      <div
        className="max-w-screen-xl flex flex-nowrap items-center lg:gap-[150px] justify-between lg:justify-start mx-auto p-4"
        onClick={(e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
          }
        }}
      >
        <div className="flex items-center gap-5 w-[150px] sm:w-auto">
          <Link to="" className="flex items-center">
            <img src={logo} className="h-8" alt="FreshCart Logo" />
          </Link>

          {token && (
            <div
              className={`${
                isOpen ? " right-0" : "right-[-300px]"
              } lg:flex lg:items-center w-[300px] lg:w-auto absolute lg:static top-16 right-0 bg-gray-50 lg:bg-white p-2 lg:p-0 border lg:border-0  duration-[1s]`}
              id="navbar-multi-level"
            >
              <ul className="flex flex-col lg:flex-row lg:space-x-3 mb-8 lg:m-0">
                <li>
                  <NavLink to="" className="block py-2 px-2 text-black">Home</NavLink>
                </li>
                <li>
                  <NavLink to="products" className="block py-2 px-2 text-black">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className="block py-2 px-2 text-black"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="brands" className="block py-2 px-2 text-black">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="allorders"
                    className="block py-2 px-2 text-black"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
              <span
                onClick={logOut}
                className="mb-1 lg:mb-0 lg:absolute lg:top:10px lg:end-0 mx-8 block cursor-pointer hover:bg-red-700 rounded-lg hover:text-white p-2"
              >
                Sign out
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          {!token ? (
            <>
              <NavLink to="login" className="m-2 p-2">
                Login
              </NavLink>
              <NavLink to="register" className="m-2 p-2">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="cart" className="block py-2 px-2 text-black">
                <i className="fa-solid fa-cart-shopping"></i> {numOfItems}
              </NavLink>
              <NavLink to="whishlist" className="block py-2 px-2 text-black">
                <i className="text-red-800 fa-solid fa-heart"></i> {countList}
              </NavLink>
            </>
          )}
        </div>

        {token && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            className="p-2 btn-custom bg-gray-200 rounded-md hover:bg-gray-300 transition flex items-center"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1l12 12M13 1L1 13"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
