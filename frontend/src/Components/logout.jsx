import React from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Logout = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
  };

  return (<div>
    <button onClick={handleLogout}>
      <RiLogoutBoxRLine />
    </button>
    Logout
    </div>
  );
};

export default Logout;
