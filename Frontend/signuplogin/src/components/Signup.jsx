import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios'

function Signup() {

    const [formData,SetFormData] = useState({username:"",email:"",password:""})

    const [error,setError] = useState({})
    const navigate = useNavigate()

    const [serverError, setServerError] = useState(""); // for server error check
    const [loading, setLoading] = useState(false); // for loading

    const handleChange = (event)=>{
        SetFormData({...formData,[event.target.name]:event.target.value})
    }

    const handleSubmit = async(event)=>{
      event.preventDefault();
      const validationErrors = Validation(formData);
      setError(validationErrors);

      // if validation fails, stop
      if (Object.keys(validationErrors).length > 0) return;
      try {
        setLoading(true);
        setServerError("");
        await axios.post(`${import.meta.env.VITE_API_URL}/signup`, formData);
        navigate("/login");
      } catch (error) {
        setServerError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  return (
    <>
      <div className="flex justify-center items-center bg-gray-300 min-h-screen">
        <div className="bg-white w-[80%] max-w-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center mt-3">Signup</h1>
            <div className="px-5 mb-3">
              <label className="text-lg flex" htmlFor="">
                Username
              </label>
              <input
                className="w-full py-1 border-gray-400 border-b  focus:outline-none focus:border-gray-500 focus:border-b-2"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {error.username && (
                <span className="text-red-500 mt-1">{error.username}</span>
              )}
            </div>

            <div className="px-5 mb-3">
              <label className="text-lg flex" htmlFor="">
                Email
              </label>
              <input
                className="w-full py-1 border-gray-400 border-b  focus:outline-none focus:border-gray-500 focus:border-b-2"
                type="text"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && (
                <span className="text-red-500 mt-1">{error.email}</span>
              )}
            </div>

            <div className="px-5 mb-3">
              <label className="text-lg flex" htmlFor="">
                Password
              </label>
              <input
                className="w-full py-1 border-gray-400 border-b  focus:outline-none focus:border-gray-500 focus:border-b-2"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {error.password && (
                <span className="text-red-500 mt-1">{error.password}</span>
              )}
            </div>
            <div className="mx-5 mb-3 flex items-center">
              <button
                type="submit"
                className="bg-blue-500 px-2 py-1 text-white rounded-lg cursor-pointer"
              >
                Signup
              </button>
              <p className="ml-2">Already have account ?</p>
              <Link className="text-blue-500 cursor-pointer" to="/login">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup