import React from 'react'
import Navbar from './Navbar'

const Layout = (props) => {
  
  return (
    <div className='relative z-1 h-[100vh]'>
        <Navbar/>
        <div className='content-wrapper'>
            {props.children}
        </div>
    </div>
  )
}

export default Layout