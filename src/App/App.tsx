import { useState } from 'react';
import './App.css'
import Nav from './Nav/Nav'
import SingleAnalyses from './SingleAnalyses/SingleAnalyses'
import MultipleAnalyses from './MultipleAnalyses/MultipleAnalyses'

const tabs = [
  {
    name: '单条分析',
    component: SingleAnalyses
  },
  {
    name: '批量分析',
    component: MultipleAnalyses
  }
]

const getEventsHandle = ({ setCurrentTab }: {
  currentTab: string,
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}) => {
  return {
    goToTab: (tab: string) => setCurrentTab(tab)
  }
}

const useApp = () => {
  const [currentTab, setCurrentTab] = useState('单条分析')

  const eventsHandle = getEventsHandle({ currentTab, setCurrentTab })

  return {
    currentTab,
    ...eventsHandle
  }
}

function App() {
  const {
    currentTab,
    goToTab
  } = useApp()
  return (
    <div className="App">
      <Nav
        tabs={tabs}
        currentTab={currentTab}
        goToTab={goToTab}
      />
      {
        tabs.map(tab => {
          const element = tab.component() // 必须调用，否则下级组件的 useState 无法调用导致报错
          return tab.name === currentTab ? element : undefined
        }).filter(item => !(item === undefined))
      }
    </div>
  )
}

export default App
