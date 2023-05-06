import {useLocation, useNavigate} from "react-router-dom"

export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
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
    ' onClick={()=> navigate("/")}/>
   </div>
   <div>
    <ul className='flex space-x-6'>

        <li className={`text-sm text-gray-400 py-3 border-b-transparent border-b-[3px]
         ${router("/") && "text-black border-b-red-600"}`}
         onClick={()=> navigate("/")}>Home</li>
        <li className={`text-sm text-gray-400 py-3 border-b-transparent border-b-[3px]
         ${router("/offers") && "text-black border-b-red-600"}`}
         onClick={()=> navigate("/offers")}>Offers</li>
        <li className={`text-sm text-gray-400 py-3 border-b-transparent border-b-[3px]
         ${router("/sign-in") && "text-black border-b-red-600"}`}
         onClick={()=> navigate("/sign-in")}>Sign-in</li>
    </ul>
   </div>
</header>
    </div>
  )
}
