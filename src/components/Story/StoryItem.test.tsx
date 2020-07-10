import React from 'react'
import { render } from '@testing-library/react'
import { StoryItem, StoryProps, StorySkeleton } from './StoryItem'

it('renders the correct information', () => {
    // https://hacker-news.firebaseio.com/v0/item/23779525.json
    const testStory: StoryProps = {
        title: 'Great CSS Frameworks for Web Developers',
        url: 'https://insights.dice.com/2020/07/09/5-great-css-frameworks-for-web-developers/',
        author: 'Jane Smith',
        publicationDate: 1594298350,
    }

    const { getByTestId, queryByText } = render(
        <StoryItem
            title={testStory.title}
            url={testStory.url}
            author={testStory.author}
            publicationDate={testStory.publicationDate}
        />
    )

    const anchorElement = queryByText(testStory.title)

    expect(anchorElement).toBeInTheDocument()
    expect(anchorElement).toHaveAttribute('href', testStory.url)
    expect(anchorElement).toHaveAttribute('rel', 'noopener noreferrer')
    expect(getByTestId('publicationDate')).toHaveAttribute('dateTime', '2020-07-09T12:39:10.000Z')
})

it('renders a Story skeleton', () => {
    const { getByLabelText } = render(<StorySkeleton id={12345} />)

    expect(getByLabelText(/loading story/)).toBeInTheDocument()
})
