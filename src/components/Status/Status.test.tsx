import React from 'react'
import { render } from '@testing-library/react'
import { Status } from './Status'

beforeEach(() => {
    jest.restoreAllMocks()
})

it('Displays the correct label offline', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)
    const { getByText } = render(<Status />)
    expect(getByText('offline')).toBeInTheDocument()
})

it('Displays the correct label online', () => {
    const { getByText } = render(<Status />)
    expect(getByText('online')).toBeInTheDocument()
})
