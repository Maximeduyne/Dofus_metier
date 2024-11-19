const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: !isDev,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  try {
    if (isDev) {
      console.log('Loading development URL...');
      await mainWindow.loadURL('http://localhost:5174');
      mainWindow.webContents.openDevTools();
    } else {
      console.log('Loading production build...');
      await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
  } catch (error) {
    console.error('Failed to load application:', error);
    app.quit();
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