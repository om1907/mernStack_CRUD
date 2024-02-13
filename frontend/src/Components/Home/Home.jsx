import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReadUser from '../ReadUser/ReadUser';
import UpdateUser from '../UpdateUser/UpdateUser';
import { Link } from 'react-router-dom';
// import { NavLink,Link } from 'react-router-dom';

function Home() {


  const [showReadUserModel, setReadUserModel] = useState(false);
  const [showUpdateUserModal, setUpdateUserModal] = useState(false);
  // const [errorMessage,setErrorMessage]=useState("");

  //Create user

  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value
    })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3300/api/createuser", inputUser);
      console.log(res);
      // console.log(inputUser);
      fetchAllUser();
    } catch (error) {
      console.error(error);
    }
  }

  //delete User

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteuser/${id}`);
      if (res.status === 200) {
        toast.success('User deleted successfully');
        fetchAllUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Fetch all data
  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:3300/api/getalluserdata");
      console.log(res);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllUser();
  }, [])



  return (
    <div className="w-2/3 mx-auto mt-5">
      {/* creating form */}

      <form onSubmit={handleSubmit}>
        <h1 text-3xl font-bold text-gray-900 uppercase>Create User</h1>
        <div className="mt-3">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={inputUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Password "
            required
            value={inputUser.password}
            onChange={handleChange}
          />
        </div>
        <div className='gap 3 flex justify-between'>
          <div className="flex justify-center my-4">
            <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm"
              onClick={() => toast.success('User added successfully')}
            >
              Add User
            </button>
            {/* {errorMessage&&<div>{errorMessage}</div>} */}
          </div>
          <div className="flex justify-center my-4">
            <Link className="px-4 py-2 bg-yellow-400 rounded-sm"
              to={'/'}
            >
              Logout
            </Link>
            {/* {errorMessage&&<div>{errorMessage}</div>} */}
          </div>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
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
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <td className="px-6 py-4"> {item?.email}</td>
                <td className="px-6 py-4"> {item?.password}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    {/* <NavLink
                      to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </NavLink> */}

                    <button className='font-medium text-green-600 dark:text-blue-500 hover:underline' onClick={() => setReadUserModel({ isOpen: true, userData: item })}>Read</button>
                    {showReadUserModel.isOpen && <ReadUser userData={showReadUserModel.userData} onClose={() => setReadUserModel({ isOpen: false, userData: null })} />}

                    {/* <NavLink
                      to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink> */}
                    <button className='font-medium text-yellow-400 dark:text-blue-500 hover:underline' onClick={() => setUpdateUserModal({ isOpen: true, userData: item })}>Edit</button>
                    {showUpdateUserModal.isOpen && <UpdateUser userData={showUpdateUserModal.userData} onClose={() => setUpdateUserModal({ isOpen: false, userData: null })} />}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Home