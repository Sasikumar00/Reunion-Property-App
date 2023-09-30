import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import '../addlisting.css'
import axiosInstance from '../utils/axiosInstance'
import CitiesDropDown from '../components/CitiesDropDown'

const AddListingPage = () => {
    const [propertyDetails, setPropertyDetails] = useState({'name':'','location':'','city':'','price':'','availability':'','type':'','bedrooms':'','bathrooms':'','dimensions':''})
    const [user, setUser] = useState('')
    const handleSubmit = async(e, token)=>{
        e.preventDefault();
        if(propertyDetails.price<=0 || propertyDetails.bedrooms<=0 || propertyDetails.bathrooms<=0 || propertyDetails.dimensions<=0){
            return alert("Enter valid property details")
        }
        let availabilityInMilli = new Date(propertyDetails.availability).getTime()
        if(availabilityInMilli<Date.now()){
            return alert('Availability date cannot be in the past')
        }
        axiosInstance.post(`http://localhost:8000/api/property`,propertyDetails, {
            headers: {
            Authorization: `Bearer ${token}`
        }}).then(
          res=>{
            if(res.status===200){
            alert(res?.data?.message)
            window.location.replace('/my-listings')
            }
            else{
                alert(res?.data?.message)
            }
          }
        )
    }
    useEffect(()=>{
        if(localStorage.getItem('jwt')){
            setUser(localStorage.getItem('jwt'))
        }
    }, [propertyDetails])
  return (
    <Layout>
        <h1 className='text-center text-gray-800 font-semibold text-5xl bold mt-3'>Add your property details</h1>
        <div className='flex items-center justify-center my-10'>
            <form onSubmit={(e)=>handleSubmit(e,user)} method='post' className='flex flex-col'>
                {/* <input type="file" /> */}
                <label className='input-label'>
                    Enter property name
                    <input className='input-box' type="text" name='name' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, name: e.target.value})
                        }
                        } 
                    required maxLength={50}/>
                </label>
                <label className='input-label'>
                    Rent price
                    <input className='input-box' type="number" name='price' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, price: e.target.value})
                        }
                        }  required />
                </label>
                <label className='input-label'>
                    Address
                    <input className='input-box' type="text" name='location' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, location: e.target.value})
                        }
                        }  required maxLength={150}/>
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
                    Property Size (In Sqrft)
                    <input className='input-box' type="number" name='dimensions' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, dimensions: e.target.value})
                        }
                        }  required />
                </label>
                <label className='input-label'>
                    Property available from?
                    <input className='input-box' type="date" name='availability' onChange={(e)=>
                        {
                            setPropertyDetails({...propertyDetails, availability: e.target.value})
                        }
                        } required />
                </label>
                <input value="Add Listing" type="submit" className='bg-[#03C988] hover:bg-[#02B47A] transition-all ease-in-out duration-300 w-full mt-5 py-2 text-xl text-white rounded-md cursor-pointer'/>
            </form>
        </div>
    </Layout>
  )
}

export default AddListingPage