import './title.css'
const { ipcRenderer } = window

const TitleBar = (props) => {
    return (
        <div class="title-bar">
            <div class="title-bar-text">{props.title}</div>
            <div class="title-bar-controls">
                <button aria-label="Close" onClick={exit}></button>
            </div>
        </div>
    )
}

const exit = () => {
    ipcRenderer.send('exit', 'exit')
}

export default TitleBar