const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const greenworks = require('greenworks');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Initialize Steam API if running on Steam
  if (process.platform === 'win32' || process.platform === 'darwin') {
    try {
      if (greenworks.init()) {
        console.log('Steam API initialized successfully');
        // Add Steam-specific features here
      }
    } catch (e) {
      console.log('Steam API initialization failed:', e);
    }
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 