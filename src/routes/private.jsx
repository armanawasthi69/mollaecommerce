import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Private() {
    let user = true //localStorage.getItem("user")
    return (
        <>
            {user ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}
