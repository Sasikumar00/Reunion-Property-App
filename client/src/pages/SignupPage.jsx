import React, {useState} from 'react'
import Layout from '../components/Layout'
import '../addlisting.css'
import axiosInstance from '../utils/axiosInstance'

const SignupPage = () => {
    const [userData, setUserData] = useState({})
    const handleSubmit = (e)=>{
        e.preventDefault()
        axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/signup`,userData).then(
            res=>{
                if(res?.status===201){
                    alert(res?.data?.message)
                    window.location.replace('/login')
                }
                else{
                    alert(res?.data?.message)
                }
            }
        )
    }
  return (
    <Layout>
        <h1 className='text-center text-5xl mt-5'>Sign Up</h1>
        <div className='flex items-center justify-center min-h-[85vh]'>
            <form onSubmit={handleSubmit} method='post' className='h-full border border-[#051923] p-3 rounded-md'>
            <label className='input-label'>
                    Fullname
                    <input className='input-box' type="text" name='fullname' onChange={(e)=>
                        {
                            setUserData({...userData, fullname: e.target.value})
                        }
                        } 
                    required />
                </label>
                <label className='input-label'>
                    Email
                    <input className='input-box' type="email" name='email' onChange={(e)=>
                        {
                            setUserData({...userData, email: e.target.value})
                        }
                        }  required />
                </label>
                <label className='input-label'>
                    Phone Number
                    <input className='input-box' type="phonenumber" name='phone' onChange={(e)=>
                        {
                            setUserData({...userData, phone: e.target.value})
                        }
                        }  required minLength={10}/>
                </label>
                <label className='input-label'>
                    Enter your new password
                    <input className='input-box' type="password" name='password' onChange={(e)=>
                        {
                            setUserData({...userData, password: e.target.value})
                        }
                        }  required minLength={8}/>
                </label>
                <label className='input-label'>
                    Re-enter your password
                    <input className='input-box' type="password" name='passwordConfirm' onChange={(e)=>
                        {
                            setUserData({...userData, passwordConfirm: e.target.value})
                        }
                        }  required minLength={8}/>
                </label>
                <input value="SignUp" type="submit" className='bg-[#03C988] hover:bg-[#02B47A] transition-all ease-in-out duration-300 w-full mt-5 py-2 text-xl text-white rounded-md cursor-pointer'/>
            </form>
        </div>
    </Layout>
  )
}

export default SignupPage