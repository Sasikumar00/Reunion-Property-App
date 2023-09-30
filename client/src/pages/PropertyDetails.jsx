import React, {useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import ProductPageSkeleton from '../components/ProductPageSkeleton'
import {BiBed, BiBath} from 'react-icons/bi'
import {IoPricetagOutline} from 'react-icons/io5'
import { formatDistanceToNow } from 'date-fns';

const PropertyDetails = () => {
    const [propertyDetails,setPropertyDetails] = useState({})
    const [user, setUser] = useState('')
    const [loading,setLoading] = useState(true)
    const params = useParams();
    const capitalizeText = (text)=>{
        return text.charAt(0).toUpperCase()+text.slice(1).toLowerCase()
      }
    const getPropertyData = (token)=>{
        setLoading(true)
        axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/property/${params.id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            if(res?.status===200){
                setLoading(false)
                setPropertyDetails(res.data.data)
            }
        })
    }
    useEffect(()=>{
        getPropertyData(user)
        //eslint-disable-next-line
    },[])
    useEffect(()=>{
        if(localStorage.getItem('jwt')){
            setUser(localStorage.getItem('jwt'))        }
        //eslint-disable-next-line
    }, [propertyDetails,user])
  return (
    <Layout>
        {loading?<ProductPageSkeleton/>
        :
        <div className='grid md:grid-cols-2 mt-10 p-5'>
            <div className='mx-5'>
            <img src="/test-property.jpeg" alt="Property" className='w-full rounded-md'/>
            </div>
            <div className='mt-5 md:mt-0'>
                <div>
                    <h1 className='text-4xl md:text-5xl'>{capitalizeText(propertyDetails.name)}</h1>
                    <div>
                        <p className='text-xl mt-2 text-gray-500'>{propertyDetails.location}</p>
                        <p className='text-xl mt-2'><span className='font-semibold'>City: </span>{propertyDetails.city}, Maharastra</p>
                    </div>
                    <div className='grid grid-cols-3 mt-2'>
                    <h1 className='bg-gray-100 py-5 px-2 border'><BiBed/> {propertyDetails.bedrooms} {propertyDetails.bedrooms>1?'Bedrooms':'Bedroom'}</h1>
                    <h1 className='bg-gray-100 py-5 px-2 border'><BiBath/>{propertyDetails.bathrooms} {propertyDetails.bathrooms>1?'Bathrooms':'Bathroom'}</h1>
                    <h1 className='bg-gray-100 py-5 px-2 border'><IoPricetagOutline/>{propertyDetails.dimensions} sqrft</h1>
                    </div>
                    <div className='grid grid-row-3 text-xl mt-1 gap-2'>
                    <h1><span className='font-bold'>Available from:</span> {new Date(propertyDetails.availability).toLocaleDateString()}</h1>
                    <h1><span className='font-bold'>Property Type:</span> {propertyDetails.type}</h1>
                    <h1 className='text-2xl'><span className='text-green-600'>₹ {propertyDetails.price} </span>/ month</h1>
                    </div>
                    <h1 className='text-right text-gray-400'>Last Updated: {formatDistanceToNow(new Date(propertyDetails.createdAt))}</h1>
                </div>
                <div className='border rounded-md px-3 py-1'>
                    <h1 className='text-center text-black font-bold'>CONTACT DETAILS</h1>
                    <h1><span className='font-bold mr-5'>Owner Name:</span> {propertyDetails.user.fullname}</h1>
                    <h1><span className='font-bold mr-5 justify-between'>Email:</span> {propertyDetails.user.email}</h1>
                    <h1><span className='font-bold mr-5'>Phone Number:</span> {propertyDetails.user.phone}</h1>
                </div>
            </div>
        </div>
        }
    </Layout>
  )
}

export default PropertyDetails