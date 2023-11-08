import { useContext, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import fetchApi from "../../../util/helper.js";
import { API_ENDPOINTS } from "../../../config/api.js";
import { CartDataContext } from "../../../context/CartContext.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal.js";

export default function Cart({ open, setOpen }) {
  const navigate = useNavigate();
  const [removedItem, setRemovedItem] = useState([])
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [loading, setLoading] = useState({});
  const [removeAllOrder, setRemoveAllOrder] = useState(false);
  const [show, setShow] = useState(false);
  const { cartData, setCartData, totalAmount, changeQuantityContext, setTotalAmount } = useContext(CartDataContext);

  useEffect(() => {
    if (!open) {
      setShow(false);
    }
  }, [open])

  const removeData = async (data, type) => {
    if (type === "all")
      setRemoveAllOrder(true)
    try {
      const response = await fetchApi({ url: API_ENDPOINTS.CART, method: "DELETE", data: { cart_items: data }, isAuthRequired: true })
      if (response.status === 200) {
        setCartData(pre => type === "all" ? [] : pre.filter(pro => !data.includes(pro.cartitm_fk_prd_id._id)))
        toast.success("Item Removed Successfully");
        let removedItem = cartData.find(ele => ele.cartitm_fk_prd_id._id === data[0]);
        setTotalAmount(pre => type === "all" ? 0 : pre - removedItem.cartitm_fk_prd_id.prd_price * removedItem.cartitm_prd_qty)
      }
    } catch (error) {
      toast.error("Error to remove the item")
    }

    setRemoveAllOrder(false);
  }

  const changeQuantity = async (productId, operation) => {
    setLoading(pre => ({ ...pre, [productId]: true }));
    await changeQuantityContext(productId, operation)
    setLoading(pre => ({ ...pre, [productId]: false }));
  }

  const handleOrderSubmit = async () => {
    const response = await fetchApi({ url: API_ENDPOINTS.ORDER, method: "POST", isAuthRequired: true })
    if (response.status === 200) {
      toast.success("Order sent successfully");
      setCartData([]);
      setTotalAmount(0);
      navigate("/order");
      setOpen(false);
    } else {
      toast.error("Error to send order");
    }
    setShow(false);
  }


  return (
    <>
      <div onClick={() => setOpen(false)} className={`inset-0 ${open ? "bg-gray-500 fixed" : "bg-transparent"} bg-opacity-75`} />
      <div className={`fixed w-screen max-w-md z-20 inset-y-0 right-0 bg-white shadow-lg transform ${open ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out duration-300`}>
        <div className="flex flex-col h-full">
          <div className="sticky top-0 py-4 bg-white px-4 flex justify-between items-center">
            <h2 className="text-2xl text-center font-medium text-gray-900">Shopping Cart</h2>
            <div className="flex justify-between h-7 items-center">
              {removeAllOrder ?
                (<div className="animate-spin"><i className="fa-solid text-red-700 mx-10 fa-spinner"></i></div>
                ) : (
                  cartData.length > 0 && <button
                    className={`${cartData.length === 0 ? "text-gray-500" : "text-red-700"}  text-lg px-0  sm:px-3`}
                    onClick={() => { setIsRemoveModalOpen(true); setRemovedItem(cartData.map(item => item.cartitm_fk_prd_id._id)) }}
                    disabled={cartData.length === 0}
                  >Remove all</button>
                )}
              {/* () => cartData.length > 0 && removeData(cartData.map(item => item.cartitm_fk_prd_id._id), "all") */}
              <button
                type="button"
                className="relative -m-2 p-2 text-gray-500 hover:text-gray-600"
                onClick={() => setOpen(false)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-8 px-4 flex-1 overflow-y-auto">
            <ul className="divide-y">
              {cartData.length > 0 ? cartData.map((item, index) => (
                <div key={index}
                  className="flex flex-col sm:flex-row py-3 m-1 px-2"
                >
                  <div className="mb-3 sm:mb-0 w-1/2 block mx-auto sm:h-24 sm:w-24  flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      onError={(e) => {
                        e.target.src = 'images/download.png';
                      }}
                      src={item.cartitm_fk_prd_id.prd_img}
                      alt="Item"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="w-full ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p className="text-md text-ellipsis">
                          {item.cartitm_fk_prd_id.prd_name}
                        </p>
                        <div className="flex border-2 h-8 border-blue-700 rounded justify-between item-center space-x-2">
                          <button
                            id="decrementButton"
                            className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-r-2 border-blue-700 font-bold p-0 px-2 rounded-l-md"
                            onClick={() => changeQuantity(item.cartitm_fk_prd_id._id, false)}
                            disabled={loading[item.cartitm_fk_prd_id._id]}
                          >-</button>
                          {
                            loading[item.cartitm_fk_prd_id._id] ?
                              <div className="animate-spin"><i className="fa-solid fa-spinner"></i></div> :
                              <p className='w-1/3 block text-center text-md font-semibold mx-2 sm:mx-4'>{item.cartitm_prd_qty}</p>
                          }
                          <button
                            id="incrementButton"
                            className="w-1/3 block bg-slate-50 hover:bg-slate-100 text-blue-700 border-l-2 border-blue-700 font-bold px-2 rounded-r-md"
                            onClick={() => changeQuantity(item.cartitm_fk_prd_id._id, true)}
                            disabled={loading[item.cartitm_fk_prd_id._id]}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        ₹ {item.cartitm_fk_prd_id.prd_price} / item
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-bold text-lg">
                        Total: {item.cartitm_fk_prd_id.prd_price * item.cartitm_prd_qty}
                      </p>
                      <div className="flex">
                        <button
                          onClick={() => { setRemovedItem([item.cartitm_fk_prd_id._id]); setIsRemoveModalOpen(true) }}
                          type="button"
                          className="font-medium text-red-600 hover:text-red-700"
                        ><i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center">
                  <p className="text-xl">Your cart is empty!!!</p>
                  <button onClick={() => { navigate("/products"); setOpen(false); }} className="text-blue-700 text-center font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-md hover:bg-slate-100 border border-blue-700 my-3">Buy now</button>
                </div>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6">
            {totalAmount !== 0 && <div className="text-2xl flex justify-between font-medium text-gray-900">
              <p>Total</p>
              <p className="font-bold text-3xl">
                ₹ {totalAmount}
              </p>
            </div>}
            <div className="mt-6">
              <button
                onClick={() => setShow(true)}
                className={`${cartData.length > 0 ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer" : "bg-gray-600 cursor-not-allowed"} w-full flex items-center justify-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm`}
                disabled={cartData.length === 0}
              >Order</button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal show={show} setShow={setShow} handleSubmit={handleOrderSubmit} type="order" />
      <ConfirmationModal show={isRemoveModalOpen} setShow={setIsRemoveModalOpen} handleSubmit={() => cartData.length > 0 && removeData(removedItem, removedItem.length > 1 && "all")} type="remove" />
    </>
  );
}