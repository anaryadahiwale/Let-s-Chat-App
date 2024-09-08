import React, { useState } from 'react'
import axios from 'axios'

const Form = ({receiverId, setChats, chats}) => {
    const [message, setMessage] = useState('')
    const userId = window.localStorage.getItem("userId")

    const sendMessage = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/chat/message/send/' + receiverId, 
                {content: message},
                {
                    headers: {
                      'Authorization': `Bearer ${window.localStorage.getItem('chat-token')}`,
                    },
                  }
            );
            setChats([...chats, {content: message, sender: userId}]);
            setMessage('')
        } catch (error) {
            console.log(error);
        }
    }
  

    return (
        <div className="w-full flex items-center p-4 rounded-lg">
            <form onSubmit={sendMessage} className="w-full flex">
                {/* Input Field */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
            
            {/* Send Button */}
            <button
                /*type="submit"*/
                className="ml-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-r-lg transition duration-300"
            >
                Send
            </button>
            </form>
        </div>
    )
}

export default Form
