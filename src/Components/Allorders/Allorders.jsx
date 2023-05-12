import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import axios from 'axios';

export default function Allorders({ userData }) {
  const [orders, setOrders] = useState(null);
  async function getAllOrders() {
    try {
      const { data } = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/orders/user/${userData.id}`)
      setOrders(data);
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllOrders();
  })
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Purchased Orders</title>
      </Helmet>
      <div className="container min-vh-100">
        <div className="row">
          {orders?.map((order) => {
            return <>
              <div className="col-sm-2 my-3" key={order._id}>
                {order.cartItems.map((item) => {
                  return <div className='shadow-lg' key={item._id}>
                    <img src={item.product.imageCover} alt="product" className='w-100' />
                    <p className='text-center'>Count: {item.count}</p>
                    <p className='text-center'>Title: {item.product.title}</p>
                    <p className='text-center'>Price: {item.price} EGP</p>
                  </div>
                })}
                <p className='text-center bg-primary text-white p-3 rounded-2'>Total Order Price: {order.totalOrderPrice} EGP</p>
              </div>
            </>
          })}
        </div>
      </div>
    </div>
  )
}
