import * as Yup from 'yup'

import { Link, useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'

export default function Login({saveUserData}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function sendData(values) {
    setLoading(true);
    let {data} = await axios.post("https://route-ecommerce-app.vercel.app/api/v1/auth/signin", values).catch((err) => {
      setLoading(false);
      setError(err.response.data.message)
    })
    if (data.message === 'success') {
      localStorage.setItem("user-token", data.token);
      saveUserData();
      setLoading(false);
      navigate('/home')
    }
  }
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Enter a valid email address"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => sendData(values)
  })
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="w-75 mx-auto py-4">
        <h3>Login</h3>
        {error.length > 0 && <div className='alert alert-danger'> { error}</div>}
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="email" className='mb-2'>Email</label>
          <input type='email' className='form-control mb-2' id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {(formik.errors.email && formik.touched.email) && <div className='alert alert-danger'>{formik.errors.email}</div>}
          
          <label htmlFor="password" className='mb-2'>Password</label>
          <input type='password' className='form-control mb-2' id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {(formik.errors.password && formik.touched.password) && <div className='alert alert-danger'>{formik.errors.password}</div>}

          {loading ? <button title='waiting...' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='text-white btn bg-main my-2'>Login</button>}
          <Link to={'../forgetpassword'} className='text-decoration-none text-white btn btn-danger ms-lg-2'>Forget Password?</Link>
        </form>
        <div className='my-2'>
          <p>Don't have an account? <button onClick={() => navigate("/register")} className='text-white btn bg-main my-2'>Register</button></p>
        </div>
      </div>
    </div>
  )
}