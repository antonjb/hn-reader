import React from 'react'
import { useStoryFetch } from '../../Hooks/useStoryFetch'
import { StorySkeleton, StoryItem } from './StoryItem'
import './Story.css'

interface StoryProps {
    storyId: number
}

export const Story: React.FC<StoryProps> = ({ storyId }) => {
    const [isLoading, error, storyData] = useStoryFetch(storyId)

    if (error) {
        return null
    }

    if (isLoading) {
        return (
            <li className="story-list-item">
                <StorySkeleton id={storyId} />
            </li>
        )
    }

    if (
        storyData &&
        storyData.type === 'story' &&
        storyData.dead !== true &&
        storyData.deleted !== true
    ) {
        return (
            <li className="story-list-item">
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
