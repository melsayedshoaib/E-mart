import React, { useEffect, useState } from 'react'

import Slider from 'react-slick'
import axios from 'axios';

export default function BrandSlider() {
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState([]);
  async function getBrand() {
    setLoading(true);
    let { data } = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/brands`)
    setLoading(false);
    setBrand(data.data);
  }
  useEffect(() => {
    getBrand();
  },[])
  let settings = {
    dots: false,
    slidesToShow: 7,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className='mb-2'>
      <h3 className='my-3'>Popular Brands</h3>
      {loading ? <div className='d-flex align-items-center justify-content-center vh-100'>
            <div className='loader'></div>
          </div> : <Slider {...settings}>
        {brand.map((br) => {
          return <div key={br._id}>
            <img className='w-100' src={br.image} alt='brand' />
            <h2 className='h6 pt-2 mb-5 text-center'>{ br.name}</h2>
          </div>
        })}
      </Slider>}
    </div>
  )
}
