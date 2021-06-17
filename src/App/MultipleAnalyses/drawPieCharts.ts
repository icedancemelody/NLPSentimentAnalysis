// 该文件为绘制饼图的逻辑部分
import * as echarts from 'echarts'
export default function drawPieCharts(Element: HTMLDivElement | null, data: { value: number, name: string }[]) {
    if (Element === null || data.length === 0) {
        return
    }
    const myChart = echarts.init(Element)
    myChart.setOption({
        tooltip: { trigger: 'item' },
        legend: {
            top: '12px',
            left: 'center'
        },
        series: [{
            type: 'pie',
            radius: ['24px', '60px'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 4,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'outside'
            },
            labelLine: {
                show: false
            },
            data
        }]
    })
}
