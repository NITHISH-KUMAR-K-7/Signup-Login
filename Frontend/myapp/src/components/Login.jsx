import axios from 'axios';
import React, { useState } from 'react'

import { Link, useNavigate } from "react-router-dom";
import Validation from './SignupValidate';

function Login() {

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

   const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({
      ...formData,[e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setErrors(Validation(formData))
    if (errors.email === "" && errors.password === ""){
      axios
        .post("http://localhost:5000/login", formData)
        .then((res) => {
          console.log(res);
          if (res.data === "Success") {
            navigate("/home");
          } 
        })
        .catch((err) => {
          console.log(err);
        });
      }

  }
  return (
    <div>
      <div className="flex justify-center items-center bg-gray-300 min-h-screen">
        <div className="bg-white w-[80%] max-w-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center mt-3">Login</h1>

            <div className="px-5 mb-3">
              <label className="text-lg flex" htmlFor="">
                Email
              </label>
              <input
                className="w-full py-1 border-gray-400 border-b-1  focus:outline-none focus:border-gray-500 focus:border-b-2"
                type="text"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-500 mt-1">{errors.email}</span>
              )}
            </div>

            <div className="px-5 mb-3">
              <label className="text-lg flex" htmlFor="">
                Password
              </label>
              <input
                className="w-full py-1 border-gray-400 border-b-1  focus:outline-none focus:border-gray-500 focus:border-b-2"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="text-red-500 mt-1">{errors.password}</span>
              )}
            </div>
            <div className="mx-5 mb-3 flex items-center">
              <button
                type="submit"
                className="bg-blue-500 px-2 py-1 text-white rounded-lg cursor-pointer"
              >
                Login
              </button>
              <p className="ml-2">Create Account</p>
              <Link className="text-blue-500 cursor-pointer ml-2" to="/">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login