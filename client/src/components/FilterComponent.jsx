import React,{useState,useEffect} from 'react'
import CitiesDropDown from './CitiesDropDown'
import axiosInstance from '../utils/axiosInstance'

const FilterComponent = (props) => {
    const [user, setUser] = useState('')
    const handleFilter = (e, token)=>{
        e.preventDefault()
        let availabilityInMilli = new Date(props.propertyData.availability).getTime()
        if(availabilityInMilli<Date.now()){
            return alert('Availability date cannot be in the past')
        }
        props.setIsLoading(true)
        axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/property/filter`,props.propertyData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            if(res?.status===200){
                if(res.data.message){
                    props.setIsLoading(false)
                    return props.setListingData([])
                }
                props.setListingData(res?.data?.data)
                props.setIsLoading(false)
            }
        })
    }
    useEffect(()=>{
        if(localStorage.getItem('jwt')){
            setUser(localStorage.getItem('jwt'))
        }
    }, [props.propertyData])
  return (
    <div id='filter-box' className={`fade-element border border-gray-400 pt-5 px-5 rounded-md w-[90%] mx-auto mt-10 ${props.isFilterOpen?'show-filter':'hide-filter'}`}>
        <h1 className=' text-xl font-semibold'>Filters</h1>
        <div>
            <form onSubmit={(e)=>handleFilter(e,user)} className='w-full flex flex-col'>
                <div className='flex flex-col md:flex-row justify-between'>
                <label>
                Choose your location
                <CitiesDropDown propertyData={props.propertyData} setPropertyData={props.setPropertyData}/>
                </label>
                <label>
                    Choose availability date
                    <input type="date" name="availability" value={props.propertyData.availability} onChange={(e)=>
                        {
                            props.setPropertyData({...props.propertyData, availability: e.target.value})
                        }}/>
                </label>
                <label>
                    Choose your price range
                    <input type="range" name="" id="" min="0" max="100000" step="1000" value={props.propertyData.price}
                    onChange={(e)=>{
                        props.setPropertyData({...props.propertyData,'price':e.target.value})
                    }}
                    />
                    <span>₹ {props.propertyData.price} / month</span>
                </label>
                <label>
                Choose property type
                <select
                    name='type'
                    value={props.propertyData.type}
                    onChange={(e) => {
                    props.setPropertyData({ ...props.propertyData, type: e.target.value });
                    }}
                    required
                    >
                    <option value="" disabled>Select property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="PG">PG</option>
                </select>
                </label>
                </div>
                <div className='flex justify-between gap-2 md:text-xl mt-5 md:mt-2'>
                <input type="submit" value="Apply Filters" className='bg-[#FCA311] text-white font-semibold border-none cursor-pointer px-2 md:w-[10rem]' />
                <button className='text-red-600 border-2 border-red-600 px-2 cursor-pointer rounded-md md:w-[10rem]' onClick={()=>
                    {
                        props.setPropertyData({'city':'','price':500,'availability':'','type':''})
                        window.location.reload()
                    }
                    }>reset filters</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default FilterComponent