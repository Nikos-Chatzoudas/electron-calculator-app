const { app, BrowserWindow } = require('electron');
function createWindow() {
  const win = new BrowserWindow({
    width: 346,
    height: 632,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable:false
  });

  win.loadFile('index.html');
}
app.whenReady().then(createWindow);