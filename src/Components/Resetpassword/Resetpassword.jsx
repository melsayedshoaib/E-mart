import * as Yup from 'yup';

import { Fragment, useState } from 'react';

import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function Resetpassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function sendData(values) {
    setLoading(true);
    let response = await axios.put("https://route-ecommerce-app.vercel.app/api/v1/auth/resetPassword", values).catch((err) => {
      setLoading(false);
      setError(err.reponse.data.message);
    })
    if (response.data.token) {
      setLoading(false);
      navigate('/login');
    }
  }
  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().required("Email is required").email("Enter a valid email address"),
        newPassword: Yup.string().required('Password is required'),
      }),
    onSubmit: (values) => sendData(values)
  })
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
    <Fragment>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Resetpassword</title>
      </Helmet>
      <div className='w-75 mx-auto py-5'>
        <h2>Reset Your Password</h2>
        {error.length > 0 ? <div className='alert alert-danger'>{ error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' value={formik.values.email} className='form-control my-2' name='email' id='email'></input>
          {(formik.errors.email && formik.touched.email) && <div className='alert alert-danger'>{formik.errors.email}</div>}
          <label htmlFor="password">New Password: </label>
          <input title='waiting...' onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' value={formik.values.newPassword} className='form-control my-2' name='newPassword' id='newPassword'></input>
          {(formik.errors.newPassword && formik.touched.newPassword) && <div className='alert alert-danger'>{formik.errors.newPassword}</div>}
          <div className="d-flex align-items-center justify-content-start py-3">
            {loading ? <button title='waiting...' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' className='text-white btn bg-main my-2'>Reset Password</button>}
          </div>
        </form>
      </div>
      </Fragment>
      </div>
  )
}