
import React from 'react'
import { Navigate, Outlet } from 'react-router';
import {loggedIn, checkingStatus, useAuthStats} from '../hooks/useAuthStats'
export default function PrivateRoute() {
const {loggedIn, checkingStatus} = useAuthStats();
if(checkingStatus) {
    return <h3>LOADING.....</h3>
}
return loggedIn ? <Outlet /> : <Navigate to="/sign-in"/>
}
