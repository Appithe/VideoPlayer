const { app, BrowserWindow } = require('electron');
const electron = require("electron");
const ipc = electron.ipcMain;
const dialog = electron.dialog;

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/index.html')
}

ipc.on('open-dialog', function(event) {
  dialog.showOpenDialog({
    filters: {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']}
  }).then(function(res) {
    console.log(res.filePaths[0]);
    event.sender.send('opened-dialog', String(res.filePaths[0]));
  }).catch(err => {
    console.log(err)
  })
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
