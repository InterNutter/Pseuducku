// Sound Manager for Pseuducku game
class SoundManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.volume = 0.5;
    this.loaded = false;
  }

  // Initialize and preload all sounds
  async init() {
    try {
      // Define all sound files with their specific purposes
      const soundFiles = {
        // UI sounds
        uiOpen: '/sounds/UI_Quirky7.mp3',           // Opening popups and menus, activating UI buttons
        uiClose: '/sounds/UI_Quirky8.mp3',          // Closing popups and menus, de-activating UI buttons
        buttonClick: '/sounds/Lamp-Switch_Off.mp3', // General button clicks (except Next/Previous)
        navigationClick: '/sounds/Lamp-Switch_On.mp3', // Next and Previous buttons only
        
        // Game action sounds
        invalidPlacement: '/sounds/Uh_oh_quack.mp3', // Invalid duck placement
        lineComplete: '/sounds/Hooray_quack.mp3',    // Line, column, or cell completion
        puzzleComplete: '/sounds/Victory_quack.mp3'  // Entire puzzle completion
      };

      // Preload all sounds
      for (const [name, path] of Object.entries(soundFiles)) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].volume = this.volume;
        this.sounds[name].preload = 'auto';
        
        // Add error handling for missing files
        this.sounds[name].onerror = () => {
          console.warn(`Failed to load sound: ${name} from ${path}`);
        };
      }

      this.loaded = true;
      console.log('Sound manager initialized with custom sounds');
    } catch (error) {
      console.error('Error initializing sound manager:', error);
    }
  }

  // Play a sound effect
  play(soundName) {
    if (this.isMuted || !this.loaded || !this.sounds[soundName]) {
      return;
    }

    try {
      // Clone the audio to allow overlapping sounds
      const sound = this.sounds[soundName].cloneNode();
      sound.volume = this.volume;
      sound.play().catch(error => {
        console.warn(`Failed to play sound ${soundName}:`, error);
      });
    } catch (error) {
      console.warn(`Error playing sound ${soundName}:`, error);
    }
  }

  // UI Sounds
  playUIOpen() {
    this.play('uiOpen');
  }

  playUIClose() {
    this.play('uiClose');
  }

  // Button Sounds
  playButtonClick() {
    this.play('buttonClick');
  }

  playNavigationClick() {
    this.play('navigationClick');
  }

  // Game Action Sounds
  playInvalidPlacement() {
    this.play('invalidPlacement');
  }

  playLineComplete() {
    this.play('lineComplete');
  }

  playPuzzleComplete() {
    this.play('puzzleComplete');
  }

  // Legacy method names for backward compatibility
  playQuack() {
    this.playButtonClick(); // Default to button click for general actions
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Set volume (0.0 to 1.0)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    // Update volume for all loaded sounds
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume;
    });
  }

  // Get current volume
  getVolume() {
    return this.volume;
  }

  // Check if muted
  isMuted() {
    return this.isMuted;
  }
}

// Create and export a singleton instance
const soundManager = new SoundManager();

export default soundManager; 