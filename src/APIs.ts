// 该文件用于定义应用所需网络请求接口
import { multipleAnalysesReturnsElement } from './types'

const baseURL = 'http://47.102.203.5'

export async function fetchResults(comments: string[]) {
    const response = await fetch(`${baseURL}/analyze`, {
        method: 'POST',
        body: JSON.stringify(comments)
    })
    const responseJson = await response.json()
    const data = responseJson.data
    return data as multipleAnalysesReturnsElement[]
}