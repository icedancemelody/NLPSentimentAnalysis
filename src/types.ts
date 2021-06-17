// 该文件用于数据类型定义
export interface multipleAnalysesReturnsElement {
    commentText: string,
    attitude: string,
    textFeatures: {
        words: [string, string][],
        wordIndexs: [number, number][]
    },
    reply: string
}