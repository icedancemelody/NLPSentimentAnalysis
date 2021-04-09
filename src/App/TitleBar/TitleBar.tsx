import './TitleBar.css'

const { ipcRenderer } = window.require('electron')

const closeMainWindow = () => {
    ipcRenderer.send('closeMainWindow')
}

export default function Nav() {
    return (
        <div id="title-bar">
            <div className="title">NLP Sentiment Analysis</div>
            <div className="close-window-button" onClick={closeMainWindow}></div>
        </div>
    )
}