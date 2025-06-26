import React, { useState, useEffect } from 'react';
import soundManager from '../utils/soundManager';

const SoundSettings = ({ isOpen, onClose }) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize sound manager when component mounts
    soundManager.init();
    
    // Set initial state
    setVolume(soundManager.getVolume());
    setIsMuted(soundManager.isMuted());
  }, []);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
    
    // Play a test sound if not muted
    if (!isMuted && newVolume > 0) {
      soundManager.playButtonClick();
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = soundManager.toggleMute();
    setIsMuted(newMutedState);
    
    // Play a test sound when unmuting
    if (!newMutedState) {
      soundManager.playButtonClick();
    }
  };

  const handleTestSound = () => {
    if (!isMuted) {
      soundManager.playLineComplete();
    }
  };

  if (!isOpen) return null;

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
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ 
          marginBottom: '25px', 
          color: '#2c3e50',
          fontSize: '24px'
        }}>
          🎵 Sound Settings
        </h2>
        
        {/* Volume Control */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#34495e'
          }}>
            Volume: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: '#ddd',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Mute Toggle */}
        <div style={{ marginBottom: '25px' }}>
          <button
            onClick={handleMuteToggle}
            style={{
              padding: '12px 24px',
              backgroundColor: isMuted ? '#e74c3c' : '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            {isMuted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>

        {/* Test Sound Button */}
        <div style={{ marginBottom: '25px' }}>
          <button
            onClick={handleTestSound}
            disabled={isMuted}
            style={{
              padding: '10px 20px',
              backgroundColor: isMuted ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isMuted ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: isMuted ? 0.6 : 1
            }}
          >
            🦆 Test Quack Sound
          </button>
        </div>

        {/* Sound Info */}
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#6c757d',
          lineHeight: '1.5'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>Sound Effects:</strong>
          </p>
          <ul style={{ 
            margin: '0', 
            paddingLeft: '20px',
            textAlign: 'left'
          }}>
            <li>🎵 UI sounds for opening/closing popups</li>
            <li>🔊 Button clicks for game actions</li>
            <li>🦆 Quack sounds for invalid placements</li>
            <li>🎉 Hooray quacks for line/column completion</li>
            <li>🏆 Victory quack for puzzle completion</li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '12px 30px',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SoundSettings; 