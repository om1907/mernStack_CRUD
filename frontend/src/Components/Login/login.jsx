import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ForgotPassword from '../ForgotPassword/ForgotPassword';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [showForgotPasswordModel,setForgotPasswordModel]=useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3300/api/userlogin', credentials);

      // Check if the server response indicates success
      if (response.data.success) {
        setErrorMessage(null);
        window.location = '/userdashboard'
      } else {
        // Display error message from the server
        setErrorMessage(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.error(error.response);
      setErrorMessage('Please enter valid email id and password.');
    }
  };


  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-900 uppercase">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              name='email'
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-900 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              name='password'
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-900 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              value={credentials.password}
              onChange={handleChange}
            />
            {/* <EyeIcon /> */}
          </div>
          {/* <a
            href="#"
            className="text-xs text-gray-500 hover:underline"
          >
            Forget Password?
          </a> */}
          <button onClick={()=>setForgotPasswordModel(true)} className='text-xs text-gray-500 hover:underline'>
          Forgot Password
          </button>
          {showForgotPasswordModel&&<ForgotPassword />}
          <div className="mt-6">
            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-yellow-400" >
              Login
            </button>
          </div>
          {errorMessage && <div>{errorMessage}</div>}
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-500">
          {" "}
          Don't have an account?{" "}
          <Link
            to='/signup'
            className="font-medium text-gray-900 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login