import { doc, getDoc, } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner'
import { db } from '../firebase'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import "swiper/css/bundle"
import { FaLocationDot, FaBed } from 'react-icons/fa6'
import { GiBathtub } from 'react-icons/gi'
export default function Listing() {
    const prams = useParams()
    const [listing, setlistings] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        async function fetchListings() {
            const docRef = doc(db, "listings", prams.listingId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setlistings(docSnap.data())
                setloading(false)
                console.log(docSnap.data())
            }
        }
        fetchListings()
    }, );
    if (loading) {
        return <Spinner />
    }
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                slidesPerView={1}
                navigation
                Autoplay={{ delay: 1 }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {listing.imgUrl.map((url, index) => (
                    <SwiperSlide
                        key={index}>
                        <div className='w-full overflow-hidden h-[300px]' style={{ background: `url(${listing.imgUrl[index]}) center no-repeat` }}>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='max-w-3xl mx-auto m-4 p-6 bg-white mb-44'>
                <p className='font-bold text-blue-900 text-3xl'>
                    {listing.name} - ${!listing.offer ? listing.regular
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : listing.discount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    {listing.type === "rent" ? "/ month" : " "}
                </p>
                <p className='flex items-center text-xl my-3'>
                    <FaLocationDot />
                    {listing.Address}
                </p>
                <div className='flex space-x-4 my-3'>
                <p className='uppercase bg-red-500 w-40 rounded text-center font-semibold text-white py-2'>
                    for {listing.type === "rent" ? "Rent" : "Sale"}
                </p>
                <p className='uppercase bg-green-500 w-48 rounded text-center font-semibold text-white py-2'>
                    {listing.offer ? `After Discount $${listing.discount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }    
                    ` : "No Discount"}
                </p>
                </div>
                <p className="text-lg">
                    <span className='font-bold'>Description - </span>
                    {listing.Description}
                </p>

                <div className='flex md:space-x-3 font-semibold my-3 md:text-xl text-md flex-wrap '>
                   
                    <div className='flex items-center text space-x-1'>
                        <FaBed></FaBed>
                        <p>{listing.bedrooms}</p>
                        <p> Bedroom</p>
                    </div>
                    <div className='flex items-center text space-x-1'>
                    ・
                        <GiBathtub />
                        <p>{listing.bathrooms}</p>
                        <p> Bathroom</p>
                    </div>
                    
                    <div className='flex items-center text-md md:space-x-3 font-semibold space-x-1'>
                        <p>・{listing.Parking ? "Parking Available" : "Parking not Available"}</p>
                        <p className="">・{listing.furnished ? "Furnished" : "Not Furnished"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

