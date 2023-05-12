import { Link } from 'react-router-dom';
import React from 'react'
import logo from '../../assets/imgs/logoemart.png'
import { useSelector } from 'react-redux';

export default function Navbar({ userData, logout }) {
  let { quantity } = useSelector((state) => state.cartSlice);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to={"home"}> <span>E-mart</span> <img src={logo} alt="logo" className='w-25' /></Link>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null &&  <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"home"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"products"}>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link position-relative" to={"cart"}><i className="fa-solid fa-cart-shopping"></i><span class="badge text-bg-primary position-absolute top-0">{ quantity}</span></Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link ms-lg-4' to={"allorders"}>Purchased Orders</Link>
              </li>
            </ul>}
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-tiktok'></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-linkedin'></i>
                <i className='fab mx-2 fa-youtube'></i>
              </li>
              {userData === null ? <>
                <li className="nav-item">
                <Link className="nav-link" to={"login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"register"}>Register</Link>
              </li>
              </> : <li className="nav-item">
                <Link className="nav-link" to={''} onClick={logout}>Logout</Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
