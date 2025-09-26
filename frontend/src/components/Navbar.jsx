import React from 'react'
import { Link } from 'react-router-dom'
import { userAuth } from '../context/ContextProvider'

const Navbar = ({setQuery}) => {
  const {user , handlelogout} = userAuth()

  return (
    <nav className='bg-gray-800 p-4 text-white flex justify-between items-center'>
      <div className='text-xl font-bold'>
          <Link to='/'>NoteApp</Link>
      </div>
      <input type="text" onChange={(e)=> setQuery(e.target.value)} placeholder='Search' className='bg-gray-600 px-4 py-2 rounded' />

      <div>
        
        {!user ? (
            <>
                <Link to='/login' className='bg-blue-500 px-4 py-2 rounded mr-4'>Sign in</Link>
                <Link to='/register' className='bg-teal-500 px-4 py-2 rounded mr-4'>Sign up</Link>            
            </>
        )
        :
        (
        <>
            <span className='mr-4'>{user.name}</span>
            <button className='bg-red-500 px-4 py-2 rounded' onClick={handlelogout}>Log out</button>
        </>
        )
        }

       
      </div>
    </nav>
  )
}

export default Navbar