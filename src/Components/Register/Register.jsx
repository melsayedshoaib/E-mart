import * as Yup from 'yup'

import React, { useState } from 'react'

import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleRegister(values) {
    setLoading(true);
    let { data } = await axios.post("https://route-ecommerce-app.vercel.app/api/v1/auth/signup", values).catch((err) => {
      setLoading(false);
      setError(err.response.data.message);
    })
    if (data.message === 'success') {
      setLoading(false);
      navigate('/login');
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: Yup.object({
        name: Yup.string().required('Name is required').min(3, 'Minimum length must be at least 3 characters'),
        email: Yup.string().required("Email is required").email("Enter a valid email address").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email address"),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,}$/i, "Invalid password - Must start with a capital letter"),
        rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref("password")], "Repassword doesn't match password"),
        phone: Yup.string().required('Phone is required').matches(/^01[1052][0-9]{8}$/i, "Invalid phone number"),
      }),
    onSubmit: handleRegister
  })
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="w-75 mx-auto py-4">
        <h3>Register Now</h3>
        {error.length > 0 && <div className='alert alert-danger'>{ error}</div>}
        <form onSubmit={formik.handleSubmit}>
          
          <label htmlFor="name" className='mb-2'>Name</label>
          <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" />
          {(formik.errors.name && formik.touched.name) && <div className='alert alert-danger'>{ formik.errors.name}</div>}

          <label htmlFor="email" className='mb-2'>Email</label>
          <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
          {(formik.errors.email && formik.touched.email) && <div className='alert alert-danger'>{ formik.errors.email}</div>}

          <label htmlFor="password" className='mb-2'>Password</label>
          <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
          {(formik.errors.password && formik.touched.password) && <div className='alert alert-danger'>{formik.errors.password}</div>}
          
          <label htmlFor="rePassword" className='mb-2'>Re-password</label>
          <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" />
          {(formik.errors.rePassword && formik.touched.rePassword) && <div className='alert alert-danger'>{ formik.errors.rePassword}</div>}

          <label htmlFor="phone" className='mb-2'>Phone</label>
          <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" />
          {(formik.errors.phone && formik.touched.phone) && <div className='alert alert-danger'>{formik.errors.phone}</div>}
          
          {loading ? <button className='text-white btn bg-main my-2' title='waiting...'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>}

        </form>

        <div className='my-2'>
          <p>Already have an account? <button className='text-white btn bg-main my-2' onClick={() => navigate("/login")}>Login</button></p>
        </div>

      </div>
    </div>
  )
}
