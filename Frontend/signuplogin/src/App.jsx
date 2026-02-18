import React, { useContext } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";


function App() {

  const {user} = useContext(AuthContext)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={user ? <Profile /> : <Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App