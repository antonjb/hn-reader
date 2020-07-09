import React from 'react'

type url = string
type unixDate = number

export interface StoryProps {
    title: string
    url: url
    author: string
    publicationDate: unixDate
}

export const Story: React.FC<StoryProps> = ({ title, url, author, publicationDate }) => {
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
Story.displayName = 'Story'

// Visual representation of a story whilst loading
export const StorySkeleton: React.FC<{ id: string }> = ({ id }) => (
    <section aria-label={`loading story ${id}`}>
        <div />
        <div>
            <div />
            <div />
        </div>
    </section>
)
StorySkeleton.displayName = 'StorySkeleton'
