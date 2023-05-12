import React, { useEffect } from 'react'
import { clearCart, getLoggedCart, removeSpecificProduct, updateCart } from '../../Store/Slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux';

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';

export default function Cart() {
  let { cart, total } = useSelector((state) => state.cartSlice);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedCart());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Cart</title>
      </Helmet>
      <div className="container min-vh-100">
        <div className="row align-items-center gy-3">
          {cart?.map((item) => {
            return <div className='d-flex align-items-center flex-wrap' key={item._id}>
              <div className="col-md-1">
                <img src={item.product.imageCover} alt="" className='w-100' />
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center">
                <div className='ms-3'>
                  <p className='fs-5 mb-2'><span className="fw-bolder text-success">Price:</span> { item.price} EGP</p>
                  <h5 className='mb-2'><span className="fw-bolder text-success">Title</span> { item.product.title.substring(0,24)}...</h5>
                  <button onClick={() => dispatch(removeSpecificProduct(item.product._id))} className='btn btn-outline-danger'><i className='fa fa-trash'></i> Remove</button>
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                  <button onClick={() => dispatch(updateCart({id: item.product._id, count: item.count + 1}))} className='btn btn-outline-success fs-5'>+</button>
                  <span className='mx-3'>{item.count}</span>
                  <button onClick={() => item.count > 1 ? dispatch(updateCart({id: item.product._id, count: item.count - 1})): dispatch(removeSpecificProduct(item.product._id))} className='btn btn-outline-danger fs-5'>-</button>
                </div>
              </div>
            </div>
          })}
        </div>
        {total ? <>
          <p className='fs-3 text-end py-3'><span className="fw-bolder text-success">Total Price:</span> { total} EGP</p>
          <div className='text-end'>
            <Link to={'/payment'}><button className='btn btn-outline-success mx-1 fs-4 my-1'>Checkout</button></Link>
            <button onClick={() => dispatch(clearCart())} className='btn btn-outline-danger mx-1 fs-4 my-1'>Clear Cart</button>
          </div>
        </> : <div className='d-flex align-items-center justify-content-center min-vh-100'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="empty-cart" className='w-75' />
        </div>}
      </div>
    </div>
  )
}
