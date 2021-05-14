import { useState } from 'react';
import SingleAnalyses from './SingleAnalyses/SingleAnalyses'
import MultipleAnalyses from './MultipleAnalyses/MultipleAnalyses'

const tabs = [{
    name: '单条分析',
    component: SingleAnalyses
}, {
    name: '批量分析',
    component: MultipleAnalyses
}]

const getEventsHandle = ({ setCurrentTab }: { setCurrentTab: React.Dispatch<React.SetStateAction<number>> }) => {
    return {
        goToTab: (tabIndex: number) => setCurrentTab(tabIndex)
    }
}

export default function useApp() {
    const [currentTab, setCurrentTab] = useState(0)

    const eventsHandle = getEventsHandle({ setCurrentTab })

    return {
        tabs,
        currentTab,
        ...eventsHandle
    }
}
