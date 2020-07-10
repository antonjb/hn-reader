import React from 'react'

interface ScrollObserverProps {
    onIntersect: () => void
    debug?: boolean
}

export const ScrollObserver: React.FC<ScrollObserverProps> = ({ onIntersect, debug = false }) => {
    const observedElement = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.intersectionRatio > 0)) {
                    onIntersect()
                }
            },
            {
                // Give some room to load
                rootMargin: '0px 0px 40% 0px',
            }
        )

        if (observedElement.current) {
            observer.observe(observedElement.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [onIntersect])

    return (
        <div
            style={{ backgroundColor: debug ? 'pink' : undefined, height: 10 }}
            aria-hidden={true}
            ref={observedElement}
        />
    )
}
