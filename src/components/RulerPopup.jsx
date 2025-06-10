import React from 'react';

const RulerPopup = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      color: 'white',
      textAlign: 'center',
      zIndex: 1000,
      minWidth: '200px'
    }}>
      <p style={{ margin: '0 0 20px 0', fontSize: '18px' }}>
        Select a duck to place, please.
      </p>
      <button
        onClick={onClose}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Got it!
      </button>
    </div>
  );
};

export default RulerPopup; 