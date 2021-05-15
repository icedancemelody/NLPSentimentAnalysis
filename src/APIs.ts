const baseURL = 'http://localhost:3001'

export async function fetchResult(comment: string) {
    const response = await fetch(`${baseURL}/analyze`, {
        method: 'POST',
        body: JSON.stringify({})
    })
    const responseJson = await response.json()
    const data = responseJson.data
    return data
}