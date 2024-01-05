import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/home"
import Profile from "./pages/profile"
import SignIn from "./pages/signin.jsx"
import ForgotPassword from "./pages/forgotpassword"
import Offers from "./pages/offers"
import Header from './components/Header';
import Listing from './pages/Listing';
import SignUp from './pages/Signup';
import Category from './pages/Category.jsx'
import Createlisting from './pages/createlisting.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';

function App(){
  return(
     <>
<Router>
   <Header/>
  <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path="/profile" element={<PrivateRoute/>}>
   <Route path='/profile' element={<Profile/>}/>
   </Route>
   <Route path='/sign-in' element={<SignIn/>}/>
   <Route path='/reset-pass' element={<ForgotPassword/>}/>
   <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
   <Route path='/category/:categoryName' element={<Category/>}/>
   <Route path='/offers' element={<Offers/>}/>
   <Route path='/Sign-up' element={<SignUp/>}/>
   <Route path="/create-listing" element={<PrivateRoute/>}>
   <Route path='/create-listing' element={<Createlisting/>}/>
   </Route>
  </Routes>
</Router>
<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  )
}
export default App;
