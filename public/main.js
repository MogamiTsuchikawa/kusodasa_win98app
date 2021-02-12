mainWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
    },
})