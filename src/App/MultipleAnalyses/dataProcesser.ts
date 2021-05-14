import { multipleAnalysesReturnsElement } from '../../types'

function getDataForDimensionPie(dataArray: multipleAnalysesReturnsElement[]) {
    const dimensions = dataArray.reduce((acc: string[], cur) => {
        return acc.includes(cur.dimension) ? acc : [...acc, cur.dimension]
    }, [])

    return dimensions.map(dimension => ({
        name: dimension,
        value: dataArray.reduce((acc, cur) =>
            cur.dimension === dimension ? acc + 1 : acc, 0
        )
    }))
}

function getDataForAttitudePie(dataArray: multipleAnalysesReturnsElement[]) {
    // 这里放置处理逻辑，下面是预设的返回数据
    const attitudes = dataArray.reduce((acc: string[], cur) => {
        return acc.includes(cur.attitude) ? acc : [...acc, cur.attitude]
    }, [])

    return attitudes.map(attitude => ({
        name: attitude,
        value: dataArray.reduce((acc, cur) =>
            cur.attitude === attitude ? acc + 1 : acc, 0
        )
    }))
}

const dataProcesser = { getDataForAttitudePie, getDataForDimensionPie }

export default dataProcesser