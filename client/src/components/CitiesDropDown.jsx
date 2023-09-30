import React from 'react'
import '../filterStyle.css'
import { City }  from 'country-state-city';

const CitiesDropDown = (props) => {
  return (
    <select 
    name='city' 
    className={props.class} 
    value={props.propertyData.city}
    onChange={(e) => {
        props.setPropertyData({ ...props.propertyData, city: e.target.value });
        }}
    required>
        <option value="" disabled>Select City</option>
        {City.getCitiesOfState('IN','MH').map((city,index)=>
            <option key={index} value={city.name}>{city.name}</option>
        )}
    </select>
  )
}

export default CitiesDropDown