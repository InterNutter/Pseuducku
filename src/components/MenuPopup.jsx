import React, { useState } from 'react';
import './MenuPopup.css';

const MenuPopup = ({ isOpen, onClose, onToggleSound, onSelectStage, onSelectDifficulty, onAbout, onCredits, onSupport, isSoundMuted, currentStage, currentDifficulty }) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [showStageSubmenu, setShowStageSubmenu] = useState(false);
  const [showDifficultySubmenu, setShowDifficultySubmenu] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getSoundStatusText = () => {
    return isSoundMuted ? "Sounds won't play" : "Sounds will play";
  };

  const stageOptions = [
    { id: 1, name: 'Stage One', description: 'Play with ducks on a 4x4 game board' },
    { id: 2, name: 'Stage Two', description: 'Play with ducks on a 9x9 game board' },
    { id: 3, name: 'Stage Three', description: 'Play with ducks and numbers on a 9x9 game board' }
  ];

  const difficultyOptions = [
    { id: 'tutorial', name: 'Tutorial', description: 'Learn the basics with guided hints' },
    { id: 'easy', name: 'Easy', description: 'Simple puzzles with many pre-placed pieces' },
    { id: 'medium', name: 'Medium', description: 'Balanced puzzles with moderate challenge' },
    { id: 'hard', name: 'Hard', description: 'Complex puzzles with few pre-placed pieces' }
  ];

  const handleStageSelect = (stageId) => {
    onSelectStage(stageId);
    setShowStageSubmenu(false);
  };

  const handleDifficultySelect = (difficultyId) => {
    onSelectDifficulty(difficultyId);
    setShowDifficultySubmenu(false);
  };

  return (
    <div className="menu-popup-backdrop" onClick={handleBackdropClick}>
      <div className="menu-popup">
        <div className="menu-header">
          <h3>Menu</h3>
          <button className="menu-close-button" onClick={onClose}>×</button>
        </div>
        <div className="menu-options">
          <button 
            className="menu-option" 
            onClick={onToggleSound}
            onMouseEnter={() => {
              console.log('Mouse entered Toggle Sound, setting hoveredOption to sound');
              setHoveredOption('sound');
            }}
            onMouseLeave={() => {
              console.log('Mouse left Toggle Sound, clearing hoveredOption');
              setHoveredOption(null);
            }}
          >
            Toggle Sound
            {hoveredOption === 'sound' && (
              <div className="menu-option-status">
                {getSoundStatusText()}
              </div>
            )}
          </button>
          
          <div className="menu-option-container">
            <button 
              className="menu-option" 
              onClick={() => setShowStageSubmenu(!showStageSubmenu)}
              onMouseEnter={() => setHoveredOption('stage')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              Select Stage
              {hoveredOption === 'stage' && (
                <div className="menu-option-status">
                  Choose your game stage
                </div>
              )}
            </button>
            
            {showStageSubmenu && (
              <div className="submenu">
                {stageOptions.map((stage) => (
                  <button
                    key={stage.id}
                    className={`submenu-option ${currentStage === stage.id ? 'current-stage' : ''}`}
                    onClick={() => handleStageSelect(stage.id)}
                    onMouseEnter={() => setHoveredOption(`stage-${stage.id}`)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    {stage.name}
                    {hoveredOption === `stage-${stage.id}` && (
                      <div className="submenu-option-status">
                        {stage.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="menu-option-container">
            <button 
              className="menu-option" 
              onClick={() => setShowDifficultySubmenu(!showDifficultySubmenu)}
              onMouseEnter={() => setHoveredOption('difficulty')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              Select Difficulty
              {hoveredOption === 'difficulty' && (
                <div className="menu-option-status">
                  Choose your difficulty
                </div>
              )}
            </button>
            
            {showDifficultySubmenu && (
              <div className="submenu">
                {difficultyOptions.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    className={`submenu-option ${currentDifficulty === difficulty.id ? 'current-difficulty' : ''}`}
                    onClick={() => handleDifficultySelect(difficulty.id)}
                    onMouseEnter={() => setHoveredOption(`difficulty-${difficulty.id}`)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    {difficulty.name}
                    {hoveredOption === `difficulty-${difficulty.id}` && (
                      <div className="submenu-option-status">
                        {difficulty.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="menu-option" onClick={onAbout}>
            About
          </button>
          <button className="menu-option" onClick={onCredits}>
            Credits
          </button>
          <button className="menu-option" onClick={onSupport}>
            Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup; 