import React from 'react';
import infoButton from '../assets/tiles/ui/Button_info.png';
import helpButton from '../assets/tiles/ui/Button_Help.png';
import undoButton from '../assets/tiles/ui/Button_undo.png';
import undoButtonDisabled from '../assets/tiles/ui/B-Button_undo.png';
import eraseButton from '../assets/tiles/ui/Button_erase.png';
import eraseButtonDisabled from '../assets/tiles/ui/B-button-erase.png';
import hintButton from '../assets/tiles/ui/Button_Hint.png';
import rulerButton from '../assets/tiles/ui/Button_Ruler.png';
import rulerButtonDisabled from '../assets/tiles/ui/B-button-ruler.png';
import prevButton from '../assets/tiles/ui/Button_arrow_L.png';
import prevButtonDisabled from '../assets/tiles/ui/B-button-arrow_L.png';
import nextButton from '../assets/tiles/ui/Button_arrow_R.png';
import nextButtonDisabled from '../assets/tiles/ui/B-button-arrow_R.png';

const ControlButtons = ({
  onInfo,
  onHelp,
  onUndo,
  onErase,
  onHint,
  onRuler,
  onPrevious,
  onNext,
  canUndo,
  canErase,
  canHint,
  canRuler,
  canNavigate,
  hasPreviousPuzzle,
  hasNextPuzzle,
  highlightedButton,
  eraserMode,
  hintMode,
  rulerMode
}) => {
  return (
    <div className="control-buttons">
      <button
        onClick={onInfo}
        className={`control-button ${highlightedButton === 'info' ? 'button-highlight' : ''}`}
      >
        <img
          src={infoButton}
          alt="Info"
        />
      </button>
      <button
        onClick={onHelp}
        className={`control-button ${highlightedButton === 'help' ? 'button-highlight' : ''}`}
      >
        <img
          src={helpButton}
          alt="Help"
        />
      </button>
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`control-button ${highlightedButton === 'undo' ? 'button-highlight' : ''}`}
      >
        <img
          src={canUndo ? undoButton : undoButtonDisabled}
          alt="Undo"
        />
      </button>
      <button
        onClick={onErase}
        disabled={!canErase}
        className={`control-button ${highlightedButton === 'erase' ? 'button-highlight' : ''} ${eraserMode ? 'eraser-active' : ''}`}
      >
        <img
          src={canErase ? eraseButton : eraseButtonDisabled}
          alt="Erase"
        />
      </button>
      <button
        onClick={onHint}
        disabled={!canHint}
        className={`control-button ${highlightedButton === 'hint' ? 'button-highlight' : ''} ${hintMode ? 'hint-active' : ''}`}
      >
        <img
          src={hintButton}
          alt="Hint"
        />
      </button>
      <button
        onClick={onRuler}
        disabled={!canRuler}
        className={`control-button ${highlightedButton === 'ruler' ? 'button-highlight' : ''} ${rulerMode ? 'ruler-active' : ''}`}
      >
        <img
          src={canRuler ? rulerButton : rulerButtonDisabled}
          alt="Ruler"
        />
      </button>
      <button
        onClick={onPrevious}
        disabled={!hasPreviousPuzzle}
        className={`control-button ${highlightedButton === 'previous' ? 'button-highlight' : ''}`}
      >
        <img
          src={hasPreviousPuzzle ? prevButton : prevButtonDisabled}
          alt="Previous"
        />
      </button>
      <button
        onClick={onNext}
        disabled={!hasNextPuzzle}
        className={`control-button ${highlightedButton === 'next' ? 'button-highlight' : ''}`}
      >
        <img
          src={hasNextPuzzle ? nextButton : nextButtonDisabled}
          alt="Next"
        />
      </button>
    </div>
  );
};

export default ControlButtons; 