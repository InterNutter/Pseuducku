import React, { useState } from 'react';

const InfoPopup = ({ onClose }) => {
  const [currentPopup, setCurrentPopup] = useState(0);
  
  const popups = [
    {
      title: "Info Button",
      text: "This button tells you what all these game buttons do."
    },
    {
      title: "Help Button",
      text: "This button shows you how to play the game."
    },
    {
      title: "Undo Button",
      text: "This button takes back your last move."
    },
    {
      title: "Erase Button",
      text: "This button clears all the pieces you placed."
    },
    {
      title: "Hint Button",
      text: "This button gives you a hint about where to put a piece."
    },
    {
      title: "Ruler Button",
      text: "This button helps you check if your pieces are in the right place."
    },
    {
      title: "Arrow Buttons",
      text: "These buttons let you go to the next or previous puzzle."
    }
  ];

  const handleNext = () => {
    if (currentPopup < popups.length - 1) {
      setCurrentPopup(currentPopup + 1);
    } else {
      onClose();
    }
  };

  const handleDone = () => {
    onClose();
  };

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
        <h2 style={{ marginBottom: '15px' }}>{popups[currentPopup].title}</h2>
        <p style={{ marginBottom: '20px', fontSize: '18px' }}>{popups[currentPopup].text}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={handleNext}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Next
          </button>
          <button
            onClick={handleDone}
            style={{
              padding: '10px 20px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            OK I'm done
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup; 