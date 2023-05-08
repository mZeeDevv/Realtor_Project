import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home"
import Profile from "./pages/profile"
import SignIn from "./pages/Signin"
import ForgotPassword from "./pages/Forgotpassword"
import Offers from "./pages/offers"
import Header from './components/Header';
import SignUp from './pages/Signup';

function App(){
  return(
     <>
<Router>
   <Header/>
  <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/profile' element={<Profile/>}/>
   <Route path='/sign-in' element={<SignIn/>}/>
   <Route path='/reset-pass' element={<ForgotPassword/>}/>
   <Route path='/offers' element={<Offers/>}/>
   <Route path='/Sign-up' element={<SignUp/>}/>
  </Routes>
</Router>
    </>
  )
}
export default App;
