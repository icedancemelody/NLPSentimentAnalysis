import './App.css'
import Nav from './Nav/Nav'
import useApp from './useApp'
import TitleBar from './TitleBar/TitleBar'

function App() {
  const { tabs, currentTab, goToTab } = useApp()

  return (
    <div className="App">
      <TitleBar />
      <Nav tabs={tabs} currentTab={currentTab} goToTab={goToTab} />
      <div className="tab-shaper">
        <div className="tab-container">
          {
            tabs.filter((tab, idx) => idx === currentTab)
              .map(tab =>
                <tab.component />
              )
          }
        </div>
      </div>
    </div>
  )
}

export default App
