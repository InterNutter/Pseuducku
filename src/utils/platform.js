// Simple platform detection
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Platform-specific styles
export const getPlatformSpecificStyles = () => {
  return {
    buttonSize: isMobile() ? '40px' : '50px',
    fontSize: isMobile() ? '12px' : '14px'
  };
}; 