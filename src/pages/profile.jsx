import { getAuth, updateProfile } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { db } from "../firebase";
import { updateDoc } from "firebase/firestore";
import {FcHome} from "react-icons/fc"

export default function Profile() {
  const Navigate = useNavigate();
  const auth = getAuth()
  const [formData, setFormaData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name, email} = formData
  function logOut() {
    auth.signOut()
    Navigate("/")
  }
  const [changeDetail, setChangeDetails] = useState(false)
  function onChange(e){
    setFormaData((prevState) => ({
      ...prevState,
    [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit()
  {
   try {
    if(auth.currentUser.displayName !== name)
    {
      await updateProfile(auth.currentUser, {
        displayName : name,
      });
      //updating name in firestore  
      const docRef = db("users", auth.currentUser.uid)
      await updateDoc(docRef, {
        name,
      })
    }
    toast.success('Profile details updated')
   } catch (error) {
    toast.error("Could not update profile details")
   }
  }
  return (
  <>
  <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
    <h1
    className="text-xl mt-6 font-bold"
    >My Profile</h1>
    <div
    className="w-full md:w-[50%] mt-6 px-3">
      <form>
        <input type="text" id="name" value={name} 
        disabled={!changeDetail}
        onChange={onChange}
        className={`w-full px-4 py-2 text-xl text-gray-400 bg-white border
         border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200 font-bold"}`}>
         </input>
         <input type="email" id="name" value={email} disabled
        className="w-full px-4 py-2 text-xl text-gray-400 mt-5 bg-white border
         border-gray-300 rounded transition ease-in-out">
         </input>

         <div className="flex justify-between whitespace-nowrap mt-4">
         <p className="flex items-center">Do you want to change your name?
          <span
          onClick={() => 
            {
              changeDetail && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          className="mx-1 text-red-600 hover:text-red-800 transition ease-in-out duration-200
          cursor-pointer">
            {changeDetail ? "Apply change" : "Edit"}
            </span>
         </p>
         <p onClick={logOut}
         className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
         >Sign Out</p>
         </div>
      </form>
      <button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out
      my-2 py-3 uppercase shadow-md hover:shadow-lg"> 
      <Link to="/create-listing" className="flex justify-center ">
      <FcHome className="text-3xl rounded-full bg-red-200 p-2 mr-2"/>
      Rent or Sell a house
      </Link>
      </button>
    </div>
  </section>
  </>
  )
}
