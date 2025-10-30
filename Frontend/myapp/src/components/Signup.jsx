import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import Validation from './SignupValidate';

function Signup() {

    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });

    const [errors,SetErrors] = useState({})

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setFormData( {
            ...formData,[e.target.name] : e.target.value
        } )
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        SetErrors(Validation(formData))
        if (errors.username === "" && errors.email === "" && errors.password === ""){
          axios
            .post("http://localhost:5000/register", formData)
            .then((res) => {
              console.log(res);
              navigate("/login");
            })

            .catch((err) => console.log(err));
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
                className="w-full py-1 border-gray-400 border-b-1  focus:outline-none focus:border-gray-500 focus:border-b-2"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="text-red-500 mt-1">{errors.username}</span>
              )}
            </div>

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