import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import {FaHamburger,FaWindowClose} from 'react-icons/fa'
import '../navbarStyle.css'

const Navbar = () => {
  const [user,setUser]=useState('')
  const [isOpen, setIsOpen] = useState(false)

  const validateJWT = async(token)=>{
    const res = await axiosInstance.get(`http://localhost:8000/api/validate`,{headers:{
      Authorization: token
    }})
    if(res?.data){
      return res.data.ok
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('jwt')){
      validateJWT(localStorage.getItem('jwt')).then(validity=>{
        if(validity){
          setUser(localStorage.getItem('jwt'))
        }
        else{
          setUser('')
          localStorage.removeItem('jwt')
          window.location.replace('/login')
        }
      })
  //eslint-disable-next-line
  }},[localStorage.getItem('jwt')])

  const handleLogout = ()=>{
    if(localStorage.getItem('jwt')){
      localStorage.removeItem('jwt')
    }
    window.location.replace("/")
  }

  const toggleHamMenu = ()=>{
    setIsOpen(!isOpen)
  }

  return (
    <div className='bg-[#051923] h-[5rem] w-full'>
      {/* HAMBURGER MENU */}
      <div id='ham-menu' className={`md:hidden ${isOpen?'open':'close'}`}>
        <div className='bg-[#051923] absolute flex justify-center h-[100vh] w-full p-10'>
          <div onClick={toggleHamMenu} className='absolute right-5 top-3'>
            <FaWindowClose className='text-white text-2xl'/>
          </div>
          <div className={user?.length>1?'flex flex-col':'flex flex-col'}>
            <div className='text-white text-2xl text-center mb-10'><Link onClick={()=>setIsOpen(false)} to={"/"}>ListBuddy</Link></div>
            <ul className='text-white flex flex-col gap-5 items-center text-xl'>
              <li onClick={()=>setIsOpen(false)}><Link to={'/'}>Home</Link></li>
              {user?.length>1 && <li onClick={()=>setIsOpen(false)}><Link to={'/my-listings'}>My Listings</Link></li>}
              <li onClick={()=>setIsOpen(false)}><Link to={'/about'}>About us</Link></li>
              {user?.length>1 && <li onClick={()=>setIsOpen(false)}><Link to={'/profile'}>Profile</Link></li>}
              {user?.length>1 && <li className='bg-[#02090d] px-3 py-1 rounded-md mx-5 cursor-pointer' onClick={()=>{
                setIsOpen(false)
                handleLogout()
                }}>Logout</li>}
              {user?.length<1 &&
              <>
              <li className='bg-[#02090d] px-3 py-1 rounded-md mx-5' onClick={()=>setIsOpen(false)}><Link to={'/signup'}>Signup</Link></li>
              <li className='bg-[#02090d] px-3 py-1 rounded-md mx-5' onClick={()=>setIsOpen(false)}><Link to={'/login'}>Login</Link></li>
              </>}
              <li className='bg-[#fca311] px-3 py-1 rounded-md mx-5' onClick={()=>setIsOpen(false)}><Link to={"/add-listing"}>Add Listing</Link></li>
            </ul>
          </div>
        </div>
        </div>
      {/* MOBILE NAVIGATION */}
        <nav className='flex items-center justify-between md:hidden w-full h-full px-10'>
          <div className='text-white text-2xl flex items-center mr-5'><Link to={"/"}>ListBuddy</Link></div>
          <div onClick={()=>{toggleHamMenu()}}>
            <FaHamburger className='text-white text-3xl'/>
          </div>
        </nav>
       {/* NORMAL MENU  */}
        <nav className='hidden md:grid grid-cols-5 h-full px-5'>
          <div className={user?.length>1?'flex col-span-3':'flex col-span-2'}>
            <div className='text-white text-2xl flex items-center mr-5 lg:mr-20'><Link to={"/"}>ListBuddy</Link></div>
            <ul className='text-white flex gap-5 items-center text-xl'>
              <li className='links'><Link to={'/'}>Home</Link></li>
              {user?.length>1 && <li className='links'><Link to={'/my-listings'}>My Listings</Link></li>}
              <li className='links'><Link to={'/about'}>About us</Link></li>
              {user?.length>1 && <li className='links'><Link to={'/profile'}>Profile</Link></li>}
            </ul>
            </div>
          <div className={user.length>1?'flex items-center w-full col-span-2':'flex items-center w-full col-span-3'}>
            <ul className='flex justify-end text-white md:text-xl w-full'>
              {user?.length>1 && <li className='bg-[#02090d] px-3 py-1 rounded-md mx-5 cursor-pointer' onClick={handleLogout}>Logout</li>}
              {user?.length<1 &&
              <>
              <li className='bg-[#02090d] px-3 py-1 rounded-md mx-5'><Link to={'/signup'}>Signup</Link></li>
              <li className='bg-[#02090d] px-3 py-1 rounded-md mx-5'><Link to={'/login'}>Login</Link></li>
              </>}
              <li className='bg-[#fca311] px-3 py-1 rounded-md mx-5'><Link to={`${user?.length>1?'/add-listing':'/login'}`}>Add Listing</Link></li>
            </ul>
          </div>
        </nav>
    </div>
  )
}

export default Navbar