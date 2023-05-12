import { Fragment, useState } from 'react'

import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function Forgetpassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState('');
  async function sendDataPassword(values) {
    setLoading(true);
    let response = await axios.post("https://route-ecommerce-app.vercel.app/api/v1/auth/forgotPasswords", values).catch((err) => {
      setLoading(false);
      setError(err.response.data.message);
    })
    if (response.data.statusMsg === 'success') {
      setFlag(true);
    }
    setLoading(false);
  }
  async function sendDataCode(values) {
    setLoading(true);
    let response = await axios.post("https://route-ecommerce-app.vercel.app/api/v1/auth/verifyResetCode", values).catch((err) => {
      setLoading(false);
      setError(err.response.data.message);
    })
    if (response.data.status === 'Success') {
      navigate("/resetpassword");
    }
    setLoading(false);
  }
  let formikPassword = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      sendDataPassword(values)
    }
  })
  let formikCode = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      sendDataCode(values)
    }
  })
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgetpassword</title>
      </Helmet>
      <div className='w-75 mx-auto py-5'>
        <h2>Enter Your Email</h2>
        {flag ?  <form onSubmit={formikCode.handleSubmit}>
          <label htmlFor="resetCode">Reset Code: </label>
          <input onBlur={formikCode.handleBlur} onChange={formikCode.handleChange} type='text' value={formikCode.values.resetCode} className='form-control my-2' name='resetCode' id='resetCode'></input>
          {(formikCode.errors.resetCode && formikCode.touched.resetCode) && <div className='alert alert-danger'>{formikCode.errors.resetCode}</div>}
          {error.length > 0 ? <div className="alert alert-danger">{error}</div> : ""}
          <div className="d-flex align-items-center justify-content-start py-3">
            {loading ? <button title='waiting...' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' className='text-white btn bg-main my-2'>Verify Code</button>}
          </div>
        </form> :  <form onSubmit={formikPassword.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input onBlur={formikPassword.handleBlur} onChange={formikPassword.handleChange} type='email' value={formikPassword.values.email} className='form-control my-2' name='email' id='email'></input>
            {(formikPassword.errors.email && formikPassword.touched.email) && <div className='alert alert-danger'>{formikPassword.errors.email}</div>}
          <div className="d-flex align-items-center justify-content-start py-3">
            {loading ? <button title='waiting...' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' className='text-white btn bg-main my-2'>Send Code</button>}
          </div>
        </form>}
      </div>
    </Fragment>
    </div>
  )
}