import React, { createRef } from 'react'
import Channels from '../shared/channels'

const { ipcRenderer } = window
const { showSaveDialog, onShowSaveDialogComplete } = Channels

export default class WriteTextToFileClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = { message: null }
        this.inputRef = createRef()
    }

    componentDidMount() {
        console.log(ipcRenderer);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(onShowSaveDialogComplete, this.onSave)
    }

    render() {
        return (
            <div>
                <button onClick={this.onCreateDialog}>ダイアログ生成</button>
            </div>
        )
    }

    onCreateDialog() {
        const result = ipcRenderer.sendSync('create-dialog', 'ping')
        console.log(result)
    }
}