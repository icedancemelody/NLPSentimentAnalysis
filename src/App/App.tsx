// 该文件构建应用为一个组件
import './App.css'
import Nav from './Nav/Nav'
import useApp from './useApp'

function App() {
  const { tabs, currentTab, goToTab } = useApp()

  return (
    <div className="App">
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
