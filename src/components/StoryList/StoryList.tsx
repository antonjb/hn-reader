import React, { useState, Fragment } from 'react'
import { useLatestStories } from '../../Hooks/useLatestStories'
import { StorySkeleton } from '../Story/StoryItem'
import { Story } from '../Story/Story'
import { ScrollObserver } from '../ScrollObserver/ScrollObserver'

export const StoryList: React.FC = () => {
    const [isLoading, storyIdGenerator] = useLatestStories()
    const [loadedStories, setLoadedStories] = useState<number[]>([])

    function onIntersectHandler() {
        if (storyIdGenerator.current) {
            const nextStoryId = storyIdGenerator.current.next()

            if (nextStoryId.value) {
                setLoadedStories((currentStories) => [...currentStories, nextStoryId.value])
            }
        }
    }

    return (
        <Fragment>
            <ul aria-live="polite">
                {isLoading
                    ? Array.from(Array(10)).map((_, idx) => (
                          <li key={idx}>
                              <StorySkeleton />
                          </li>
                      ))
                    : loadedStories.map((storyId) => <Story key={storyId} storyId={storyId} />)}
            </ul>
            {!isLoading && <ScrollObserver onIntersect={onIntersectHandler} />}
        </Fragment>
    )
}
StoryList.displayName = 'StoryList'
