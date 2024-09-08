import React, { useState, useEffect } from 'react';
import Model from '../components/Model';
import Register from '../components/Register';
import Login from '../components/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    const openSignup = () => {
      setIsModelOpen(true)
      setIsLogin(false)
    };
    const openLogin = () => {
      setIsModelOpen(true)
      setIsLogin(true)
    };
    
    const navigate = useNavigate();
     useEffect(() => {
      const verifyUser = async() =>{ 
        try{
          const response = await axios.get('http://localhost:5000/chat/user/verify', {
            headers: {
              'Authorization': `Bearer ${window.localStorage.getItem('chat-token')}`
            }
          } )
          console.log(response)
          if(response.data.msg === 'success') {
            navigate('/chat');
          } 
        }  catch(error) {
          console.log(error)
          /*console.error("Error verifying user:", error.response ? error.response.data : error.message); */
        }
      };

      verifyUser()
    },/*[]*/ []) 
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Fullscreen background image */}
        <div
          className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.jfif')" }}
        >
          {/* Dark overlay for text clarity */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
  
          {/* Welcome content */}
          <div className="relative z-10 text-center p-10 bg-white bg-opacity-10 rounded-3xl backdrop-blur-md shadow-xl">
            <h1 className="text-6xl font-extrabold text-white">
              Let's Chat App
            </h1>
            <p className="text-xl text-gray-200 mt-6 font-medium">
              Connect, communicate, and collaborate effortlessly. Join the conversation now!
            </p>
            
            {/* Login/Register button */}
            <button 
              className="mt-8 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-500 transform hover:scale-105 transition-transform duration-300"
              onClick={() => setIsModelOpen(true)}
            >
              Login / Register
            </button>
          </div>
        </div>
  
        {/* Modal for login/register */}
        <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
          {isLogin ? <Login openSignup={openSignup} /> : <Register openLogin={openLogin} />}
        </Model>
      </div>
    );
    
    
}

export default Home