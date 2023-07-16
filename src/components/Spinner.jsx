import React from 'react'
import spinner from "../assests/svg/spinner.svg"
export default function Spinner() {
  return (
    <div className='flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 bg-black bg-opacity-50'>
        <div>
            <img src={spinner} alt="loading" className='h-24' />
        </div>
    </div>
  )
}
