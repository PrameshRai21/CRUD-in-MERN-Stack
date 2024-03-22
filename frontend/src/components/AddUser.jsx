import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

function AddUser() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    })

    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args){
            clearTimeout(timeoutId);
            //timeoutId = setTimeout(() => func.apply(this.args), delay)
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        }
    }

    const handleDebounce = debounce((e)=>{
        const {name, value} = e.target;
        setUser((users) => ({...users, [name]:value}))
    }, 1000)

    const handleChange = (e) => {
        e.persist()
        handleDebounce(e)
    }

    console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/v1/users/create", user)
        .then((response) => {
            toast.success(response.data.message, {position: "top-center"})
            navigate("/")
        })
        .catch((error)=>console.log(error))
    }

  return (
    <div className="w-full h-screen flex flex-row justify-center bg-gray-300">
      <div className="w-[500px] h-[530px] border-2 border-gray-100 rounded-md mt-5 p-4">
      <Link to="/" className="text-lg font-semibold text-blue-800 underline my-2" > Go Back</Link>
      <h1 className="text-center text-xl font-bold text-gray-800 uppercase">Add User Form</h1>
      <hr />
      <div className="mt-3">
        <form onSubmit={handleSubmit} className="text-lg">
          <div className="flex flex-col my-2">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              onChange={handleChange}
              className="p-1 rounded-sm outline-none"
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="lasttname">Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              onChange={handleChange}
              className="p-1 rounded-sm outline-none"
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="p-1 rounded-sm outline-none"
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="p-1 rounded-sm outline-none"
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="p-1 rounded-sm outline-none"
              required
            />
          </div>
          <hr />
          <div>
            <button type="submit" className="bg-blue-700 text-white text-lg font-semibold rounded-md py-1 px-2 mt-3 hover:opacity-80 hover:cursor-pointer">Add User</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddUser;
