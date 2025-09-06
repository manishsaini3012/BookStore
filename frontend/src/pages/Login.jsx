// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { authActions } from '../store/auth';
// import axios  from 'axios';
// import { useDispatch } from 'react-redux';

// const Login = () => {
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//   });
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:1000/api/v1/sign-in", form);
//       dispatch(authActions.login());
//      localStorage.setItem("id",response.data.id);
//      localStorage.setItem("token",response.data.token);
//      localStorage.setItem("role",response.data.role);
//       // navigate("/logIn");
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 sm:px-6 md:px-8">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-zinc-800 p-6 sm:p-8 rounded-lg w-full max-w-md shadow-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           required
//           className="w-full p-3 mb-4 rounded bg-zinc-700 text-white outline-none"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="w-full p-3 mb-6 rounded bg-zinc-700 text-white outline-none"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
//         >
//           Login
//         </button>

//         <p className="text-center text-zinc-400 mt-6 text-sm">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-blue-500 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store/auth';

const Login = () => {
   const BACKEND_URL= process.env.BACKEND_URL;
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/sign-in`, form);

      if (response && response.data) {
        dispatch(authActions.login());
        dispatch(authActions.changedRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile"); // Navigate to home or dashboard after login
      } else {
        alert("Login failed. Please try again.");
      }

    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 sm:px-6 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 sm:p-8 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-zinc-700 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 rounded bg-zinc-700 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Login
        </button>

        <p className="text-center text-zinc-400 mt-6 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

