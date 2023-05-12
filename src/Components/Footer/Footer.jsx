import React from 'react'
import image1 from '../../assets/imgs/amazonpay.svg'
import image2 from '../../assets/imgs/american-express.svg'
import image3 from '../../assets/imgs/appstore-btn.svg'
import image4 from '../../assets/imgs/googleplay-btn.svg'
import image5 from '../../assets/imgs/mastercard.svg'
import image6 from '../../assets/imgs/paypal.svg'
import image7 from '../../assets/imgs/visa.svg'

export default function Footer() {
  return (
    <div className='bg-footer py-5 mt-3'>
      <div className="container">
        <h4 className='fw-normal'>Get the E-mart app</h4>
        <p className="text-muted">We will send you a link, open it on your phone to download the app.</p>
        <div className='d-flex align-items-center justify-content-between border-bottom pb-3'>
          <input type="email" placeholder='Enter Your Email' className='rounded-2 form-control p-2 m-2' />
          <button className='bg-main btn text-white p-2'>Send</button>
        </div>
        <div className='d-flex align-items-center justify-content-between border-bottom py-3 flex-wrap'>
          <div className='d-flex align-items-center gap-2 flex-wrap'>
            <h6>Payment Partners</h6>
            <img src={image1} alt="payment" />
            <img src={image2} alt="payment" />
            <img src={image5} alt="payment" />
            <img src={image6} alt="payment" />
            <img src={image7} alt="payment" />
          </div>
          <div className='d-flex align-items-center gap-2 flex-wrap'>
            <h6>Get deliveries with E-mart</h6>
            <img src={image3} alt="download" className='w-25' />
            <img src={image4} alt="download" className='w-25' />
          </div>
        </div>
      </div>
    </div>
  )
}
