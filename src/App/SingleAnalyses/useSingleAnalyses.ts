import React, { useState } from "react"
const { ipcRenderer } = window.require('electron')

export default function useSingleAnalyses() {
    const [dimension, setDimension] = useState('等待输入评论')
    const [attitude, setAttitude] = useState('等待输入评论')
    const [reply, setReply] = useState('等待输入评论')
    const [textFeatures, setTextFeatures] = useState('等待输入评论')

    const textAreaRef = React.createRef<HTMLTextAreaElement>()

    const analyze = () => {
        textAreaRef.current?.value
            && ipcRenderer.send('singleAnalyses', JSON.stringify({ comment: textAreaRef.current?.value }))
    }

    ipcRenderer.removeAllListeners('singleAnalysesCompleted')
    ipcRenderer.on('singleAnalysesCompleted', (event: Event, dataString: string) => {
        const data = JSON.parse(dataString)
        setDimension(data.theDimension)
        setAttitude(data.theAttitude)
        setTextFeatures(data.theTextFeatures)
        setReply(data.theReply)
    })
    ipcRenderer.removeAllListeners('singleAnalysesError')
    ipcRenderer.on('singleAnalysesError', (event: Event, ErrorString: string) => {
        alert(ErrorString)
    })

    return {
        dimension,
        attitude,
        textFeatures,
        reply,
        textAreaRef,
        analyze
    }
}
