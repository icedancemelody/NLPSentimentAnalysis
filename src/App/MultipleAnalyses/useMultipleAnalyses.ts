import React, { useState, useEffect } from 'react'
import drawPieCharts from './drawPieCharts'
import dp from './dataProcesser'
import { multipleAnalysesReturnsElement } from '../../types'
import { fetchResults } from '../../APIs'

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
        setResults(() => [])
        if (inputFileRef.current?.files?.length === 0) return
        const comments = JSON.parse(inputData).data as string[]
        for (let i in comments) {
            let newResult = await fetchResults([comments[i]])
            setResults(old => [...old, newResult[0]])
        }
    }

    function inputFileOnChange() {
        if (!(inputFileRef.current?.files)) return
        if (!(inputFileRef.current?.files.length > 0)) return

        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            if (!(e.target?.result)) return
            setInputData(e.target.result.toString())
        }
        fileReader.readAsText(inputFileRef.current?.files[0])
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