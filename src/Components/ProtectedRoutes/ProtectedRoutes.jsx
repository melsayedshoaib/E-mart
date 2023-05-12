import { Navigate } from 'react-router-dom'
import React from 'react'

export default function ProtectedRoutes({children}) {
  if (localStorage.getItem("user-token") === null) {
    return <Navigate to={"/login"}/>
  } else {
    return children
  }
}
