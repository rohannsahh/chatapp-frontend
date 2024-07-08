import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pseudoname, setPseudoname] = useState('');

  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const generatedName = query.get('pseudoname');
    if (generatedName) {
      setPseudoname(generatedName);
    }

    socket.emit('joinRoom', room);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [room ,location.search]);

  const sendMessage = () => {
    if (message.trim()) {
        socket.emit('message', { room, message: `${pseudoname}: ${message}` });
        setMessages((prevMessages) => [...prevMessages, `${pseudoname}: ${message}`]);
        setMessage('');
      }
  };

  const handleEndChat = () => {
    socket.emit('leaveRoom', room);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
     <div className='mb-10 p-4'>
     <h1 className="text-2xl font-bold mb-4 text-center"> Chatting with <span className='bg-blue-200 p-1 my-4 rounded-md'>{pseudoname}</span></h1>
        </div> 
      <div className=' rounded-md shadow-md lg:w-1/2 max-w-xl p-3 border border-gray-300 m-2'>
<div className='flex  justify-between space-x-4'>
    <div className='justify-start items-center'>
    <button
        onClick={() => navigate('/')}
        className="bg-gray-500 text-white p-2 rounded mb-2"
      >
        Back
      </button>
    </div>

      <div className='justify-end items-center space-x-4'>
      <button
        onClick={handleEndChat}
        className="bg-red-500 text-white p-2 rounded mb-2"
      >
        End Chat
      </button>
      <button
      
        className="bg-green-500 text-white p-2 rounded mb-2"
      >
       Report
      </button>
      </div>

    
</div>
</div>

     <div className='bg-gray-100 p-4 m-4 rounded-md shadow-lg lg:w-1/2 max-w-xl'>
         <div className=" p-4 mb-4  h-72 overflow-y">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>
      <div className='flex space-x-2'>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 rounded py-2 px-4 mb-2 w-full "
        placeholder="Type your message"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 rounded mb-2"
      >
        Send
      </button>
      </div>
     
   
    </div>
    </div>
  );
}

export default Chat;
