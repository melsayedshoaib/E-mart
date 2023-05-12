import React, { useEffect, useState } from 'react'

import Slider from 'react-slick'
import axios from 'axios';

export default function CategorySlider() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  async function getCategory() {
    setLoading(true);
    let { data } = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/categories`)
    setLoading(false);
    setCategory(data.data);
  }
  useEffect(() => {
    getCategory();
  },[])
  let settings = {
    dots: false,
    slidesToShow: 7,
    autoplay: true,
    autoplaySpeed: 1000,
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
      <h3 className='my-3'>Popular Categories</h3>
      {loading ? <div className='d-flex align-items-center justify-content-center vh-100'>
            <div className='loader'></div>
          </div> : <Slider {...settings}>
        {category.map((cat) => {
          return <div key={cat._id}>
            <img height={200} className='w-100' src={cat.image} alt='category' />
            <h2 className='h6 pt-2 mb-5'>{ cat.name}</h2>
          </div>
        })}
      </Slider>}
    </div>
  )
}
