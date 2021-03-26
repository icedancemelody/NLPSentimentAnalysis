import * as echarts from 'echarts'
export default function drawPieCharts(Element: HTMLDivElement | null, data: { value: number, name: string }[]) {
    if (Element === null || data.length === 0) {
        return
    }
    const myChart = echarts.init(Element)
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            type: 'plain'
        },
        series: [{
            type: 'pie',
            radius: ['20%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 4,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'outside'
            },
            labelLine: {
                show: true
            },
            data
        }]
    }
    myChart.setOption(option)
}
