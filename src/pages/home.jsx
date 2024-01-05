import { useEffect, useState } from "react"
import Slider from "./Slider"
import { collection,  getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

export default function Home() {
  const [offerlisting, setofferlistings] = useState([]);
  useEffect(() => {
    async function fetchListings() {
try {
  const docRef = collection(db, "listings");
  const q = query(docRef, where("offer", "==", true),
   orderBy("time", "desc"), limit(4));
   const querySnap = await getDocs(q)
  const listings = []
  querySnap.forEach((doc) => {
    return listings.push({
      id: doc.id,
      data: doc.data()
    })
  })
  setofferlistings(listings)
  // console.log(listings)
} catch (error) {
  // console.log(error)
}
    }
     fetchListings()
  },[])

  
  const [rentlisting, setrentlistings] = useState([]);
  useEffect(() => {
    async function fetchListings() {
try {
  const docRef = collection(db, "listings");
  const q = query(docRef, where("type", "==", "rent"),
   orderBy("time", "desc"), limit(4));
   const querySnap = await getDocs(q)
  const listings = []
  querySnap.forEach((doc) => {
    return listings.push({
      id: doc.id,
      data: doc.data()
    })
  })
  setrentlistings(listings)
 
} catch (error) {
  
}
    }
     fetchListings()
  },[])

  const [salelisting, setsalelistings] = useState([]);
  useEffect(() => {
    async function fetchListings() {
try {
  const docRef = collection(db, "listings");
  const q = query(docRef, where("type", "==", "sale"),
   orderBy("time", "desc"), limit(4));
   const querySnap = await getDocs(q)
  const listings = []
  querySnap.forEach((doc) => {
    return listings.push({
      id: doc.id,
      data: doc.data()
    })
  })
  setsalelistings(listings)

} catch (error) {

}
    }
     fetchListings()
  },[])

  return (
    <div>
      <Slider/>
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
      {offerlisting && offerlisting.length > 0 && (
        <div className="m-2 mb-6">
          <h2 className="px-3 text-2xl mt-6">Recent Offers</h2>
          <Link to="/offers">
          <p className="text-blue-600 hover:text-blue-800 px-3 text-sm">
            Show more offers
          </p>
          </Link>
          <ul className="sm:grid sm:grid-cols-2 lg-grid-cols-3 xl:grid-cols-4">
            {offerlisting.map((listings) => (
              <ListingItem
              key={listings.id}
              id={listings.id}
              lisitngs={listings.data}
              />
            ))}
          </ul>
          </div>
      )}
      </div>

      <div className="max-w-6xl mx-auto pt-4 space-y-6">
      {rentlisting && rentlisting.length > 0 && (
        <div className="m-2 mb-6">
          <h2 className="px-3 text-2xl mt-6">Places for Rent</h2>
          <Link to="/category/rent">
          <p className="text-blue-600 hover:text-blue-800 px-3 text-sm">
            Show more place for rent
          </p>
          </Link>
          <ul className="sm:grid sm:grid-cols-2 lg-grid-cols-3 xl:grid-cols-4">
            {rentlisting.map((listings) => (
              <ListingItem
              key={listings.id}
              id={listings.id}
              lisitngs={listings.data}
              />
            ))}
          </ul>
          </div>
      )}
      </div>


      <div className="max-w-6xl mx-auto pt-4 space-y-6">
      {salelisting && salelisting.length > 0 && (
        <div className="m-2 mb-6">
          <h2 className="px-3 text-2xl mt-6">Places for Sale</h2>
          <Link to="/category/sale">
          <p className="text-blue-600 hover:text-blue-800 px-3 text-sm">
            Show more place for sale
          </p>
          </Link>
          <ul className="sm:grid sm:grid-cols-2 lg-grid-cols-3 xl:grid-cols-4">
            {salelisting.map((listings) => (
              <ListingItem
              key={listings.id}
              id={listings.id}
              lisitngs={listings.data}
              />
            ))}
          </ul>
          </div>
      )}
      </div>
    </div>
  )
}
