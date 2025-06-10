import React from 'react';

const HelpPopup = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '15px' }}>How to Play</h2>
        <p style={{ 
          marginBottom: '20px', 
          fontSize: '18px',
          lineHeight: '1.5'
        }}>
          The goal of each game is to fill all the pens with ducks. The ducks can see all the ducks inside their pen, and they can see in a straight line left and right, and a straight line up and down. Each duck does not like to see its copycat. Or is that 'copyduck'?
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HelpPopup; 