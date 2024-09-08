import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({setChatInitiated, setChats, setReceiverId, selectedUserId, setSelectedUserId}) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const handleLogout = () => {
      window.localStorage.removeItem('chat-token')
      window.localStorage.removeItem('userId')
      navigate('/')
    }
    
    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const users = await axios.get('http://localhost:5000/chat/users', 
                    {
                        headers: {
                          'Authorization': `Bearer ${window.localStorage.getItem('chat-token')}`
                        }
                      }
                );      
                setUsers(users.data.users)
            } catch (error) {
                console.log(error)
                navigate('/')
            }
        }
        fetchUsers();
    } ,[]);

    const startChat = async(id) => {

        try {
          const response = await axios.get('http://localhost:5000/chat/message/read/' + id, 
            {
                headers: {
                  'Authorization': `Bearer ${window.localStorage.getItem('chat-token')}`,
                },
              }
        );
        setChats(response.data);
        } catch (error) {
          if(error.response.data.message === 'Not Found') {
            setChats([])
          }
          console.log(error)
        }

        setChatInitiated(true);
        setReceiverId(id);
        setSelectedUserId(id);
    }


    return (
        <div className='w-64 h-full rounded-lg bg-black bg-opacity-70 p-6 flex flex-col justify-between shadow-xl'>
          {/* Search Bar */}
          <input 
            type="text"
            placeholder='Search users...'
            className='w-full p-3 mb-4 border rounded-lg outline-none text-gray-900 bg-gray-100 focus:ring-2 focus:ring-blue-500'
          />
      
          {/* User List */}
          {users && users.length > 0 ? (
            <div className='space-y-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent'>
              {users.map(user => (
                <div
                  key={user._id}
                  onClick={() => startChat(user._id)}
                  className={`flex items-center space-x-4 p-2 rounded-lg transition duration-200 cursor-pointer ${
                    user._id === selectedUserId ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-600'
                  }`}
                >
                  <img
                    src = {`http://localhost:5000/images/${user.image}`}
                    alt = "User Image"
                    className='w-10 h-10 rounded-full border-2 border-gray-300'
                  />
                  <span className='text-white text-sm font-semibold'>
                    {user.username}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-white font-bold text-center'>No Users</p>
          )}
      
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='w-full py-2 mt-4 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200'
          >
            Logout  
          </button>
        </div>
      );
      
}

export default Sidebar