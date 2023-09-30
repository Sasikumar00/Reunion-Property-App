import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axiosInstance from '../utils/axiosInstance'
import SkeletonLoader from '../components/SkeletonLoader'
import { useNavigate } from 'react-router-dom'
import {BiBed, BiBath} from 'react-icons/bi'
import {IoPricetagOutline} from 'react-icons/io5'
import { formatDistanceToNow } from 'date-fns';
import HeroContent from '../components/HeroContent'
import FilterComponent from '../components/FilterComponent'
import {CiFilter} from 'react-icons/ci'

const Homepage = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterPropertyData, setFilterPropertyData]=useState({'city':'','price':500,'availability':'','type':''})
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const navigator = useNavigate()
  const capitalizeText = (text)=>{
    return text.charAt(0).toUpperCase()+text.slice(1).toLowerCase()
  }
  const ToPropertyPage = (pid)=>{
    navigator(`property/${pid}`)
  }
  const getAllListings = ()=>{
    setLoading(true)
    axiosInstance.get(`http://localhost:8000/api/list-properties`).then(
      res=>{
        if(res?.data?.properties){
          setListings(res.data.properties)
        }
        if(res?.data?.message){
          alert(res.data.message)
        }
        setLoading(false)
      }
    )
  }
  useEffect(()=>{
    if(listings.length<1){
      getAllListings();
    }
    //eslint-disable-next-line
  }, [])

  useEffect(()=>{
    if(filterPropertyData.message){
      setListings([])
    }
    if(filterPropertyData.length>=1){
      setListings(filterPropertyData)
    }
  },[filterPropertyData])
  return (
    <Layout>
      <div className='min-h-[150vh] border'>
      <HeroContent/>
      <div className='bg-[#FCA311] text-white rounded-full w-[3.3rem] py-2 flex items-center justify-center m-5 cursor-pointer' onClick={()=>setIsFilterOpen(!isFilterOpen)}>
        <CiFilter className='text-4xl text-white'/>
      </div>
      <FilterComponent setIsLoading={setLoading} listingData={listings} setListingData={setListings} isFilterOpen={isFilterOpen} propertyData={filterPropertyData} setPropertyData={setFilterPropertyData}/>
      {loading ? <SkeletonLoader/> : (
        listings.length>=1 ? 
        <>
        <div className='grid-cols-1 md:grid-cols-2 card-wrapper p-10 grid lg:grid-cols-3 gap-4'>
          {listings.map(property=>{
          const createdAt = new Date(property.createdAt);
          return(
            <div key={property._id} className="card border-2 rounded-md">
              <img src="/test-property.jpeg" alt="Property" className='cursor-pointer rounded-md w-full' onClick={()=>navigator(`/property/${property._id}`)}/>
              <div className='px-2 my-3'>
                <div className='grid md:grid-cols-2 justify-between items-center'>
                  <h1 className='md:text-xl'>₹ {property?.price} / month</h1>
                  <h1 className='text-sm flex justify-end'><span className='mr-2'>Updated:</span>{formatDistanceToNow(createdAt)}</h1>
                </div>
                <h1 className='text-3xl'>{capitalizeText(property.name)}</h1>
                <h1 className='text-gray-400'>{property.city}, Maharastra</h1>
              </div>
              <div className='grid grid-cols-3 text-sm md:text-base'>
              <div  className='bg-gray-100 py-5 px-2 border'><h1><BiBed/> {property.bedrooms} {property.bedrooms>1?'Bedrooms':'Bedroom'}</h1></div>
              <div className='bg-gray-100 py-5 px-2 border'><h1><BiBath/> {property.bathrooms} {property.bathrooms>1?'Bathrooms':'Bathroom'}</h1></div>
              <div  className='bg-gray-100 py-5 px-2 border'><h1><IoPricetagOutline/> {property.dimensions} sqft</h1></div>
              </div>
              <button onClick={()=>{ToPropertyPage(property._id)}} className='bg-[#03C988] hover:bg-[#02B47A] transition-all ease-in-out duration-300 w-full py-2 text-xl text-white'>View Property</button>
            </div>
          )})}
        </div>
        </>
        :
        <div className='w-full h-[20rem] flex items-center justify-center'>
         <h1>No properties found</h1>
        </div>
        )}
    </div>
    </Layout>
  )
}

export default Homepage