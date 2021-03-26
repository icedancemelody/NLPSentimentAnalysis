import './Nav.css'
interface NavProps {
    tabs: { name: string, component: () => JSX.Element }[]
    currentTab: string,
    goToTab: (to: string) => void
}

export default function Nav({
    tabs,
    currentTab,
    goToTab
}: NavProps) {
    return (
        <nav>
            <ul data-selected-index={tabs.map((tab, idx) => tab.name === currentTab ? (idx + 1) : '').join('')}>
                {
                    tabs.map(tab => (
                        <li onClick={() => goToTab(tab.name)}
                            key={tab.name}>{tab.name}
                        </li>
                    ))
                }
            </ul>
        </nav >
    )
}