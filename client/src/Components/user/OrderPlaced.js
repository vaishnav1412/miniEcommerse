import React from 'react'

const OrderPlaced = () => {
  return (
    <div className='h-screen flex justify-center items-center' >


      <div className=' px-10 mt-20 '>
        <div className=" bg-gray-100 p-20 ">
          <h1 className="mb-10 text-center text-5xl font-bold">Thank you.</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3 h-max">
              <div class="container text-center ">
                <img src='https://content.presentermedia.com/files/clipart/00003000/3296/check_mark_green_800_wht.jpg' className='w-40 h-40 xl:ml-60' />
                <p class="lead w-lg-50 mx-auto text-2xl">Your order has been placed successfully.</p>
                <p class="w-lg-50 mx-auto text-2xl">Your order number is <a href="#/">9237427634826</a>. We will immediatelly process your and it will be delivered in 2 - 5 business days.</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPlaced