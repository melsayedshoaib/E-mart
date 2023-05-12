import React, { useEffect, useState } from 'react'
import { addToCart, getLoggedCart } from '../../Store/Slices/cartSlice';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';

export default function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedCart());
  }, [dispatch]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  async function getProducts() {
    setLoading(true);
    let { data } = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products`)
    setLoading(false);
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  },[])
  return (
    <>
      <Helmet>
        <meta charSet='utf-8'/>
        <title>Products</title>
      </Helmet>
      <div className="row">
        {loading ? <div className='vh-100 d-flex align-items-center justify-content-center'>
            <div className='loader'></div>
          </div> : <>
          {products.map((product) => {
          return <div className='col-md-2' key={product._id}>
            <Link to={`/details/${product._id}`}>
              <div className="product px-2 py-4 cursor-pointer rounded-2">
                <img src={product.imageCover} alt="product" className='w-100' />
                <span className='text-main fw-bold font-sm'>{ product.category.name}</span>
                <h3 className='fs-6 fw-bolder'>{product.title}</h3>
                <div className='d-flex justify-content-between'>
                  <span className='text-muted'>{product.price} EGP</span>
                  <span>
                    <i className='fas fa-star rating-color'></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <button onClick={() => dispatch(addToCart(product._id))} className='btn bg-main text-white w-100'>Add to cart</button>
              </div>
            </Link>
          </div>
        })}
        </>}
      </div>
    </>
  )
}
