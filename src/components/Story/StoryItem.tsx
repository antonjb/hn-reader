import React from 'react'
import { url, unixDate } from './useStoryFetch'

export interface StoryProps {
    title: string
    url: url
    author: string
    publicationDate: unixDate
}

export const StoryItem: React.FC<StoryProps> = ({ title, url, author, publicationDate }) => {
    const date = new Date(publicationDate * 1_000)

    return (
        <section>
            <h2>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                </a>
            </h2>
            <div>
                <p>{author}</p>
                <time data-testid="publicationDate" dateTime={date.toISOString()}>
                    {date.toLocaleString('en-AU')}
                </time>
            </div>
        </section>
    )
}
StoryItem.displayName = 'Story'

// Visual representation of a story whilst loading
export const StorySkeleton: React.FC<{ id: number }> = ({ id }) => (
    <section aria-label={`loading story ${id}`}>
        <div />
        <div>
            <div />
            <div />
        </div>
    </section>
)
StorySkeleton.displayName = 'StorySkeleton'
