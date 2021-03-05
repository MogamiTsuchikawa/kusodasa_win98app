const electron = require("electron");
const ipcMain = electron.ipcMain;
const app = electron.app || require('app');
const BrowserWindow = electron.BrowserWindow || require('browser-window');
const { dialog } = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({
        frame: false,
        width: 700,
        height: 580,
        webPreferences: {
            nodeIntegration: false,
            preload: `${__dirname}/preload.js`,
        },
    })

    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('create-dialog', (event, arg) => {
    console.log(arg)
    // console.log(remote);
    // const win = remote.getCurrentWindow();
    const data = {
        type: 'warning',
        buttons: ['OK'],
        title: 'タイトル',
        message: 'メッセージ',
        detail: '詳細メッセージ'
    }
    dialog.showMessageBox(data);
    event.returnValue = 'pong';
})
ipcMain.on('exit', () => {
    mainWindow.close();
})