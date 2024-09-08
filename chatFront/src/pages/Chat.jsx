import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Form from '../components/Form';

const Chat = ({ socket }) => {
  const [chatInitiated, setChatInitiated] = useState(false);
  const [chats, setChats] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const userId = window.localStorage.getItem("userId");

  // Ref to the chat container for auto-scrolling
  const chatContainerRef = useRef(null);

  // Join the chat room when the component mounts
  useEffect(() => {
    socket.emit('join', userId);
  }, [socket, userId]);

  // Handle new incoming messages
  useEffect(() => {
    const handleNewMessages = (message) => {
      if (receiverId === message.sender) {
        setChats((prevChats) => [...prevChats, { sender: message.sender, content: message.content }]);
      }
    };

    socket.on('newMessage', handleNewMessages);

    // Clean up the event listener
    return () => {
      socket.off('newMessage', handleNewMessages);
    };
  }, [socket, receiverId]);

  // Scroll to the bottom whenever the chats or chat initiation changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats, chatInitiated]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg.jfif')" }} // Background image from Home
    >
      {/* Overlay for blur effect */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Chat Container */}
      <div className="relative z-10 w-11/12 max-w-6xl h-[calc(100vh-40px)] rounded-lg flex shadow-2xl bg-white bg-opacity-20 backdrop-blur-lg backdrop-filter">
        {/* Sidebar */}
        <div className="w-1/4 h-full">
          <Sidebar
            setChatInitiated={setChatInitiated}
            setChats={setChats}
            setReceiverId={setReceiverId}
            selectedUserId={selectedUserId} // Pass the selected user ID to Sidebar
            setSelectedUserId={setSelectedUserId} // Function to set selected user
          />
        </div>

        {/* Chat Section */}
        <div className="w-3/4 h-full flex flex-col p-6">
          {chatInitiated ? (
            <div className="flex flex-col justify-between h-full">
              {/* Chat messages container */}
              <div
                ref={chatContainerRef}
                className="overflow-y-auto flex-1 mb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
              >
                {/* Map over chats and display messages */}
                {chats &&
                  chats.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex px-4 ${
                        chat.sender === userId ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`p-3 my-2 rounded-lg max-w-xs break-words ${
                          chat.sender === userId
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-black'
                        }`}
                      >
                        {chat.content}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Input form for sending messages */}
              <div className="w-full">
                <Form receiverId={receiverId} setChats={setChats} chats={chats} />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <h2 className="text-4xl font-extrabold text-white text-center">
                Start a Chat
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
