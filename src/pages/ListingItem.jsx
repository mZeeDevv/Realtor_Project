import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { FaLocationDot, FaBed } from 'react-icons/fa6'
import {GiBathtub} from 'react-icons/gi'

export default function ListingItem({ lisitngs, id }) {
    
    return (
        <li 
        className='bg-white flex flex-col justify-between shadow-md hover:shadow-xl rounded-md overflow-hidden
         transition-shadow duration-150 relative m-[10px]'
        >
            <Link 
            className='content'
            to={`/category/${lisitngs.type}/${id}`}>
                <img 
                alt='imgListing'
                className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in-out'
                loading='lazy'
                src={lisitngs.imgUrl[0]} />
                <Moment 
                fromNow 
                className='uppercase absolute top-2 left-2 bg-[#3377CC] text-sm font-semibold text-white rounded px-2 py-1 shadow-lg'>{lisitngs.time.toDate()}</Moment>
                <div className='w-full p-[10px]'>
                    <div className='flex items-center space-x-1'>
                        <FaLocationDot 
                        className='text-[#3377CC] h-4 w-4'
                        />
                        <p className='text-sm font-semibold mb-[2px] text-gray-500 truncate'>{lisitngs.Address}</p>
                    </div>
                    <p
                    className='font-semibold text-xl truncate'
                    >{lisitngs.name}</p>
                    <p
                    className='text-[#457b9d] font-semibold my-2'
                    >${lisitngs.offer ?
                        lisitngs.discount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : lisitngs.regular
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                        {lisitngs.type === "rent" && "/ month"}
                    </p>
                    <div className='flex space-x-3'>
                        <div className='flex items-center text-md space-x-1'>
                            <p>{lisitngs.bedrooms}</p>
                            <FaBed></FaBed>
                        </div>
                        <div className='flex items-center text-md space-x-1'>
                             <p>{lisitngs.bathrooms}</p>
                             <GiBathtub/>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}
