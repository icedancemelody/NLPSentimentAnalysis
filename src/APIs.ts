import { multipleAnalysesReturnsElement } from './types'
const baseURL = 'http://localhost:3001'

export async function fetchResults(comments: string[]) {
    const response = await fetch(`${baseURL}/analyze`, {
        method: 'POST',
        body: JSON.stringify(comments)
    })
    const responseJson = await response.json()
    const data = responseJson.data
    return data as multipleAnalysesReturnsElement[]
}