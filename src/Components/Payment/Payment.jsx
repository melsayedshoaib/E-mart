import { Helmet } from 'react-helmet'
import React from 'react'
import axios from 'axios';
import { clearCart } from '../../Store/Slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function confirmCashOrder() {
    try {
      const  {data} = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/${sessionStorage.getItem('cart-id')}`, {
        "shippingAddress":{
          "details": document.querySelector('#address').value,
          "phone": document.querySelector('#phone').value,
          "city": document.querySelector('#city').value,
        }
      }, {
        headers: {Token: localStorage.getItem('user-token')}
      })
      if (data.status === 'success') {
        dispatch(clearCart());
        navigate('/allorders');
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function confirmCreditOrder() {
    try {
      const  {data} = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${sessionStorage.getItem('cart-id')}`, {
        "shippingAddress":{
          "details": document.querySelector('#address').value,
          "phone": document.querySelector('#phone').value,
          "city": document.querySelector('#city').value,
        }
      }, {
        headers: { Token: localStorage.getItem('user-token') },
        params: {'url': 'http://localhost:3000'}
      })
      if (data.status === 'success') {
        dispatch(clearCart());
        window.open(data.session.url);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Payment</title>
      </Helmet>
      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="w-75 mx-auto">
          <form>
            <label htmlFor="address" className='my-2'>Address</label>
            <input type="text" placeholder='Enter your addesss' name='address' id='address' className='form-control my-2' />
            <label htmlFor="phone" className='my-2'>Phone</label>
            <input type="text" placeholder='Enter your phone' name='phone' id='phone' className='form-control my-2' />
            <label htmlFor="city" className='my-2'>City</label>
            <input type="text" placeholder='Enter your city' name='city' id='city' className='form-control my-2' />
            <button className='btn btn-outline-primary my-2' onClick={confirmCashOrder} type='button'>Pay Cash</button>
            <button className='btn btn-outline-success my-2 mx-lg-2' onClick={confirmCreditOrder} type='button'>Pay Credit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
