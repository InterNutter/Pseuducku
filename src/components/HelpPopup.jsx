import React from 'react';

const HelpPopup = ({ onClose, gameType = '4x4' }) => {
  const popupSize = gameType === '9x9' ? '450px' : '300px';
  const contentSize = gameType === '9x9' ? '410px' : '280px';
  const fontSize = gameType === '9x9' ? '16px' : '12px';
  const padding = gameType === '9x9' ? '20px' : '15px';

  return (
    <div style={{
      position: 'absolute',
      top: gameType === '9x9' ? '100px' : '100px',
      left: gameType === '9x9' ? '100px' : '100px',
      width: popupSize,
      height: popupSize,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      borderRadius: '10px',
      backdropFilter: 'blur(2px)',
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: padding,
        borderRadius: '8px',
        width: contentSize,
        height: contentSize,
        textAlign: 'center',
        fontSize: fontSize,
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h2 style={{ 
            marginBottom: gameType === '9x9' ? '15px' : '10px', 
            fontSize: gameType === '9x9' ? '20px' : '16px',
            marginTop: 0
          }}>
            How to Play
          </h2>
          <p style={{ 
            marginBottom: gameType === '9x9' ? '15px' : '10px', 
            fontSize: gameType === '9x9' ? '16px' : '12px',
            lineHeight: '1.4',
            marginTop: 0,
            overflow: 'auto',
            maxHeight: gameType === '9x9' ? '200px' : '150px'
          }}>
            Fill all pens with ducks. Ducks can see in straight lines and don't like seeing their copycat. Or is that 'copyduck'?
          </p>
        </div>
        
        <button
          onClick={onClose}
          style={{
            marginTop: gameType === '9x9' ? '15px' : '10px',
            padding: gameType === '9x9' ? '10px 20px' : '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: gameType === '9x9' ? '14px' : '12px',
            fontWeight: 'bold',
            flexShrink: 0
          }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HelpPopup; 