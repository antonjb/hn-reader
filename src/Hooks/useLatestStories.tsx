import { useState, useRef, useEffect } from 'react'

type StoryIDList = number[]

async function fetchLatestStoryIds(signal: AbortSignal) {
    let storyIds: StoryIDList = []

    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json', {
            signal,
        })

        if (!signal.aborted && response.ok) {
            storyIds = await response.json()
        }
    } catch (err) {
        console.error('oh-oh')
    }

    return storyIds
}

export function useLatestStories(): [
    boolean,
    React.MutableRefObject<Generator<number, any, any> | undefined>
] {
    const [storyIds, setStoryIds] = useState<number[]>([])
    const idGenerator = useRef<Generator<number, any, any>>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()

        async function loadStoryIds() {
            if (!abortController.signal.aborted) {
                setIsLoading(false)
                setStoryIds(await fetchLatestStoryIds(abortController.signal))
            }
        }

        loadStoryIds()

        return () => {
            abortController.abort()
        }
    }, [])

    useEffect(() => {
        function* generator(stories: number[]) {
            let currentIndex = 0

            while (currentIndex < stories.length) {
                yield stories[currentIndex]
                currentIndex++
            }

            return
        }

        idGenerator.current = generator(storyIds)
    }, [storyIds])

    return [isLoading, idGenerator]
}
