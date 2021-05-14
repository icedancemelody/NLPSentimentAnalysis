import React, { useState, useEffect } from 'react'
import drawPieCharts from './drawPieCharts'
import dp from './dataProcesser'
import { multipleAnalysesReturnsElement } from '../../types'
import { fetchResult } from '../../APIs'

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

    async function analyze() {
        if (!(inputFileRef.current?.files?.length === 0)) return
        const dataString = await fetchResult(inputData)
        const data = JSON.parse(dataString)
        setResults(data)
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