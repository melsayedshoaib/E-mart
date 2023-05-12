import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Allorders from './Components/Allorders/Allorders'
import Cart from './Components/Cart/Cart'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Notfound from './Components/Notfound/Notfound'
import Payment from './Components/Payment/Payment'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Products from './Components/Products/Products'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { Provider } from 'react-redux'
import Register from './Components/Register/Register'
import ResetPassword from './Components/Resetpassword/Resetpassword'
import jwtDecode from 'jwt-decode'
import store from './Store/store'

export default function App() {
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem("user-token");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem("user-token") !== null) {
      saveUserData();
    }
  },[])

  const routers = createBrowserRouter([
    {
      path: '', element: <Layout setUserData={setUserData} userData={userData} />, children: [
        { path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: '', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        {path: 'details/:id/', element: <ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
        {path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        {path: 'payment', element: <ProtectedRoutes><Payment /></ProtectedRoutes> },
        {path: 'allorders', element: <ProtectedRoutes><Allorders userData={userData} /></ProtectedRoutes> },
        {path: 'login', element: <Login saveUserData={saveUserData}/>},
        { path: 'register', element: <Register /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        {path: '*', element: <Notfound/>},
    ]}
  ])
  return (
    <Provider store={store}>
      <RouterProvider router={routers}/>
    </Provider>
  )
}
