const { dialog, ipcMain } = require('electron')
const fs = require('fs')
const Channels = require('../src/shared/channels')

const { showSaveDialog, onShowSaveDialogComplete } = Channels

module.exports = function setupIpc() {
    // showSaveDialogのメッセージを受け取る
    ipcMain.on(showSaveDialog, async (event, arg) => {
        const { text, options } = arg
        // ダイアログを開いて、結果を受け取る
        const { canceled, filePath } = await dialog.showSaveDialog({
            ...(options ? options : {}),
        })

        let error
        // 入力とpathをチェックして、ファイルに保存する
        if (text && !canceled && filePath) {
            error = await new Promise(resolve => {
                fs.writeFile(filePath, text, err => resolve(err))
            })
        } else { // 入力が不正のときは、エラーを返す
            error = new Error(
                `Invalid input or operation: ${JSON.stringify({
                    text,
                    canceled,
                    filePath,
                })}`
            )
        }

        // 結果をrendererに返却
        event.reply(onShowSaveDialogComplete, {
            // Error型のままではrenderer側で受け取れなかったので、messageを返す
            errorMessage: error ? error.message : null,
            filePath,
        })
    })
}