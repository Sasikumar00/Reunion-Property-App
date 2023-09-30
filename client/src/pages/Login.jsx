import React, {useState, useEffect} from 'react'
import axiosInstance from '../utils/axiosInstance'
import Layout from '../components/Layout'

const Login = () => {
    const [userData, setUserData] = useState({'email':'','password':''})
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/login`, userData);
            if(res?.data?.token){
                localStorage.setItem('jwt', res.data.token)
                window.location.replace("/")
            }
            if(res?.data?.message){
                alert(res.data.message)
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('jwt')){
            window.location.replace("/")
        }
    },[])
  return (
    <Layout>
    <h1 className='text-center text-5xl mt-5'>Log In</h1>
    <div className='flex items-center justify-center min-h-[70vh]'>
        <form onSubmit={handleSubmit} method='post' className='h-full w-[50%] border border-[#051923] p-3 rounded-md'>
        <label className='input-label flex-col'>
            Email Address
            <input type="email" className='border-2 rounded-md px-5 py-1 outline-none' name='email' placeholder='Enter email' onChange={(e)=>{setUserData({...userData,'email': e.target.value})}} required/>
        </label>
        <label className='input-label flex-col'>
            Password
            <input type="password" className='border-2 rounded-md px-5 py-1 outline-none' name='password' placeholder='Enter password' onChange={(e)=>{setUserData({...userData,'password': e.target.value})}} required/>
        </label>
        <div className='flex items-center justify-center'>
        <input value="Login" type="submit" className='bg-[#03C988] hover:bg-[#02B47A] transition-all ease-in-out duration-300 w-[50%] mt-5 py-2 text-xl text-white rounded-md cursor-pointer'/>
        </div>
        </form>
    </div>
    </Layout>
  )
}

export default Login