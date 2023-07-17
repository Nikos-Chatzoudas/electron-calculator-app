const { app, BrowserWindow } = require("electron");
const path = require("path"); // Require the 'path' module to manipulate file paths

function createWindow() {
  const win = new BrowserWindow({
    width: 320,
    height: 488,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false,
    icon: path.join(__dirname, "icon.png"), // Set the icon path here
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
