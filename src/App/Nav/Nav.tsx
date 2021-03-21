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
            <ul>
                {
                    tabs.map(tab => (
                        <li className={currentTab === tab.name ? 'selected' : ''}
                            onClick={() => goToTab(tab.name)}
                            key={tab.name}>{tab.name}</li>
                    ))
                }
            </ul>
        </nav >
    )
}