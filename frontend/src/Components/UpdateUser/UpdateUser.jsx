import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react';

const UpdateUser = ({ userData, onClose }) => {

  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchSingleUser = async () => {
    const res = await axios.get(`http://localhost:3300/api/getuserdata/${userData._id}`);
    setInputUser({
      name: res.data.name,
      email: res.data.email,
      password: res.data.password,
    })
    console.log(res);

  };
  useEffect(() => {
    fetchSingleUser();
  }, []);

  const handleChange = (event) => {

    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputUser);
    try {
      const res = await axios.put(`http://localhost:3300/api/updateuser/${userData._id}`, inputUser);
      if (res.status === 200) {
        window.location = '/userdashboard';
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <button className='text-grey-900 place-self-end' onClick={onClose} ><X /></button>
        <div>
          <form onSubmit={handleSubmit}>
            <h1 className=' text-grey-900'> Update User</h1>
            <div className="">
              <label className="ml-0 text-sm text-grey-500 ">Name</label>
              <input
                type="text"
                name="name"
                className="block py-2.5 px-3 w-full text-sm text-grey-400 bg-transparent  border-2 border-gray-300"
                placeholder="Enter name"
                required
                value={inputUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label className=" text-sm text-grey-500 text-left">Email</label>
              <input
                type="text"
                name="email"
                className="block py-2.5 px-3 w-full text-sm text-grey-400 bg-transparent  border-2 border-gray-300"
                placeholder="Enter email "
                required
                value={inputUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label className=" text-sm text-grey-500 ">Password</label>
              <input
                type="password"
                name="password"
                className="block py-2.5 px-3 w-full text-sm text-grey-400 bg-transparent  border-2 border-gray-300"
                placeholder="Enter Password "
                required
                value={inputUser.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center my-4">
              <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm" onClick={() => onClose} >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser