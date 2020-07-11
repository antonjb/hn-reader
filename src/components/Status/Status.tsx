import React from 'react'
import './Status.css'

export const Status: React.FC = () => {
    const [status, setStatus] = React.useState(navigator.onLine)

    React.useEffect(() => {
        function setStatusHandler() {
            setStatus(navigator.onLine)
        }

        window.addEventListener('online', setStatusHandler)
        window.addEventListener('offline', setStatusHandler)
        setStatusHandler()

        return () => {
            window.removeEventListener('online', setStatusHandler)
            window.removeEventListener('offline', setStatusHandler)
        }
    }, [])

    return (
        <div
            className={`status-indicator ${
                status ? 'status-indicator-online' : 'status-indicator-offline'
            }`}
        >
            {status ? 'online' : 'offline'}
        </div>
    )
}
Status.displayName = 'Status'
