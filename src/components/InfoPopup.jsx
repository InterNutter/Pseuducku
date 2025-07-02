import React, { useState, useEffect } from 'react';

const InfoPopup = ({ onClose, gameType = '4x4', stage = 1, onStepChange }) => {
  const [currentPopup, setCurrentPopup] = useState(0);
  
  // Info steps for sequential popup - dynamic based on stage
  const infoSteps = [
    {
      title: "Info Button",
      description: "This button shows information about all the other buttons. You can click through each button's explanation or close when you're done.",
      highlight: "info"
    },
    {
      title: "Help Button", 
      description: "This button shows the game instructions and rules. Click it to learn how to play the game.",
      highlight: "help"
    },
    {
      title: "Undo Button",
      description: "This button undoes your last move. You can undo all the way back to the starting condition. It's not available when you haven't made any moves yet.",
      highlight: "undo"
    },
    {
      title: "Erase Button",
      description: "This button removes your last placed piece. You cannot erase pre-placed pieces, and it's not available when you haven't placed any pieces yet.",
      highlight: "erase"
    },
    {
      title: "Hint Button",
      description: stage === 3 
        ? "This button shows where you can place your selected number. It highlights valid placement cells in green. Only works when you have a number selected."
        : "This button shows where you can place your selected duck. It highlights valid placement cells in green. Only works when you have a duck selected.",
      highlight: "hint"
    },
    {
      title: "Ruler Button",
      description: stage === 3
        ? "This button shows lines where your selected number cannot be placed. It highlights restricted cells in red. Only works when you have a number selected."
        : "This button shows lines where your selected duck cannot be placed. It highlights restricted cells in red. Only works when you have a duck selected.",
      highlight: "ruler"
    },
    {
      title: "Previous Button",
      description: "This button lets you go to the previous puzzle in the series. It's not available when you're viewing the first puzzle.",
      highlight: "previous"
    },
    {
      title: "Next Button",
      description: "This button lets you go to the next puzzle in the series. It's not available when you're viewing the last puzzle.",
      highlight: "next"
    },
    {
      title: stage === 3 ? "Number Selection Buttons" : "Duck Selection Buttons",
      description: stage === 3
        ? "These buttons let you select which number you want to place on the board. Click a number button to pick it up, then click on an empty tile to place it."
        : "These buttons let you select which duck you want to place on the board. Click a duck button to pick it up, then click on an empty tile to place it.",
      highlight: "piece-selector" // Special value to highlight all piece selection buttons
    }
  ];

  const handleNext = () => {
    if (currentPopup < infoSteps.length - 1) {
      const newStep = currentPopup + 1;
      setCurrentPopup(newStep);
      if (onStepChange) {
        onStepChange(infoSteps[newStep].highlight);
      }
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentPopup > 0) {
      const newStep = currentPopup - 1;
      setCurrentPopup(newStep);
      if (onStepChange) {
        onStepChange(infoSteps[newStep].highlight);
      }
    }
  };

  const handleDone = () => {
    if (onStepChange) {
      onStepChange(null);
    }
    onClose();
  };

  const popupSize = gameType === '9x9' ? '450px' : '300px';
  const contentSize = gameType === '9x9' ? '410px' : '280px';
  const fontSize = gameType === '9x9' ? '16px' : '12px';
  const padding = gameType === '9x9' ? '20px' : '15px';

  // Notify parent of current step for button highlighting
  useEffect(() => {
    if (onStepChange) {
      console.log('InfoPopup: Setting highlight to:', infoSteps[currentPopup].highlight);
      onStepChange(infoSteps[currentPopup].highlight);
    }
  }, [currentPopup, onStepChange]);

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
            fontSize: gameType === '9x9' ? '18px' : '14px',
            marginTop: 0
          }}>
            {infoSteps[currentPopup].title}
          </h2>
          <p style={{ 
            marginBottom: gameType === '9x9' ? '15px' : '10px', 
            fontSize: gameType === '9x9' ? '14px' : '10px',
            marginTop: 0,
            overflow: 'auto',
            maxHeight: gameType === '9x9' ? '200px' : '150px',
            lineHeight: '1.4'
          }}>
            {infoSteps[currentPopup].description}
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          margin: gameType === '9x9' ? '15px 0' : '10px 0',
          padding: gameType === '9x9' ? '10px 0' : '8px 0',
          borderTop: '1px solid #e9ecef',
          borderBottom: '1px solid #e9ecef',
          flexShrink: 0
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentPopup === 0}
            style={{
              padding: gameType === '9x9' ? '8px 12px' : '6px 8px',
              backgroundColor: currentPopup === 0 ? '#dee2e6' : '#6c757d',
              color: currentPopup === 0 ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPopup === 0 ? 'not-allowed' : 'pointer',
              fontSize: gameType === '9x9' ? '12px' : '10px',
              maxWidth: '30%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Previous
          </button>
          <span style={{ 
            fontWeight: 'bold', 
            color: '#495057', 
            fontSize: gameType === '9x9' ? '14px' : '12px',
            flexShrink: 0,
            margin: '0 8px'
          }}>
            {currentPopup + 1} of {infoSteps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPopup === infoSteps.length - 1}
            style={{
              padding: gameType === '9x9' ? '8px 12px' : '6px 8px',
              backgroundColor: currentPopup === infoSteps.length - 1 ? '#dee2e6' : '#6c757d',
              color: currentPopup === infoSteps.length - 1 ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPopup === infoSteps.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: gameType === '9x9' ? '12px' : '10px',
              maxWidth: '30%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Next
          </button>
        </div>
        
        <button
          onClick={handleDone}
          style={{
            marginTop: gameType === '9x9' ? '15px' : '10px',
            padding: gameType === '9x9' ? '10px 20px' : '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: gameType === '9x9' ? '14px' : '12px',
            fontWeight: 'bold',
            flexShrink: 0
          }}
        >
          I'm Done
        </button>
      </div>
    </div>
  );
};

export default InfoPopup; 