import { getAuth, updateProfile } from "firebase/auth"
import { useEffect, useState, } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import {FcHome} from "react-icons/fc"
import ListingItem from "./ListingItem";
import Spinner from "../components/Spinner";

export default function Profile() {
  const Navigate = useNavigate();
  const [listings, setlistings] = useState(null)
  const [loading, setloading] = useState(true)
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

  useEffect(() => {
async function getListingUser() {
  setloading(true);
const listingRef = collection(db, "listings");
const q = query(
listingRef,
where("userRef", "==", auth.currentUser.uid),
orderBy("time", "desc"))
const querySnap = await getDocs(q);
let listings = [ ];
querySnap.forEach((doc) => {
  return listings.push({
    id: doc.id,
    data: doc.data(),
  })
})
setlistings(listings);
setloading(false)
}
getListingUser()
  }, [auth.currentUser.uid])
  if(loading) {
    return <Spinner/>
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
  <div className="max-w-6xl px-3 mt-6 mx-auto">
    {!loading && listings.length > 0 && (
      <>
      <h2 className="text-center font-semibold text-2xl mb-6">My Listing</h2> 
      <ul
      className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mt-6 mb-6"
      >
      {listings.map((listing) => (
      <ListingItem
      key={listing.id}
      id={listing.id}
      lisitngs={listing.data}
      />

      ))}
      </ul>
      </>
    )}
  </div>
  </>
  )
}
