import { multipleAnalysesReturnsElement } from './useMultipleAnalyses'
const dataProcesser = {
    getDataForDimensionPie: (dataArray: multipleAnalysesReturnsElement[]) => {
        // 这里放置处理逻辑，下面是预设的返回数据
        return [
            { value: 1048, name: '外观' },
            { value: 735, name: '手感' },
            { value: 580, name: '速度' },
            { value: 484, name: '服务' },
            { value: 300, name: '价格' }
        ]
    },
    getDataForAttitudePie: (dataArray: multipleAnalysesReturnsElement[]) => {
        // 这里放置处理逻辑，下面是预设的返回数据
        return [
            { value: 1048, name: '正面' },
            { value: 735, name: '负面' }
        ]
    },
}
export default dataProcesser