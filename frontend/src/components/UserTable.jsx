import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
//import toast from 'react-hot-toast';

function UserTable() {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    //getting all user
    const fetchUser = async () => {
        await axios.get("/api/v1/users/getAllUsers")
        .then((response) => (
            setUsers(response.data.data)
        ))
        .catch((error) => console.log(error))
        //toast.success(response.data.message, {position: "top-center"})
    }

    //deleting user
    const deleteUser = async (id) => {
        await axios.post(`/api/v1/users/delete/${id}`)
        .then((response) => {
            toast.success("User deleted successfully", {position: "top-center"})
            navigate("/")
            
        })
        .catch((error) => {
            toast.error(error, {position: "top-center"})
        })
    }

    //rendering onmount
    useEffect(() => {
        fetchUser()
    }, [deleteUser])

   

  return (
    <div className='h-[120vh] w-full flex flex-row bg-gray-300 justify-center overflow-hidden'>
      <div className='w-[700px] min-h-60 border-2 border-solid border-gray-50 rounded-2xl mt-5 p-3'>
        <div>
            <h1 className='text-center text-2xl font-bold text-gray-700 mb-2'>CRUD in MERN</h1>
            <hr />
        </div>
        <div className='mt-2'>
            <Link to="/add">
                <button className='font-semibold text-md bg-blue-800 text-white p-2 rounded-md mb-2
                                    hover:opacity-80 hover:cursor-pointer'>Add User</button>
            </Link>
        </div>
        <div className='w-[100%]'>
            <table className='w-full'>
                <thead className='bg-green-700 text-white uppercase text-md'>
                    <tr >
                        <th className='py-3 text-left'>S.No.</th>
                        <th className='py-3 text-left'>Full Name</th>
                        <th className='py-3 text-left'>Username</th>
                        <th className='py-3 text-left'>Email</th>
                        <th className='py-3 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        users.map((user, index) =>(
                            <tr key={index} className='text-md text-gray-800 border-b-2 border-gray-200 bg-slate-400 hover:bg-slate-600 hover:text-white'>
                                <td className='py-2 text-center'>{index + 1}</td>
                                <td className='py-2'>{user?.firstname} {user?.lastname}</td>
                                <td className='py-2'>{user?.username}</td>
                                <td className='py-2'>{user?.email}</td>
                                <td className='py-2'>
                                    <Link to={`/edit/` + user._id}>
                                        <button className='bg-green-700 px-2 py-1 text-white text-lg rounded-md mr-1'>Edit</button>
                                    </Link>
                                    <button onClick={(e)=>deleteUser(user._id)}
                                    className='bg-red-600 px-2 py-1 text-white text-lg rounded-md mr-1'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default UserTable;
