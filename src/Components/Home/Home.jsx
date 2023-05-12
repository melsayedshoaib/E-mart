import React, { useEffect } from 'react'

import BrandSlider from '../BrandSlider/BrandSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet'
import MainSlider from '../MainSlider/MainSlider'
import { getLoggedCart } from '../../Store/Slices/cartSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedCart());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <meta charSet='utf-8'/>
        <title>E-mart</title>
      </Helmet>
      <div>
      <MainSlider />
      <BrandSlider/>
      <CategorySlider/>
      <FeaturedProducts/>
    </div>
    </>
  )
}
