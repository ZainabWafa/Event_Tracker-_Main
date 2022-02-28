import React from 'react'

const Hero = (handleLogout) => {
  return (
    <button className='hero' onClick={handleLogout}>
        Logout
    </button>
  );
};

export default Hero;