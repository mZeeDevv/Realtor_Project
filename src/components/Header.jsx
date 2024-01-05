import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const [pageState, setPageState] = useState("Sign in")
    const auth = getAuth();
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setPageState("Profile")
        }
        else {
          setPageState("Sign In")
        }
      })
    })
 function router(route){
    if(route === location.pathname){
        return true;
    }
 }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
<header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
   <div>
    <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className='h-5 cursor-pointer
    'onClick={()=> navigate("/")}/>
   </div>
   <div>
    <ul className='flex space-x-6'>
         <li className={`text-sm py-3 font-semibold border-b-[3px] border-transparent cursor-pointer
         ${router("/") && "text-black border-b-red-600"}`}
         onClick={()=>navigate("/")}>Home</li>
        <li className={`text-sm py-3 font-semibold border-b-[3px] border-transparent cursor-pointer
         ${router("/offers") && "text-black border-b-red-600"}`}
         onClick={()=>navigate("/offers")}>Offers</li>
        <li className={`text-sm py-3 font-semibold border-b-[3px] border-transparent cursor-pointer
           ${(router("/sign-in") || router("/profile")) && "text-black border-b-red-600"}`}
         onClick={()=>navigate("/profile")}>
          {pageState}
          </li>  
    </ul>
   </div>
</header>
    </div>  
  )
}
