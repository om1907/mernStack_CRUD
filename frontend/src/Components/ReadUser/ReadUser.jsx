import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { X } from 'lucide-react'


function ReadUser({ userData, onClose }) {

  const [UserData, setUserData] = useState([]);
  const fetchSingleUser = async () => {
    const res = await axios.get(`http://localhost:3300/api/getuserdata/${userData._id}`);
    // console.log(res);
    setUserData(res.data);
    console.log(userData);
  };
  useEffect(() => {
    fetchSingleUser();
  }, []);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className='mt-10 flex flex-col gap-3 text-white'>
        <button onClick={onClose} className='place-self-end'><X size={30} /></button>
        <div className="relative overflow-x-auto shadow">
          <table className="w-full text-lg text-center text-gray-500">
            <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {userData.name}
                </th>
                <td className="px-6 py-4 text-gray-200">{UserData.email}</td>
                <td className="px-6 py-4 text-gray-400">{UserData.password}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReadUser