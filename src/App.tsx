import React from 'react'
import { Status } from './components/Status/Status'
import { Story } from './components/Story/Story'

export const App: React.FC = () => (
    <div>
        <Status />
        <Story storyId={23789923} />
        <Story storyId={23789886} />
        <Story storyId={23789883} />
    </div>
)
App.displayName = 'App'
