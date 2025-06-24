import React from 'react';

const HintPopup = ({ onClose, selectedPiece, validPlacements = [] }) => {
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
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center'
      }}>
        {selectedPiece ? (
          <>
            <h2 style={{ marginBottom: '15px' }}>Hint</h2>
            <p style={{ 
              marginBottom: '20px', 
              fontSize: '18px',
              lineHeight: '1.5'
            }}>
              {validPlacements.length > 0 
                ? `You can place this duck in ${validPlacements.length} valid spot${validPlacements.length === 1 ? '' : 's'}.`
                : "This duck can't be placed anywhere valid right now."}
            </p>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: '15px' }}>Hint</h2>
            <p style={{ 
              marginBottom: '20px', 
              fontSize: '18px',
              lineHeight: '1.5'
            }}>
              Select a duck to place, please.
            </p>
          </>
        )}
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

export default HintPopup; 