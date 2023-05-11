import { getAuth } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
  return (
  <>
  <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
    <h1
    className="text-xl mt-6 font-bold"
    >My Profile</h1>
    <div
    className="w-full md:w-[50%] mt-6 px-3">
      <form>
        <input type="text" id="name" value={name} disabled
        className="w-full px-4 py-2 text-xl text-gray-400 bg-white border
         border-gray-300 rounded transition ease-in-out">
         </input>
         <input type="email" id="name" value={email} disabled
        className="w-full px-4 py-2 text-xl text-gray-400 mt-5 bg-white border
         border-gray-300 rounded transition ease-in-out">
         </input>

         <div className="flex justify-between whitespace-nowrap mt-4">
         <p className="flex items-center">Do you want to change your name?
          <span
          className="mx-1 text-red-600 hover:text-red-800 transition ease-in-out duration-200
          cursor-pointer">
            Edit</span>
         </p>
         <p onClick={logOut}
         className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
         >Sign Out</p>
         </div>
      </form>
    </div>
  </section>
  </>
  )
}
