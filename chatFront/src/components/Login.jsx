import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = ({openSignup}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate() 

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/chat/user/login', {username, password})
        console.log(response)
        if(response.data.msg === 'success') {
          window.localStorage.setItem('chat-token', response.data.token)
          window.localStorage.setItem('userId', response.data.user._id) 
          navigate('/chat') 
        }
      } catch(error){
        console.log(error)
      }
    }
  return (
    <div>
      {/* Form Container */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
           />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label htmlFor="rememberme" className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign Up Section */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-700">Don't have an account?</span>
          <button className="ml-2 text-sm text-blue-600 hover:underline" onClick={openSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
