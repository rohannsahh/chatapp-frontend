import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Chat from './component/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:room" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
