import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Status } from './components/Status/Status'
import { StoryList } from './components/StoryList/StoryList'
import './App.css'

export const App: React.FC = () => (
    <HelmetProvider>
        <Helmet>
            <link rel="preconnect" href="https://hacker-news.firebaseio.com" />
        </Helmet>
        <header>
            <Status />
            <h1>Hacker News Reader</h1>
        </header>
        <main>
            <StoryList />
        </main>
    </HelmetProvider>
)

App.displayName = 'App'
