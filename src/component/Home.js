import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { generatePseudoName } from './generatePseudoname';

const socket = io('http://localhost:8080');

function Home() {
  const navigate = useNavigate();
const [pseudoname , setPseudoname] =useState(null);

  useEffect(() => {
    const generatedName = generatePseudoName();
    setPseudoname(generatedName);

    socket.on('roomJoined', (room) => {
        navigate(`/chat/${room}?pseudoname=${encodeURIComponent(generatedName)}`);
    });

    return () => {
      socket.off('roomJoined');
    };
  }, [navigate]);

  const joinQueue = (type) => {
    socket.emit('joinQueue', type);
  };

  return (
    <>
    <div className="flex flex-col items-center justify-evenly min-h-screen bg-white text-black p-4">
    <h1 className="text-3xl text-center font-bold mb-5">One-on-One Real Time Chat Application</h1>
    <div className="bg-gray-100 shadow-lg p-8 h-80 flex flex-col rounded-md w-full max-w-3xl">
      <div className="mt-3 mb-8">
        <h2 className="text-center text-xl mb-6">Welcome, <span className='bg-green-500 rounded-md p-1'>{pseudoname}</span></h2>
      </div>
     
    
    <div className="flex  items-center space-x-6 justify-center my-4 ">
     <div className='flex flex-col '>
     <button
        onClick={() => joinQueue('venter')}
        className="bg-blue-500 text-white p-2 rounded mb-1"
      >
        Venter
      </button>
      <div className="flex flex-col p-4 text-center items-center">
     
     <p className="m-2">{} Ventors are waiting in queue</p>
   </div>
   </div> 
   <div className='flex flex-col '>
   <button
        onClick={() => joinQueue('listener')}
        className="bg-green-500 text-white p-2 rounded mb-1"
      >
        Listener
      </button>
      <div className="flex flex-col p-4 text-center items-center">
     
     <p className="m-2">{} listners are waiting in queue</p>
   </div>
   </div>
    
    </div>
    </div>
    <p className="text-center max-w-2xl">
      ** Violations of community guidelines, including hate speech, harassment, explicit content, or illegal activities, will result in warnings and may lead to temporary or permanent bans.
    </p>
  </div>

   
    </>
  );
}

export default Home;
