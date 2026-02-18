import React, { useContext, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
import { AuthContext } from "./AuthContext";


function Login() {

  const [formData,setForData] = useState({email:"",password:""})
  const [error,setError] = useState({})

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleChange = (event)=>{
    setForData({...formData,[event.target.name]:event.target.value})

    setError({});
  }

  const handleSubmit = async(event)=>{
    event.preventDefault();
    const validationErrors = Validation(formData);
    setError(validationErrors);

    //stop if validation fails
    if (Object.keys(validationErrors).length > 0) return;

    // Not error Run 
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
      );

      dispatch({
        type:"LOGIN",
        payload: {
          token:res.data.token,
          user:res.data.user
        }
      })

    
      if (res.data.token) {
        navigate("/profile");
      }
    } catch (err) {
      setError((prev) => ({
        ...prev,
        server: err.response?.data?.message || "Login failed",
      }));
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center bg-gray-300 min-h-screen">
          <div className="bg-white w-[80%] max-w-md rounded-lg">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center mt-3">Login</h1>

              {/* server error */}
              {error.server && (
                <p className="text-red-500 text-center">{error.server}</p>
              )}

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
    </>
  );
}

export default Login


