import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import CardList from './CardList'

const robots = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 2, name: 'John Smith', email: 'john@example.com' }
]

describe('CardList', () => {
  it('renders one card per robot', () => {
    render(<CardList robots={robots} />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('shows a "no results" message when the list is empty', () => {
    render(<CardList robots={[]} />)
    expect(screen.getByText('No results found!!')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
