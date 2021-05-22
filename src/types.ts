export interface multipleAnalysesReturnsElement {
    commentText: string,
    attitude: string,
    textFeatures: {
        words: [string, string][],
        wordIndexs: [number, number][]
    },
    reply: string
}