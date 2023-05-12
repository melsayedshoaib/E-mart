import React from 'react'
import Slider from 'react-slick'
import header1 from '../../assets/imgs/grocery-banner-2.jpeg'
import header2 from '../../assets/imgs/grocery-banner.png'
import header3 from '../../assets/imgs/slider-2.jpeg'
import header4 from '../../assets/imgs/slider-image-1.jpeg'
import header5 from '../../assets/imgs/slider-image-2.jpeg'
import header6 from '../../assets/imgs/slider-image-3.jpeg'

const imgs = [ header1, header2, header3, header4, header5, header6]

export default function MainSlider() {
    let settings = {
    dots: false,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,
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
    <div className='mt-3'>
      <Slider {...settings}>
        {imgs.map((image, index) => {
          return <div key={index}>
            <img height={200} src={image} alt="product" className='w-100' />
          </div>
        })}
      </Slider>
    </div>
  )
}
