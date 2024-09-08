import React, { useState } from 'react';
import axios from 'axios'

const Register = ({openLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)

    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('image', file)
        try {
          const response = await axios.post('http://localhost:5000/chat/user/register', formData)
          console.log(response)
          if(response.data.msg === "success") {
            openLogin() 
          }
        } catch(error){
          console.log(error)
        }
    }

  return (
    <div>
      {/* Form Container */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
        
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

          {/* Upload Image Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image:
            </label>
            <input 
              type='file'
              className='mt-1 border p-2 block w-full text-sm text-gray-500
                         file:mr-4 file-py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gradient-to-r from-blue-500 to-purple-600 
                         file:hover:from-purple-600 file:hover:to-blue-500 
                         file:transition-all file:duration-300 file:text-white' 
              onChange={(e) => setFile(e.target.files[0])}           
              >
            </input>
          </div>
          
          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Sign Up Section */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-700">Already have an account?</span>
          <button className="ml-2 text-sm text-blue-600 hover:underline" onClick={openLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
