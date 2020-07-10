import { useEffect, useReducer } from 'react'

export type unixDate = number
export type url = string

// https://hackernews.api-docs.io/v0/items/story
interface StoryModel {
    id: number
    deleted?: boolean
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
    by: string
    time: unixDate
    dead?: boolean
    kids?: number[]
    descendants?: number
    score?: number
    title: string
    url: url
}

interface StoryErrorAction {
    type: 'error'
}

interface StoryLoadedAction {
    type: 'loaded'
    data: StoryModel
}

type StoryReducerActions = StoryErrorAction | StoryLoadedAction

interface StoryState {
    isLoading: boolean
    didError: boolean
    data?: StoryModel
}

const initialState: StoryState = {
    isLoading: true,
    didError: false,
}

function storyFetchReducer(state: StoryState, action: StoryReducerActions): StoryState {
    switch (action.type) {
        case 'error':
            return {
                didError: true,
                isLoading: false,
                data: undefined,
            }
        case 'loaded':
            return {
                didError: false,
                isLoading: false,
                data: action.data,
            }
    }
}

// Fetch a story from supplied ID
export function useStoryFetch(id: number): [boolean, boolean, StoryModel | undefined] {
    const [state, dispatch] = useReducer(storyFetchReducer, initialState)

    function dispatchUnlessAborted(action: StoryReducerActions, signal: AbortSignal) {
        if (!signal.aborted) {
            dispatch(action)
        }
    }

    useEffect(() => {
        const abortController = new AbortController()

        async function fetchStory() {
            try {
                const response = await fetch(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
                    {
                        signal: abortController.signal,
                    }
                )

                if (!abortController.signal.aborted) {
                    if (response.ok) {
                        const storyData: StoryModel = await response.json()
                        // Unexpected null data on successful reponse. Believe that's a HN issue
                        if (storyData === null) {
                            dispatchUnlessAborted({ type: 'error' }, abortController.signal)
                            return
                        }
                        dispatchUnlessAborted(
                            { type: 'loaded', data: storyData },
                            abortController.signal
                        )
                    } else {
                        dispatchUnlessAborted({ type: 'error' }, abortController.signal)
                    }
                }
            } catch (err) {
                dispatchUnlessAborted({ type: 'error' }, abortController.signal)
            }
        }

        if (!state.data && !state.didError && !abortController.signal.aborted) {
            fetchStory()
        }

        return () => {
            abortController.abort()
        }
    }, [id, state])

    return [state.isLoading, state.didError, state.data]
}
