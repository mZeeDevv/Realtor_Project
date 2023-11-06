import { doc, getDoc, } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner'
import { db } from '../firebase'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import "swiper/css/bundle"

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
    }, [prams.ListingId]);
    if (loading) {
        return <Spinner />
    }
    return (
        <div>
            <Swiper
                 modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                 slidesPerView={1}
                 navigation
                 Autoplay={{delay: 1}}
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
            {listing.name}
        </div>
    )
}
