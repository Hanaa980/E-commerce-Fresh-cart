import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const [isLoader, sertIsLoader] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("u-token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded?.id);
      } catch (error) {
      }
    }
  }, []);
  useEffect(() => {
    userId &&  getAllOrders();
  }, [userId]);

  async function getAllOrders() {
    sertIsLoader(true)
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setOrders(data);
      sertIsLoader(false)
    } catch (error) {
      sertIsLoader(false)
    }
  }

  const handleOpenModal = (order) => {
    setOpenModal(order._id);
    setSelectedCartItems(order.cartItems);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedCartItems([]);
  };

  return (
    <>  <Helmet><title> Orders </title></Helmet>

 <div className="min-h-[80vh] relative mt-[70px]">
 {isLoader?
 <div className="flex items-center justify-center"><ClipLoader size={50} color="#000" /></div>:<>
    <div className="bg-slate-500 flex justify-between w-full m-auto text-center ">
      <h2 className="text-xl w-[33%]">Date</h2>
      <h2 className="text-xl w-[33%]">Is Paid</h2>
      <h2 className="text-xl w-[33%]">Order Price</h2>
    </div>

    {orders.length > 0 ? (
      orders.map((order) => (
        <div key={order._id}>

          <button
            className="w-full py-5 flex justify-between"
            type="button"
            onClick={() => handleOpenModal(order)}
          >
            <span className="w-[33%]">{new Date(order.createdAt).toLocaleDateString()}</span>
            <span className="w-[33%]">{order.isPaid ? "Yes" : "No"}</span>
            <span className="w-[33%]">{order.totalOrderPrice} EGP</span>
          </button>


          {openModal === order._id && (
            <div className="  py-5  flex flex-col items-center bg-black bg-opacity-50 ">
              <div className=" w-full px-2 max-w-2xl bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="text-xl font-semibold">Order Details</h3>
                  <button className="text-gray-400 hover:text-gray-900" onClick={handleCloseModal}>
                    ✖
                  </button>
                </div>


                <div className="w-full">
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <p><strong>Payment Status:</strong> {order.isPaid ? "Paid" : "Not Paid"}</p>
                  <p><strong>Total Price:</strong> {order.totalOrderPrice} EGP</p>

                  <h3 className="text-md font-semibold mt-2">Products in Cart:</h3>
                  <ul className=" ml-5">

                    {selectedCartItems.length > 0 ? (
                      selectedCartItems.map((item, index) => (

                        <li key={index} className="p-2 flex items-center border-b">
                          <img src={item.product.imageCover} className="w-[100px]" alt="" />
                          <div className=""> <p><strong>Product Name:</strong> {item.name}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Price:</strong> {item.price} EGP</p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No items in the cart.</p>
                    )}
                  </ul>
                </div>

                <div className="flex justify-end p-4 border-t">
                  <button className="bg-main text-white px-4 py-2 rounded-md" onClick={handleCloseModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-center p-5">No orders available.</p>
    )}
    </>}
  </div>
</>
  );
}
