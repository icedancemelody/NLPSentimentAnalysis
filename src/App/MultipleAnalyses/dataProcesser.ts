// 该文件为为绘制饼图做的数据预处理逻辑
import { multipleAnalysesReturnsElement } from '../../types'

function getDataForDimensionPie(results: multipleAnalysesReturnsElement[]) {
    const dimensions = results.map(result =>
        result.textFeatures.words.map(word =>
            word[1]
        )
    ).flat()

    const pieData = dimensions.reduce((acc, cur, idx, arr) => {
        for (let i in acc) {
            if (acc[i].name === cur) {
                acc[i].value++
                return acc
            }
        }
        return [...acc, { name: cur, value: 1 }]
    }, [] as { name: string, value: number }[])
    return pieData
}

function getDataForAttitudePie(dataArray: multipleAnalysesReturnsElement[]) {
    // 这里放置处理逻辑，下面是预设的返回数据
    const attitudes = dataArray.reduce((acc: string[], cur) => (
        acc.includes(cur.attitude) ? acc : [...acc, cur.attitude]
    ), [])

    return attitudes.map(attitude => ({
        name: attitude,
        value: dataArray.reduce((acc, cur) =>
            cur.attitude === attitude ? acc + 1 : acc, 0
        )
    }))
}

const dataProcesser = {
    getDataForAttitudePie,
    getDataForDimensionPie
}

export default dataProcesser