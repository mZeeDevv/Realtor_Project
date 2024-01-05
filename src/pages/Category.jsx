import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "./ListingItem";
import { useParams } from "react-router";


export default function Category() {
  const prams = useParams()
  const [loading, setloading] = useState(true);
  const [listings, setlistings] = useState([])

  useEffect(() =>{
    async function fetchdata() {
try {
  const docRef = collection(db, "listings")
  const q = query(docRef, where("type", "==", prams.categoryName), orderBy("time", "desc"), limit(30))
  const querySnap = await getDocs(q)
  const listing = []
  querySnap.forEach((doc) => {
    return listing.push({
      id: doc.id,
      data: doc.data(),
    })
  })
  setlistings(listing)
  setloading(false)
} catch (error) {
  console.log(error)
}
    }
    fetchdata()
  }, )
 
  return (
    <div className="max-w-6xl mx-auto px-3">
<h1 className="text-3xl text-center mt-6 font-bold">
    {prams.categoryName === "rent" ? "Places for rent" : "Places for sale"}
    </h1>
{loading ? (
  <Spinner/>
): listings && listings.length > 0 ? (
<>
<main>
  <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   {listings.map((listing) => (
    <ListingItem
    key={listing.id}
    id={listing.id}
    lisitngs={listing.data}
    />
   ))}
  </ul>
  </main>
</>
): (
  <p>No Current Offers</p>
)}

    </div>
  )
}

