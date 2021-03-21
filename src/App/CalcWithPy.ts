export function singleAnalysesWithPy(comment: string) {
    console.log('调用 CalcWithPy.ts:singleAnalysesWithPy')
    return {
        theDimension: '计算结果：评论角度 ' + Math.random().toFixed(4),
        theAttitude: '计算结果：评论态度 ' + Math.random().toFixed(4),
        theTextFeatures: '计算结果：文字特征 ' + Math.random().toFixed(4),
        theReply: '计算结果：自动回复 ' + Math.random().toFixed(4),
    }
}
export function multipleAnalysesWithPy(inputData: string[]) {
    console.log('调用 CalcWithPy.ts:multipleAnalysesWithPy')
    return inputData.map(item => ({
        commentText: item,
        dimension: '角度' + Math.floor(Math.random() * 10),
        attitude: '正/负',
        textFeatures: '文字特征',
        reply: '自动回复'
    }))
}
export interface multipleAnalysesWithPyReturns {
    commentText: string,
    dimension: string,
    attitude: string,
    textFeatures: string,
    reply: string
}