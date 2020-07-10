import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor, render } from '@testing-library/react'
import { Story } from './Story'

const testStory = {
    title: 'Great CSS Frameworks for Web Developers',
    url: 'https://insights.dice.com/2020/07/09/5-great-css-frameworks-for-web-developers/',
    author: 'Jane Smith',
    time: 1594298350,
    type: 'story',
}

const server = setupServer(
    rest.get('https://hacker-news.firebaseio.com/v0/item/:storyid', (req, res, ctx) => {
        return res(
            ctx.json({
                id: req.params.storyid,
                ...testStory,
            })
        )
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('will show the loading component', () => {
    const { getByLabelText } = render(<Story storyId={123456789} />)
    expect(getByLabelText(/loading story/)).toBeDefined()
})

it('will fetch and display a story', async () => {
    const { debug, getByText, queryByText } = render(<Story storyId={23736485} />)

    await waitFor(() => screen.getByText(testStory.title))

    expect(queryByText(testStory.title)).toBeDefined()
    expect(getByText(testStory.title)).toHaveAttribute('href', testStory.url)
})

it('does not display a story if an error occurs', async () => {
    server.use(
        rest.get('https://hacker-news.firebaseio.com/v0/item/:storyid', (_, res, ctx) => {
            return res(ctx.status(500))
        })
    )

    render(<Story storyId={123456789} />)

    await waitFor(() => {
        expect(screen.queryByLabelText('story loading')).toBe(null)
    })
})

it('does not display a dead story', async () => {
    server.use(
        rest.get('https://hacker-news.firebaseio.com/v0/item/:storyid', (req, res, ctx) => {
            return res(
                ctx.json({
                    id: req.params.storyid,
                    ...testStory,
                    dead: true,
                })
            )
        })
    )

    render(<Story storyId={123456789} />)

    waitFor(() => {
        expect(screen.getByLabelText(/loading story/)).not.toBeInTheDocument()
    })

    expect(screen.queryByText(testStory.title)).toBe(null)
})
