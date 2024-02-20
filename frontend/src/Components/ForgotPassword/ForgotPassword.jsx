import React from 'react'
import {X} from 'lucide-react'

const ForgotPassword = () => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <button  className='text-grey-900 place-self-end'  ><X /></button>
        <div>
          <form>
            <h1 className=' text-grey-900'> Forgot Password</h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword