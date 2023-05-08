import React from 'react'
import {FcGoogle} from "react-icons/fc"

export default function OAuth() {
  return (
    <button
    className='flex justify-center items-center w-full bg-red-700 text-white uppercase
    py-4 text-sm font-medium hover:bg-red-800 shadow-md hover:shadow-lg 
    transition duration-200 ease-in-out rounded'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/> Continue with Google
        </button>
  )
}
