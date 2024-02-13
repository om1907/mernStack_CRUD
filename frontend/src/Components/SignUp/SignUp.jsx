import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {

    const [errorrMessage,setErrorrMessage]=useState();
    const [showAlert, setShowAlert] = useState(false);

    const [signupCredentials, setSignupCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSignupChange = (e) => {
        setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (signupCredentials.password !== signupCredentials.confirmPassword) {
            setErrorrMessage('Password do not match');
            console.error('Passwords do not match');
            return;
        }

        try {
            // Send signup request to the server
            const response = await axios.post('http://localhost:3300/api/usersignup',signupCredentials);
            if (response.status === 200) {
                setShowAlert('true');
                setErrorrMessage(null);
                setTimeout(() => {
                    window.location = '/'
                }, 1000);
                return
            }
            console.log(response.data);
        } catch (error) {
            // setErrorMessage('')
            console.error(error);
        }
    };


    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-gray-900 uppercase">
                    Sign Up
                </h1>
                <form onSubmit={handleSignupSubmit} className="mt-6">
                    {/* <div className="mb-2">
                        <label
                            for="name"
                            className="block text-sm font-semibold text-gray-500"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-900 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="name"
                            value={signupCredentials.name}
                            onChange={handleSignupChange}
                            required
                        />
                    </div> */}
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
                            placeholder='email'
                            required
                            value={signupCredentials.email}
                            onChange={handleSignupChange}
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
                            placeholder='password'
                            required
                            value={signupCredentials.password}
                            onChange={handleSignupChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-500"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name='confirmPassword'
                            className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-900 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='confirm password'
                            required
                            value={signupCredentials.confirmPassword}
                            onChange={handleSignupChange}
                        />
                    </div>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-yellow-400">
                            SignUp
                        </button>
                    </div>
                    {showAlert&&<div>
                        {/* Sign up Successfull🎉🎉🎉.Redirecting to SignIn page...  */}
                        {/* {toast.success('Sign up Successfull🎉🎉🎉.Redirecting to SignIn page... ')} */}
                        </div>}
                    {errorrMessage&&<div>{errorrMessage}</div>}
                </form>
                <p className="mt-8 text-xs font-light text-center text-gray-500">
                    {" "}
                    Already have an account?{" "}
                    <Link
                        to='/'
                        className="font-medium text-gray-900 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp