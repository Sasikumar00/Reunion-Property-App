import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axiosInstance from '../utils/axiosInstance'
import SkeletonLoader from '../components/SkeletonLoader'
import {MdOutlineDeleteForever, MdOutlineModeEditOutline} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import '../mylisting.css'
import {BiBed, BiBath} from 'react-icons/bi'
import {IoPricetagOutline} from 'react-icons/io5'
import { formatDistanceToNow } from 'date-fns';

const MyListingPage = () => {
    const [myListings, setMyListings] = useState([])
    const [user,setUser] = useState('')
    const [loading, setLoading] = useState(true)
    const navigator = useNavigate()

    const handleHover = (pid)=>{
        document.getElementById(pid).classList.toggle('open')
    }

    const getMyListings = (token) => {
        setLoading(true)
        axiosInstance.get(`http://localhost:8000/api/property`, {
            headers: {
            Authorization: `Bearer ${token}`
        }}).then(
          res=>{
            if(res?.data?.properties){
              setMyListings(res.data.properties)
            }
            setLoading(false)
          }
        )
      }

    const editListing = (pid)=>{
        navigator(`/my-listings/${pid}`)
    }

    const deleteListing = async(pid)=>{
        try{
            axiosInstance.delete(`http://localhost:8000/api/property/${pid}`, {
                headers:{
                    Authorization: `Bearer ${user}`
                }
            }).then(res=>{
                if(res?.data?.message){
                    alert(res.data.message)
                    window.location.reload()
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const capitalizeText = (text)=>{
        return text.charAt(0).toUpperCase()+text.slice(1).toLowerCase()
      }

    useEffect(()=>{
        if(localStorage.getItem('jwt')){
            setUser(localStorage.getItem('jwt'))
        }
    }, [])
    useEffect(()=>{
        if(user.length>10)
            getMyListings(user);
    },[user])
  return (
    <Layout>
    <h1 className='text-gray-800 text-5xl font-semibold text-center mt-5'>My Listings</h1>
    {loading ? <SkeletonLoader/> : (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 min-h-[80vh]'>
        {myListings.length>=1 ? myListings.map(property=>{
            const createdAt = new Date(property.createdAt);
            return(
              <div key={property._id} className="card border-2 rounded-md">
                <div className='relative' onMouseEnter={()=>handleHover(property._id)} onMouseLeave={()=>handleHover(property._id)}>
                    <div id={property._id} className='absolute bg-black bg-opacity-60 w-full h-full flex items-center justify-center gap-6 opacity-0 transition-all ease-in-out duration-300'>
                        <div className='flex items-center text-2xl hover:bg-gray-500 hover:text-black text-white border-2 border-white rounded-md px-2 py-1 cursor-pointer' onClick={()=>editListing(property._id)}><MdOutlineModeEditOutline/>Edit</div>
                        <div className='flex items-center text-2xl hover:bg-red-500 hover:text-black text-white border-2 border-white rounded-md px-2 py-1 cursor-pointer' onClick={()=>deleteListing(property._id)}><MdOutlineDeleteForever/>Delete</div>
                    </div>
                    <img src="/test-property.jpeg" alt="Property" className='rounded-md'/>
                </div>
                <div className='px-2 my-3'>
                    <div className='grid md:grid-cols-2 justify-between'>
                    <h1 className='text-xl'>₹ {property.price} / month</h1>
                    <h1 className='text-sm flex md:justify-end'><span className='mr-2'>Updated:</span>{formatDistanceToNow(createdAt)}</h1>
                    </div>
                    <h1 className='text-3xl'>{capitalizeText(property.name)}</h1>
                    <h1 className='text-gray-400'>{property.city}, Maharashtra</h1>
                </div>
                <div className='grid grid-cols-3'>
                <div  className='bg-gray-100 py-5 px-2 border'><h1><BiBed/> {property.bedrooms} {property.bedrooms>1?'Bedrooms':'Bedroom'}</h1></div>
                <div className='bg-gray-100 py-5 px-2 border'><h1><BiBath/> {property.bathrooms} {property.bathrooms>1?'Bathrooms':'Bathroom'}</h1></div>
                <div  className='bg-gray-100 py-5 px-2 border'><h1><IoPricetagOutline/> {property.dimensions} sqft</h1></div>
                </div>
                <button onClick={()=>{navigator(`/property/${property._id}`)}} className='bg-[#03C988] hover:bg-[#02B47A] transition-all ease-in-out duration-300 w-full py-2 text-xl text-white'>View Property</button>
            </div>
            )})
            :
            <h1 className='text-center text-xl my-auto col-span-3'>No properties found</h1>
            }
        </div>
        )}
    </Layout>
  )
}

export default MyListingPage