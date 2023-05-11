import React from 'react'
import {FcGoogle} from "react-icons/fc"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {db} from "../firebase"
import { useNavigate } from 'react-router';

export default function OAuth() {
  const Navigate = useNavigate()
 async function onGoogleClick(){
try {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(
    auth,
    provider
  )
  const user = result.user;
  const docRef = doc(db, "users", user.uid)
  const docSnap = await getDoc(docRef)
  if(!docSnap.exists()){
 await setDoc(docRef, {
  name: user.displayName,
  email: user.email,
  timestamp: serverTimestamp(),
 })
 Navigate("/")
  }
  else {
    Navigate("/")
  }
} catch (error) {
toast.error("Could not log in")
}
  }
  return (
    <button type='button'
    onClick={onGoogleClick}
    className='flex justify-center items-center w-full bg-red-700 text-white uppercase
    py-4 text-sm font-medium hover:bg-red-800 shadow-md hover:shadow-lg 
    transition duration-200 ease-in-out rounded'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/> Continue with Google
        </button>
  )
}
