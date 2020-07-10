import React from 'react'
import { useStoryFetch } from './useStoryFetch'
import { StorySkeleton, StoryItem } from './StoryItem'

interface StoryProps {
    storyId: number
}

export const Story: React.FC<StoryProps> = ({ storyId }) => {
    const [isLoading, error, storyData] = useStoryFetch(storyId)

    if (error) {
        return null
    }

    if (isLoading) {
        return <StorySkeleton id={storyId} />
    }

    if (
        storyData &&
        storyData.type === 'story' &&
        storyData.dead !== true &&
        storyData.deleted !== true
    ) {
        return (
            <li>
                <StoryItem
                    author={storyData.by}
                    publicationDate={storyData.time}
                    title={storyData.title}
                    url={storyData.url}
                />
            </li>
        )
    }

    return null
}
