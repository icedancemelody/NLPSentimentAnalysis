import React, { useState } from "react"
import { fetchResults } from '../../APIs'

export default function useSingleAnalyses() {
    const [commentText, setCommentText] = useState('等待输入评论')
    const [attitude, setAttitude] = useState('等待输入评论')
    const [textFeatures, setTextFeatures] = useState({} as { words: [string, string][], wordIndexs: [number, number][] })
    const [reply, setReply] = useState('等待输入评论')

    const textAreaRef = React.createRef<HTMLTextAreaElement>()

    async function analyze() {
        if (!(textAreaRef.current?.value)) return
        const data = await fetchResults([textAreaRef.current?.value || ''])
        setCommentText(data[0].commentText)
        setAttitude(data[0].attitude)
        setTextFeatures(data[0].textFeatures)
        setReply(data[0].reply)
    }

    return {
        commentText,
        attitude,
        reply,
        textAreaRef,
        textFeatures,
        analyze
    }
}
