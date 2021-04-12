import React, { useState, useEffect } from 'react'
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

const useIpcRenderer = (setResults: React.Dispatch<React.SetStateAction<multipleAnalysesReturnsElement[]>>) => {
    ipcRenderer.removeAllListeners('multipleAnalysesCompleted')
    ipcRenderer.on('multipleAnalysesCompleted', (event: Event, dataString: string) => {
        const data = JSON.parse(dataString)
        setResults(data.data)
    })
    ipcRenderer.removeAllListeners('multipleAnalysesError')
    ipcRenderer.on('multipleAnalysesError', (event: Event, ErrorString: string) => {
        alert(ErrorString)
    })
}

const defaultInputData: string = ''
const defaultResults: multipleAnalysesReturnsElement[] = []

export default function useMultipleAnalyses() {
    const [results, setResults] = useState(defaultResults)
    const [inputData, setInputData] = useState(defaultInputData)

    const inputFileRef = React.createRef<HTMLInputElement>()
    const dimensionPieChartRef = React.createRef<HTMLDivElement>()
    const attitudePieChartRef = React.createRef<HTMLDivElement>()

    useEffect(() => {
        drawPieCharts(dimensionPieChartRef.current, dp.getDataForDimensionPie(results))
        drawPieCharts(attitudePieChartRef.current, dp.getDataForAttitudePie(results))
    }, [results, dimensionPieChartRef, attitudePieChartRef])

    useIpcRenderer(setResults)

    const analyze = () => {
        inputFileRef.current?.files?.length != 0
            && ipcRenderer.send('multipleAnalyses', inputData)
    }

    const inputFileOnChange = () => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            e.target?.result
                && setInputData(e.target?.result.toString())
        }
        inputFileRef.current?.files
            && inputFileRef.current?.files.length > 0
            && fileReader.readAsText(inputFileRef.current?.files[0])
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