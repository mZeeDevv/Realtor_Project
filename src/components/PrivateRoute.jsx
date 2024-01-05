
import React from 'react'
import { Navigate, Outlet } from 'react-router';
import {useAuthStats} from '../hooks/useAuthStats'
import Spinner from "./Spinner"
export default function PrivateRoute() {
const {loggedIn, checkingStatus} = useAuthStats();
if(checkingStatus) {
    return <Spinner />
}
return loggedIn ? <Outlet /> : <Navigate to="/sign-in"/>
}
