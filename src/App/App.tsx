import './App.css'
import Nav from './Nav/Nav'
import useApp from './useApp'

function App() {
  const { tabs, currentTab, goToTab } = useApp()

  return (
    <div className="App">
      <Nav tabs={tabs} currentTab={currentTab} goToTab={goToTab} />
      {
        tabs.map((tab, idx) =>
          idx === currentTab ? (<tab.component />) : undefined)
      }
    </div>
  )
}

export default App
