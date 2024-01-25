import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { orderpayment, placetheOrder } from './userUtil/api';
import toast from 'react-hot-toast';
import { RouteObjects } from '../../Routes/RouteObjests';

const Checkout = () => {
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [address, setAddress] = useState("")
    const location = useLocation();
    const { cart, price } = location.state || {};

    const placeorder = async (e) => {
        try {
            e.preventDefault()
            if (!address || !paymentMethod) {
                toast.error(" you missed to fill address/payment...")
                return
            }
            const orderData = {
                price: price,
                address: address,
                paymentmethod: paymentMethod
            }
            e.preventDefault()
            const response = await placetheOrder(orderData)
            if (response.data.success) {
                if (response.data.payment === "cashOnDelivery") {
                    navigate(RouteObjects.placed)
                } else if (response.data.payment === "onlinePayment") {
                    razorpayPayment(response.data.data, response.data.orderId);
                }
            } else { toast.error(response.data.message) }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong1")
        }
    }
    function razorpayPayment(order, id) {
        let key = process.env.REACT_APP_RAZORID
        var options = {
            key: "rzp_test_QK6YRj6TBJfBBw",
            amount: order.totalAmount * 100,
            currency: "INR",
            name: "HL ENTERPRISES",
            description: "Pay Your Advance Amount Here",
            image: "",
            order_id: order.id,
            handler: function (response) {
                verifyPayment(response, order, id);
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            }
        }
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    const verifyPayment = (payment, order, id) => {
        PaymentUpdate(payment, order, id);
    }
    const PaymentUpdate = async (payment, order, id) => {
        try {
            const response = await orderpayment(payment, order, id)
            if(response.data.success){
                navigate(RouteObjects.placed)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("someting went wrong catch")
        }
    }
    return (
        <div>
            <div className='mt-20 px-10 '>
                <div className=" bg-gray-100 pt-20 ">
                    <h1 className="mb-10 text-center text-2xl font-bold">place order</h1>
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="rounded-lg md:w-2/3  h-96">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start ">
                                <h1 className='text-lg font-bold' >Your Full Address</h1>

                                <textarea required onChange={(e) => setAddress(e.target.value)}
                                    value={address} placeholder='Text here..' className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none rounded-sm focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div>
                                <input
                                    required
                                    type="radio"
                                    id="cashOnDelivery"
                                    name="paymentMethod"
                                    value="cashOnDelivery"
                                    checked={paymentMethod === 'cashOnDelivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className='p-2' htmlFor="cashOnDelivery">Cash on Delivery</label>
                            </div>
                            <div>
                                <input
                                    required
                                    type="radio"
                                    id="onlinePayment"
                                    name="paymentMethod"
                                    value="onlinePayment"
                                    checked={paymentMethod === 'onlinePayment'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className='p-2' htmlFor="onlinePayment">Online Payment</label>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total </p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">${price}</p>
                                    <p className="text-sm text-gray-700">including VAT</p>
                                </div>
                            </div>
                            <button onClick={placeorder} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Place Your Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout