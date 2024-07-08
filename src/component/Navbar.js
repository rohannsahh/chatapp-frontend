import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <Link to="/" className="text-white mr-4">Home</Link>
    </nav>
  );
}

export default Navbar;
