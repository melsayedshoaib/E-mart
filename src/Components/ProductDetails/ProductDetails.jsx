import React, { useEffect, useState } from 'react'
import { addToCart, getLoggedCart } from '../../Store/Slices/cartSlice';

import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedCart());
  }, [dispatch]);
  const [productDetails, setProductDetails] = useState(null);
  let params = useParams();
  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  async function getProductDetails(id) {
    let { data } = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`)
    setProductDetails(data.data);
  }
  useEffect(() => {
    getProductDetails(params.id);
  })
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>About</title>
      </Helmet>
      <div className="row align-items-center py-3 vh-100">
        <div className="col-md-4 d-flex justify-content-center">
          <Slider {...settings} className='w-75'>
              {productDetails?.images.map((image, index) => <img src={image} alt='product' key={index} className='w-100' />)}
          </Slider>
        </div>
        <div className="col-md-8 mt-5">
          <h3>{productDetails?.title}</h3>
          <p className='text-muted'>{productDetails?.description}</p>
          <div className="d-flex justify-content-between">
            <span className='text-muted'>{productDetails?.price} EGP</span>
            <span>
              <i className='fas fa-star rating-color'></i>
              {productDetails?.ratingsAverage}
            </span>
          </div>
          <button onClick={() => dispatch(addToCart(productDetails._id))} className='btn bg-main text-white w-100 my-2'>Add to cart</button>
        </div>
      </div>
    </>
  )
}
