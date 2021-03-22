const { ipcRenderer } = window.require('electron')

export function singleAnalyses(comment: string) {
    ipcRenderer.invoke('singleAnalyses', comment) // 调用 Python，还需确定接口、修改

    // 此处放置返回值处理逻辑，构造本函数的返回值

    return {
        theDimension: '计算结果：评论角度 ' + Math.random().toFixed(4),
        theAttitude: '计算结果：评论态度 ' + Math.random().toFixed(4),
        theTextFeatures: '计算结果：文字特征 ' + Math.random().toFixed(4),
        theReply: '计算结果：自动回复 ' + Math.random().toFixed(4),
    }
}

export interface multipleAnalysesReturnsElement {
    commentText: string,
    dimension: string,
    attitude: string,
    textFeatures: string,
    reply: string
}

export function multipleAnalyses(inputData: string[]) {
    ipcRenderer.invoke('multipleAnalyses', inputData) // 调用 Python，还需确定接口、修改

    // 此处放置返回值处理逻辑，构造本函数的返回值

    return inputData.map(item => ({
        commentText: item,
        dimension: '角度' + Math.floor(Math.random() * 10),
        attitude: '正/负',
        textFeatures: '文字特征',
        reply: '自动回复'
    }))
}