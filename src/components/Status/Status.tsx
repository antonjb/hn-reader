import React from 'react'

export const Status: React.FC = () => {
    const [status, setStatus] = React.useState(navigator.onLine)

    React.useEffect(() => {
        function setStatusHandler() {
            setStatus(navigator.onLine)
        }

        window.addEventListener('online', setStatusHandler)
        window.addEventListener('offline', setStatusHandler)

        return () => {
            window.removeEventListener('online', setStatusHandler)
            window.removeEventListener('offline', setStatusHandler)
        }
    }, [])

    return <div>{status ? 'online' : 'offline'}</div>
}
Status.displayName = 'Status'
