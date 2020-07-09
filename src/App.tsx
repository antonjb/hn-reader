import React from 'react'
import { Status } from './components/Status/Status'
import { Story } from './components/Story/Story'

export const App: React.FC = () => (
    <div>
        <Status />
        <Story
            title="Great CSS Frameworks for Web Developers"
            url="https://insights.dice.com/2020/07/09/5-great-css-frameworks-for-web-developers/"
            author="Jane Smith"
            publicationDate={1594298350}
        />
    </div>
)
App.displayName = 'App'
