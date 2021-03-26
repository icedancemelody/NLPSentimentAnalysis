import React, { useState, useEffect } from 'react'
import './MultipleAnalyses.css'
import drawPieCharts from './drawPieCharts'
import dp from './dataProcesser'

const { ipcRenderer } = window.require('electron')

export interface multipleAnalysesReturnsElement {
    commentText: string,
    dimension: string,
    attitude: string,
    textFeatures: string,
    reply: string
}

const introParagraphs = [
    '该页面利用人工智能分析[某行业]产品的评论。需要 Python 环境。',
    '导入数据文件，点击开始分析按钮，将输出各条评论对应的评论角度、评论态度、文字特征、人工智能给出的自动回复，以及总体的统计数据。',
    '数据文件要求为 JSON 文件，格式为：{ "data" : string[] } 。',
    '评论角度分为[n]方面，分别是：string[]。',
    '评论态度分为两种：正面和负面'
]

const defaultInputData: string = ''
const defaultResults: multipleAnalysesReturnsElement[] = []

const useMultipleAnalyses = () => {
    const [results, setResults] = useState(defaultResults)
    const [inputData, setInputData] = useState(defaultInputData)

    const inputFileRef = React.createRef<HTMLInputElement>()
    const dimensionPieChartRef = React.createRef<HTMLDivElement>()
    const attitudePieChartRef = React.createRef<HTMLDivElement>()

    useEffect(() => {
        drawPieCharts(dimensionPieChartRef.current, dp.getDataForDimensionPie(results))
        drawPieCharts(attitudePieChartRef.current, dp.getDataForAttitudePie(results))
    }, [results, dimensionPieChartRef, attitudePieChartRef])

    const analyze = () => ipcRenderer.send('multipleAnalyses', inputData)

    ipcRenderer.removeAllListeners('multipleAnalysesCompleted')
    ipcRenderer.on('multipleAnalysesCompleted', (event: Event, dataString: string) => {
        const data = JSON.parse(dataString)
        setResults(data.data)
    })
    ipcRenderer.removeAllListeners('multipleAnalysesError')
    ipcRenderer.on('multipleAnalysesError', (event: Event, ErrorString: string) => {
        alert(ErrorString)
    })

    const inputFileOnChange = () => {
        const fileReader = new FileReader()

        fileReader.onload = (e) =>
            e.target?.result && setInputData(e.target?.result.toString())

        if (inputFileRef.current?.files && inputFileRef.current?.files.length > 0) {
            fileReader.readAsText(inputFileRef.current?.files[0])
        }
    }

    return {
        results,
        inputFileRef,
        dimensionPieChartRef,
        attitudePieChartRef,
        analyze,
        inputFileOnChange
    }
}

export default function MultipleAnalyses() {
    const {
        results,
        inputFileRef,
        dimensionPieChartRef,
        attitudePieChartRef,
        analyze,
        inputFileOnChange
    } = useMultipleAnalyses()

    return (
        <main id="multiple-analyses" key="多条分析">

            <article className="introduction">
                <h1>使用说明</h1>
                {
                    introParagraphs.map((item, index) =>
                        (<p key={index}>{item}</p>)
                    )
                }
            </article>
            <article className="import-area">
                <h1>导入文件</h1>
                <p>
                    <input type="file" ref={inputFileRef} onChange={inputFileOnChange} />
                </p>
                <button className="ms-button primary" onClick={analyze}>开始分析</button>
            </article>
            <article className="statistical-results-area">
                <h1>统计结果</h1>
                <section>
                    <h2>各角度评论占比</h2>
                    <p style={{ display: results.length === 0 ? 'inline' : 'none' }}>
                        {'等待导入数据'}
                    </p>
                    <div
                        id="dimensionPieChart"
                        ref={dimensionPieChartRef}
                        style={{ height: '300px', width: '250px', display: results.length === 0 ? 'none' : 'block' }}>
                    </div>
                </section>
                <section>
                    <h2>各态度评论占比</h2>
                    <p style={{ display: results.length === 0 ? 'inline' : 'none' }}>
                        {'等待导入数据'}
                    </p>
                    <div
                        id="attitudePieChart"
                        ref={attitudePieChartRef}
                        style={{ height: '300px', width: '250px', display: results.length === 0 ? 'none' : 'block' }}>
                    </div>
                </section>
            </article>
            <article className="results-area">
                <h1>各条评论分析结果</h1>
                <p style={{ display: results.length === 0 ? 'inline' : 'none' }}>
                    {'等待导入数据'}
                </p>
                {
                    results.map((result, index) => (
                        <article className="result-item" key={index}>
                            <h2 className="result-item-commentText">评论原文</h2>
                            <p>{result.commentText}</p>
                            <h2 className="result-item-dimension">评论角度</h2>
                            <p>{result.dimension}</p>
                            <h2 className="result-item-attitude">评论态度</h2>
                            <p>{result.attitude}</p>
                            <h2 className="result-item-textFeatures">文字特征</h2>
                            <p>{result.textFeatures}</p>
                            <h2 className="result-item-reply">自动回复</h2>
                            <p>{result.reply}</p>
                        </article>
                    ))
                }
            </article>
        </main>
    )
}