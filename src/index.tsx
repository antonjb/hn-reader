import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            // Assuming support for the purposes of this demo
            ReactDOM.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>,
                document.getElementById('root')
            )
        })
    })
} else {
    ReactDOM.render(
        <React.StrictMode>
            <div>Requires Service worker support</div>
        </React.StrictMode>,
        document.getElementById('root')
    )
}
