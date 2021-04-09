import './Nav.css'

const { ipcRenderer } = window.require('electron')

interface NavProps {
    tabs: { name: string, component: () => JSX.Element }[]
    currentTab: number,
    goToTab: (to: number) => void
}

const exitTheApp = () => {
    ipcRenderer.send('exitTheApp')
}

export default function Nav({ tabs, currentTab, goToTab }: NavProps) {
    return (
        <nav>
            <ul data-selected-index={currentTab + 1}>
                {
                    tabs.map((tab, idx) => (
                        <li onClick={() => goToTab(idx)} key={idx}>
                            {tab.name}
                        </li>
                    ))
                }
            </ul>
        </nav >
    )
}