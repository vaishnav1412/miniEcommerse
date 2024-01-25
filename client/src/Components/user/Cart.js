import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { cartDecrement, cartIncrement, deleteItems, fetchCartData, } from './userUtil/api';
import { RouteObjects } from '../../Routes/RouteObjests';
import { hideloading, showloading } from '../../Redux/alertSlice';
import { useDispatch } from 'react-redux';

const Crat = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const [cart, setcart] = useState([])
  const [price, setprice] = useState(null)
  const getCartData = async () => {
    try {
      dispatch(showloading());

      const response = await fetchCartData();
      dispatch(hideloading());

      if (response.data.success) {
        setcart(response.data.data);
        setprice(response.data.totalPrice)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());

      toast.error("something went wrong catch");
    }
  };
  useEffect(() => {
    getCartData()
  }, [])
  
  //===Cart decrement
  const decrement = async (decrementId,productId,quantity)=>{
    try {
      if(quantity === 1){

       deleteItem(productId)
       getCartData();
      }else{
        const response = await cartDecrement(decrementId)

        console.log(response,'res');
        if (response.data.success) {
          getCartData();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error)
        toast.error("something went wrong in catch")
    }

  }
  //====Cart Increment
  const increment = async(incrementId)=>{
    try {
      const response = await cartIncrement(incrementId)

      console.log('hai');
  
      if (response.data.success) {

        getCartData();
      } else {
        
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
        toast.error("something went wrong in catch")
    }
  }
  const deleteItem = async (productid) => {
    try {
      console.log(productid);
      const result = Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
      if ((await result).isConfirmed) {
        const response = await deleteItems(productid)
        if (response.data.success) {

          Swal.fire({
            title: "Deleted!",
            text: "Your Product has been deleted.",
            icon: "success"
          })
        }
        getCartData()
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      toast.error("something went wrong")
      console.log(error)
    }
  }

  const handleCheckout = async () => {
    navigate(RouteObjects.Checkout, {
      state: {
        cart: cart,
        price: price
      }
    })
  }
  return (
    <div className='mt-20 px-10 '>
      <div className=" bg-gray-100 pt-20 ">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3 overflow-y-scroll h-96">
            {cart?.length > 0 ? (
              cart?.map((items, index) =>
              (<div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start ">
                <img src={items?.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{items?.ProductName}</h2>
                    <p className="mt-1 text-xs text-gray-700">${items?.price} * {items?.quantity}-Qty </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={(()=>decrement(items?.productId,items?._id,items?.quantity))}> - </span>
                      <input  className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={ items?.quantity}  />
                      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={(()=>increment(items?.productId))}> + </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">{items?.productId.description}</p>
                      <svg onClick={() => deleteItem(items?._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>

                    </div>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <div>
                <h2 className="text-4xl font-bold text-gray-900">Cart Empty..</h2>
              </div>
            )}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${price}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            {cart.length > 0 ?
              (<button onClick={handleCheckout} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>) :
              (<button onClick={() => navigate(RouteObjects.Products)} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Shop Here </button>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crat