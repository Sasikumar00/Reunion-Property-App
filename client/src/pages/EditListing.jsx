import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axiosInstance from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import FormSkeleton from '../components/FormSkeleton'
import CitiesDropDown from '../components/CitiesDropDown'

const EditListing = () => {
    const [propertyDetails,setPropertyDetails] = useState({'name':'','location':'','price':'','availability':'','type':'','bedrooms':'','bathrooms':'','dimensions':''})
    const [user, setUser] = useState('')
    const [loading,setLoading] = useState(true)
    const params = useParams()
    const handleUpdate = (e,token)=>{
        e.preventDefault();
        if(propertyDetails.price<=0 || propertyDetails.bedrooms<=0 || propertyDetails.bathrooms<=0 || propertyDetails.dimensions<=0){
            return alert("Enter valid property details")
        }
        let availabilityInMilli = new Date(propertyDetails.availability).getTime()
        if(availabilityInMilli<Date.now()){
            return alert('Availability date cannot be in the past')
        }
        axiosInstance.patch(`${process.env.REACT_APP_API_URL}/api/property/${params.id}`,propertyDetails,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            if(res?.status===200){
                alert(res?.data?.message)
                window.location.replace('/my-listings')
            }
            else{
                alert(res?.data?.message)
            }
        })
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
        <h1 className='text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-800 text-center my-5'>Update Property Details</h1>
        <div className='flex items-center justify-center'>
        {loading?<FormSkeleton/>:
        <form onSubmit={(e)=>handleUpdate(e,user)} method='post' className='flex flex-col border px-5 py-3 rounded-md'>
                {/* <input type="file" /> */}
                <label className='input-label'>
                    Property nameails
                    <input className='input-box' type="text" value={propertyDetails.name} name='name' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, name: e.target.value})
                        }
                        } 
                    required />
                </label>
                <label className='input-label'>
                    Rent price
                    <input className='input-box' type="number" value={propertyDetails.price} name='price' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, price: e.target.value})
                        }
                        }  required />
                </label>
                <label className='input-label'>
                    Address
                    <input className='input-box' type="text" value={propertyDetails.location} name='location' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, location: e.target.value})
                        }
                        }  required />
                </label>
                <label className='input-label'>
                    City
                    <CitiesDropDown propertyData={propertyDetails} setPropertyData={setPropertyDetails} class="input-box"/>
                </label>
                <label className='input-label'>
                    Property Type
                    <select
                        className='input-box'
                        name='type'
                        value={propertyDetails.type}
                        onChange={(e) => {
                        setPropertyDetails({ ...propertyDetails, type: e.target.value });
                        }}
                        required
                    >
                        <option value='' disabled>
                        Select Property Type
                        </option>
                        <option value='Apartment'>Apartment</option>
                        <option value='House'>House</option>
                        <option value='PG'>PG</option>
                        {/* Add more property types as needed */}
                    </select>
                    </label>
                    <label className='input-label'>
                        Number of Bedrooms
                        <select
                            className='input-box'
                            name='bedrooms'
                            value={propertyDetails.bedrooms}
                            onChange={(e) => {
                            setPropertyDetails({ ...propertyDetails, bedrooms: parseInt(e.target.value) });
                            }}
                            required
                        >
                            <option value='' disabled>
                            Select Number of Bedrooms
                            </option>
                            <option value='1'>1 Bedroom</option>
                            <option value='2'>2 Bedrooms</option>
                            <option value='3'>3 Bedrooms</option>
                            <option value='4'>4 Bedrooms</option>
                            {/* Add more options as needed */}
                        </select>
                        </label>
                        <label className='input-label'>
                            Number of Bathrooms
                            <select
                                className='input-box'
                                name='bathrooms'
                                value={propertyDetails.bathrooms}
                                onChange={(e) => {
                                setPropertyDetails({ ...propertyDetails, bathrooms: parseInt(e.target.value) });
                                }}
                                required
                            >
                                <option value='' disabled>
                                Select Number of Bathrooms
                                </option>
                                <option value='1'>1 Bathroom</option>
                                <option value='2'>2 Bathrooms</option>
                                <option value='3'>3 Bathrooms</option>
                                <option value='4'>4 Bathrooms</option>
                                {/* Add more options as needed */}
                            </select>
                            </label>
                <label className='input-label'>
                    Property Size
                    <input className='input-box' type="number" value={propertyDetails.dimensions} name='dimensions' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, dimensions: e.target.value})
                        }
                        }  required />
                </label>
                <label className='input-label'>
                    Property available from?
                    <input className='input-box' type="date" value={
                        new Date(propertyDetails.availability).toISOString().split('T')[0]
                    } name='availability' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, availability: e.target.value})
                        }
                        } required />
                </label>
                <input value="Edit Listing" type="submit" className='bg-[#03C988] hover:bg-[#02B47A] transition-all ease-in-out duration-300 w-full mt-5 py-2 text-xl text-white rounded-md cursor-pointer'/>
            </form>
            }
        </div>
    </Layout>
  )
}

export default EditListing