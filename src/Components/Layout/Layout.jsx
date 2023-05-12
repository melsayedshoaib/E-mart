import { Outlet, useNavigate } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import React from 'react'
import { Toaster } from 'react-hot-toast';

export default function Layout({ userData, setUserData }) {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("user-token");
    setUserData(null)
    navigate("/login");
  }
  return (
    <div>
      <Navbar logout={logout} userData={userData} />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
      <Toaster/>
    </div>
  )
}
