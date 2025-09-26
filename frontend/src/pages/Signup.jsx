import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const navigate = useNavigate()
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register",{name,email,password});
            if(response.data.success){
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex justify-center items-center bg-black/10 h-screen'>
        <div className='flex h-100 justify-center w-[700px]'>

                <div className='w-1/3 bg-teal-600 flex flex-col items-center justify-center gap-3'>
                    <div className='text-3xl text-white font-medium'>Welcome Back</div>

                    <Link to='/login' className=' p-1.5 w-36 text-center text-teal-600 bg-white rounded-3xl font-semibold text-[0.85rem]'>Sign in</Link>
                </div>

                <div className='w-2/3 box-border bg-white py-5'>
                    <h2 className='text-center text-3xl font-medium my-10'>Create Account</h2>

                    <form action="" onSubmit={handleSubmit} className='flex flex-col justify-center gap-2 my-2 px-20'>
                        <div className='flex flex-col'>
                            <input type="text" placeholder='Name' required className='bg-black/10 p-[7px] outline-0 box-border rounded-lg' onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className='flex flex-col'>
                            <input type="email" placeholder='Email' required className='bg-black/10 box-border rounded-lg p-[7px] outline-0' onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className='flex flex-col'>
                            <input type="password" placeholder='Password' required className='bg-black/10 box-border rounded-lg p-[7px] outline-0' onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className='flex justify-center'>
                            <button className='bg-teal-600 w-36 rounded-3xl my-1 font-semibold text-[0.85rem] text-white p-1.5'>Sign up</button>
                        </div>
                    </form>
                </div>
        </div>
    </div>
  )
}

export default Signup