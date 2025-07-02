import React from 'react';

const MenuButton = ({ onClick, isOpen = false }) => {
  return (
    <button 
      className={`menu-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Menu"
      style={{ 
        position: 'absolute',
        top: '45px', /* Center of the tile: 20px padding + 25px (middle of 50px tile) */
        left: '45px', /* Center of the tile: 20px padding + 25px (middle of 50px tile) */
        width: '40px',
        height: '40px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        fontSize: '24px',
        color: '#000',
        fontWeight: 'bold',
        transform: 'translate(-50%, -50%)' /* Center the button on its position */
      }}
    >
      ☰
    </button>
  );
};

export default MenuButton; 