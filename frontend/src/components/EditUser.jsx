import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((users) => ({ ...users, [name]: value }));
  };

  const fetchUserById = async () => {
    await axios
      .get(`/api/v1/users/getById/${id}`)
      .then((response) => setUser(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUserById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(`/api/v1/users/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error, { position: "top-center" });
      });
  };

  return (
    <div className="h-screen w-full flex flex-row justify-center bg-gray-300">
      <div className="w-[500px] h-[450px] border-2 border-gray-100 rounded-lg mt-5 p-3">
        <Link to="/" className="text-lg font-semibold text-blue-800 underline my-2">Go Back</Link>
        <h1 className="text-center text-xl font-bold text-gray-800 uppercase">User Edit Form</h1>
        <hr />
        <div className="mt-3">
          <form onSubmit={handleSubmit} className="text-lg">
            <div className="flex flex-col my-2">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={user.firstname}
                onChange={handleChange}
                className="p-1 rounded-sm outline-none"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="lasttname">Lastname</label>
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={user.lastname}
                onChange={handleChange}
                className="p-1 rounded-sm outline-none"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                className="p-1 rounded-sm outline-none"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                className="p-1 rounded-sm outline-none"
              />
            </div>
            <hr />
            <div>
              <button type="submit"  className="bg-green-600 text-white text-lg font-semibold rounded-md py-1 px-2 mt-3 hover:opacity-80 hover:cursor-pointer">Update User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
