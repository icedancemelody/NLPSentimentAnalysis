import React, { useState } from "react"
const { ipcRenderer } = window.require('electron')

export default function useSingleAnalyses() {
    const [commentText, setCommentText] = useState('等待输入评论')
    const [attitude, setAttitude] = useState('等待输入评论')
    const [dimension, setDimension] = useState('等待输入评论')
    const [reply, setReply] = useState('等待输入评论')
    const [textFeatures, setTextFeatures] = useState('等待输入评论')

    const textAreaRef = React.createRef<HTMLTextAreaElement>()

    const analyze = () => {
        textAreaRef.current?.value
            && ipcRenderer.send('singleAnalyses', textAreaRef.current?.value)
    }

    ipcRenderer.removeAllListeners('singleAnalysesCompleted')
    ipcRenderer.on('singleAnalysesCompleted', (event: Event, dataString: string) => {
        const data = JSON.parse(dataString)
        setCommentText(data.commentText)
        setDimension(data.dimension)
        setAttitude(data.attitude)
        setTextFeatures(data.textFeatures)
        setReply(data.reply)
    })
    ipcRenderer.removeAllListeners('singleAnalysesError')
    ipcRenderer.on('singleAnalysesError', (event: Event, ErrorString: string) => {
        alert(ErrorString)
    })

    return {
        commentText,
        dimension,
        attitude,
        textFeatures,
        reply,
        textAreaRef,
        analyze
    }
}
