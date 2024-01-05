    import React, { useState } from 'react'
    import Spinner from '../components/Spinner';
    import { toast } from 'react-toastify';
    import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
    import { getAuth } from 'firebase/auth'
import { collection, serverTimestamp, addDoc, } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

    export default function Createlisting() {
        const navigate = useNavigate();
        const auth = getAuth();
        const [loading, setLoading] = useState(false)
        const [FormData, setFormaData] = useState({
            type: "sale",
            name: "",
            bedrooms: 1,
            bathrooms: 1,
            Parking: false,
            furnished: false,
            Address: "",
            Description: "",
            offer: true,
            regular: 0,
            discount: 0,
            images: {}
        })
        const { type,
            name,
            bedrooms,
            bathrooms,
            Parking,
            furnished,
            Address,
            Description,
            offer,
            regular,
            discount,
            images,
        } = FormData;
        function onChange(e) {
            let boolean = null;
            if (e.target.value === "true") {
                boolean = true;
            }
            if (e.target.value === "false") {
                boolean = false;
            }
            if (e.target.files) {
                setFormaData((prevState) => ({
                    ...prevState,
                    images: e.target.files,
                }));
            }
            if (!e.target.files) {
                setFormaData((prevState) => ({
                    ...prevState,
                    [e.target.id]: boolean ?? e.target.value,
                }));
            }
        }
        async function onSubmit(e) {
            e.preventDefault();
            setLoading(true);
            if (regular <= discount) {
                setLoading(false)
                toast.error("Discounted price should be less than regular price!")
                return;
            }
            if (images.length > 6) {
                setLoading(false)
                toast.error("Images Length should be less than 6")
                return;
            }
            async function storageImage(image) {
                return new Promise((resolve, rejected) => {
                    const storage = getStorage();
                    const filename = `${auth.currentUser.uid}-${image}-${Math.floor(Math.random() * 100)}`
                    const storageRef = ref(storage, filename);
                    const uploadTask = uploadBytesResumable(storageRef, image);
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        },
                        (error) => {
                            rejected(error)
                        },
                        () => {
                            
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL);
                            });
                        }
                    );
                })
            }
            const imgUrl = await Promise.all(
                [...images]
                .map((image) => storageImage(image)))
                .catch((error) => {
                    setLoading(false);
                    toast.error("Images not Uploaded")
                    return
                })
            const formDataCopy = {
                ...FormData,
                images,
                time : serverTimestamp(),
                imgUrl,
                userRef: auth.currentUser.uid,
            }
            delete formDataCopy.images;
            !formDataCopy.offer && delete formDataCopy.discount;

            const docRef = await addDoc(collection(db, "listings"), formDataCopy);
            setLoading(false)
            toast.success("Listing Added to your account");
            navigate(`/category/${formDataCopy.type}/${docRef.id}`)
        }
        if (loading) {
            return <Spinner />
        }
        return (
            <main className='max-w-md px-2 mx-auto'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    Create a Listing
                </h1>
                <form>
                    <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
                    <div className='flex'>
                        <button
                            type='button'
                            onClick={onChange}
                            value="sale"
                            id='type'
                            className={`px-7 py-3 font-medium
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full
                        ${type === "sale" ? "bg-slate-600 text-white" : "bg-white"
                                }`}>
                            SELL</button>

                        <button
                            type='button'
                            onClick={onChange}
                            value="rent"
                            id='type'
                            className={`px-7 py-3 font-medium ml-2
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full ${type === "rent" ? "bg-slate-600 text-white" : "bg-white"
                                }`}>RENT</button>
                    </div>
                    <p className='font-semibold'>Name</p>
                    <input
                        type='text'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={onChange}
                        maxLength="32"
                        minLength="5"
                        required
                        className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded active:border-slate-600'
                    />
                    <div className='flex space-x-6 justify-start'>
                        <div>
                            <p className='font-semibold'>Beds</p>
                            <input
                                type="number"
                                id='bedrooms'
                                value={bedrooms}
                                required
                                min="1"
                                onChange={onChange}
                                className='w-full text-xl text-gray-700 bg-white px-3 py-1'
                            />
                        </div>
                        <div>
                            <p className='font-semibold'>Bathrooms</p>
                            <input
                                type="number"
                                id='bathrooms'
                                value={bathrooms}
                                required
                                min="1"
                                onChange={onChange}
                                className=' w-full text-xl text-gray-700 bg-white px-3 py-1'
                            />
                        </div>
                    </div>
                    <p className='text-lg mt-6 font-semibold'>Parking Spot</p>
                    <div className='flex mb-6'>
                        <button
                            type='button'
                            onClick={onChange}
                            value={true}
                            id='Parking'
                            className={`px-7 py-3 font-medium
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full ${Parking ? "bg-slate-600 text-white" : "bg-white"
                                }`}
                        >
                            YES
                        </button>

                        <button type='button' onClick={onChange} className={`px-7 py-3 font-medium ml-2
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full ${!Parking ? "bg-slate-600 text-white" : "bg-white"
                            }`}
                            value={false}
                            id='Parking'
                        >NO</button>
                    </div>
                    <p className='text-lg mt-6 font-semibold'>Furnished</p>
                    <div className='flex mb-6'>
                        <button type='button' onClick={onChange} className={`px-7 py-3 font-medium
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full ${furnished ? "bg-slate-600 text-white" : "bg-white"
                            }`}
                            value={true}
                            id='furnished'>
                            YES
                        </button>

                        <button type='button' onClick={onChange} className={`px-7 py-3 font-medium ml-2
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full ${!furnished ? "bg-slate-600 text-white" : "bg-white"
                            }`}
                            value={false}
                            id='furnished'>
                            NO
                        </button>
                    </div>
                    <p className='font-semibold'>Address</p>
                    <textarea
                        type='text'
                        placeholder='Address'
                        id='Address'
                        value={Address}
                        onChange={onChange}
                        required
                        className='w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded active:border-slate-600 mb-6'
                    />
                    <p className='font-semibold'>Description</p>
                    <textarea
                        type='text'
                        placeholder='Description'
                        id='Description'
                        value={Description}
                        onChange={onChange}
                        required
                        className='w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded active:border-slate-600'
                    />
                    <p className='text-lg mt-6 font-semibold'>Offer</p>
                    <div className='flex mb-6'>
                        <button type='button' onClick={onChange} className={`px-7 py-3 font-medium
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full ${offer ? "bg-slate-600 text-white" : "bg-white"
                            }`}
                            value={true}
                            id='offer'
                        >YES</button>

                        <button type='button' onClick={onChange} className={`px-7 py-3 font-medium ml-2
                        text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150
                        ease-in-out w-full ${!offer ? "bg-slate-600 text-white" : "bg-white"
                            }`}
                            value={false}
                            id='offer'>
                            NO
                        </button>
                    </div>
                    <div className='flex items-center mb-8'>
                        <div className=''>
                            <p className='mb-1 font-semibold'>Regular Price</p>
                            <div className='flex w-full justify-center items-center space-x-6'>
                                <input
                                    type='number'
                                    id="regular"
                                    value={regular}
                                    onChange={onChange}
                                    min="50"
                                    max="4000000"
                                    required
                                    className='text-center w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded active:border-slate-600'
                                />
                            </div>
                        </div>
                        {type === "rent" && (
                            <div className='flex w-full items-center justify-center'>
                                <p className='text-md '>$/Month</p>
                            </div>
                        )}
                    </div>
                    {offer && (
                        <div className='mb-6'>
                            <p className='mb-1 font-semibold'>Discounted Price</p>
                            <input
                                type='number'
                                id="discount"
                                value={discount}
                                onChange={onChange}
                                min="20"
                                max="3900000"
                                required={offer}
                                className='text-center px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded active:border-slate-600'
                            />
                        </div>
                    )}
                    <div className='mb-6'>
                        <p className='font-semibold'>Images</p>
                        <p className='text-gray-500'>The first image will be the cover (max 6)</p>
                        <input
                            type='file'
                            id='images'
                            accept='.jpg,.png,.jpeg'
                            onChange={onChange}
                            multiple
                            required
                            className='w-full bg-white py-1.5 text-gray-500 border border-gray-300 rounded transition duration-150 ease-in-out px-3'
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={onSubmit}
                        className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out
                    my-2 py-3 uppercase shadow-md hover:shadow-lg font-semibold mb-6">
                        Add Listing
                    </button>
                </form>
            </main>
        )
    }



