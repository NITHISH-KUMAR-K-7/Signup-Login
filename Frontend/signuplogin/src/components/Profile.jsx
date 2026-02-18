// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// function Profile() {
//   const { user, dispatch } = useContext(AuthContext); // user = token
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${user}`,
//           },
//         });

//         setUsername(res.data); // backend returns: Welcome username
//       } catch (error) {
//         console.log(error.response?.data || error.message);
//         handleLogout(); // if token invalid → logout
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       getProfile();
//     }
//   }, [user]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     dispatch({ type: "LOGOUT" });
//     navigate("/login");
//   };

//   if (loading) return <h2>Loading...</h2>;

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>{username}</h1>

//       <button
//         onClick={handleLogout}
//         style={{
//           marginTop: "20px",
//           padding: "8px 15px",
//           backgroundColor: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Profile;


import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { token, dispatch } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(res.data);
      } catch (error) {
        console.log(error);

        // if token invalid → logout
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      getProfile();
    }
  }, [token]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <p className="mb-4">{message}</p>

        <button
          onClick={logout}
          className="bg-red-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
