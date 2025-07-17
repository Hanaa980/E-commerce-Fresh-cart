import logo from "./../../assets/imges/freshcart-logo.svg";

export default function Footer() {
  return (
    <>
      <footer className="mt-9">
        <div className="flex bg-gray-100">
          <div className="mt-10 px-7 w-full ">
            <h3 className="mb-2 text-gray-800 font-bold">
              Get the freshCart app
            </h3>
            <p
              className="text-gray-400 text-sm
            "
            >
              we will send you a link, open it in your phone to dpwnload the app{" "}
            </p>
            <div className="flex flex-col sm:flex-row justify-between my-5  ">
              <input
                type="text"
                placeholder="Email..."
                className="w-full my-5 sm:m-0 sm:w-3/4 rounded-2xl border-gray-400  shadow-lg   focus:border-none focus:ring-lime-400 ring-0 "
              />
              <button className="w-full  bg-main sm:w-1/4 sm:ms-2 text-white  rounded-2xl p-3  ">
                share app link
              </button>
            </div>
          </div>
        </div>

       <div className=" bg-gray-900">
         <div className="py-11 px-5 flex flex-col sm:flex-row flex-wrap md:flex-nowrap justify-between text-white ">
          <div className="w-[33%]">
            <div className="flex gap-1 items-center">
              <i className="fa-solid fa-cart-shopping text-main text-2xl scale-x-[-1] "></i>
              <h4 className="text-3xl font-bold">FreshCart</h4>
            </div>
            <p className="my-2 text-gray-300 w-40">Your trusted partner for original products delivered with care. Quality guaranteed, satisfaction promised.</p>
          <div className="flex justify-between w-48 my-5">
            <i className="fa-brands fa-facebook-f cursor-pointer"></i>
            <i className="fa-brands fa-instagram cursor-pointer"></i>
            <i className="fa-brands fa-twitter cursor-pointer"></i>
            <i className="fa-brands fa-youtube cursor-pointer"></i>
          </div>
          </div>

          <div className="w-[33%] mb-5">
            <h5 className="mb-4 text-lg font-extrabold">Quick Links</h5>
            <ul className=" flex flex-col gap-y-3">
              <li className="">About Us</li>
              <li className="">Contact</li>
              <li className="">FAQ</li>
              <li className="">Terms of service</li>
              <li className="">privacy Policy</li>
            </ul>
          </div>

          <div className="w-[100%] md:w-[33%] ">
            <h5 className="mb-5 text-lg font-extrabold">Contact Info</h5>
            <ul className="flex flex-col sm:flex-row md:flex-col justify-between gap-10 ">
              <li className="flex">
                <i className="fa-solid fa-phone text-main"></i> <span> +20 01123456789</span>
              </li>
              <li className="">
                <i className="fa-solid fa-envelope  text-main"></i> <span> hello@freshcart.com</span>
              </li>
              <li className="">
                <i className="fa-solid fa-location-dot  text-main"></i> <span> giza,Eygpt</span>
              </li>

            </ul>
          </div>
          
        </div>
         <hr />
        <p className="mt-4 py-5 text-center text-white ">© 2025 FreshCart. All rights reserved.<br/> Made with <span className="font-extrabold text-lg">Hanaa Ragab</span> <span className="text-red-700">❤</span></p>
      
       </div>
       </footer>
    </>
  );
}
