import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home"
import Profile from "./pages/profile"
import SignIn from "./pages/signin"
import ForgotPassword from "./pages/forgotpassword"
import Offers from "./pages/offers"
import Header from './components/Header';

function App(){
  return(
     <>
<Router>
   <Header/>
  <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/profile' element={<Profile/>}/>
   <Route path='/sign-in' element={<SignIn/>}/>
   <Route path='/forgot-pass' element={<ForgotPassword/>}/>
   <Route path='/offers' element={<Offers/>}/>
  </Routes>
</Router>
    </>
  )
}
export default App;
