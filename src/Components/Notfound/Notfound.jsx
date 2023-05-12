import { Helmet } from 'react-helmet'
import React from 'react'
import error from '../../assets/imgs/error.svg'

export default function Notfound() {
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>404 - Not Found</title>
      </Helmet>
      <div>
        <img src={error} alt="error" className='w-100' />
      </div>
    </div>
  )
}
