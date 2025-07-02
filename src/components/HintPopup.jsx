import React from 'react';

const HintPopup = ({ onClose, selectedPiece, validPlacements = [], gameType = '4x4' }) => {
  const popupSize = gameType === '9x9' ? '450px' : '200px';
  const contentSize = gameType === '9x9' ? '400px' : '180px';
  const fontSize = gameType === '9x9' ? '16px' : '14px';
  const padding = gameType === '9x9' ? '25px' : '15px';

  return (
    <div style={{
      position: 'absolute',
      top: '100px',
      left: '100px',
      width: popupSize,
      height: popupSize,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      borderRadius: '10px',
      backdropFilter: 'blur(2px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: padding,
        borderRadius: '8px',
        maxWidth: contentSize,
        maxHeight: contentSize,
        textAlign: 'center',
        fontSize: fontSize
      }}>
        {selectedPiece ? (
          <>
            <h2 style={{ marginBottom: gameType === '9x9' ? '15px' : '10px', fontSize: gameType === '9x9' ? '20px' : '16px' }}>Hint</h2>
            <p style={{ 
              marginBottom: gameType === '9x9' ? '15px' : '10px', 
              fontSize: gameType === '9x9' ? '16px' : '12px',
              lineHeight: '1.4'
            }}>
              {validPlacements.length > 0 
                ? `${validPlacements.length} valid spot${validPlacements.length === 1 ? '' : 's'} available.`
                : "No valid spots for this duck."}
            </p>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: gameType === '9x9' ? '15px' : '10px', fontSize: gameType === '9x9' ? '20px' : '16px' }}>Hint</h2>
            <p style={{ 
              marginBottom: gameType === '9x9' ? '15px' : '10px', 
              fontSize: gameType === '9x9' ? '16px' : '12px',
              lineHeight: '1.4'
            }}>
              Select a duck first.
            </p>
          </>
        )}
        <button
          onClick={onClose}
          style={{
            padding: gameType === '9x9' ? '8px 16px' : '6px 12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: gameType === '9x9' ? '14px' : '11px'
          }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HintPopup; 