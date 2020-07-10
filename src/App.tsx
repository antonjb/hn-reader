import React, { Fragment } from 'react'
import { Status } from './components/Status/Status'
import { StoryList } from './components/StoryList/StoryList'

export const App: React.FC = () => (
    <Fragment>
        <header>
            <Status />
            <h1>Hacker News Reader</h1>
        </header>
        <main>
            <StoryList />
        </main>
    </Fragment>
)

App.displayName = 'App'
