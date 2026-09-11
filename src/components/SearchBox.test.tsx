import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBox from './SearchBox'

describe('SearchBox', () => {
  it('calls searchChange as the user types', async () => {
    const user = userEvent.setup()
    const searchChange = vi.fn()
    render(<SearchBox searchChange={searchChange} />)

    await user.type(screen.getByPlaceholderText('Search robots'), 'jane')

    // onChange fires once per keystroke, so 4 characters = 4 calls.
    expect(searchChange).toHaveBeenCalledTimes(4)
  })

  // SearchBox owns a ref + effect that focuses itself on mount — that's
  // internal stateful behavior worth testing directly, not just props in.
  it('autofocuses the input on mount', () => {
    render(<SearchBox searchChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Search robots')).toHaveFocus()
  })
})
