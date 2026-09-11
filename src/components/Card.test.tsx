import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('renders the robot name and email', () => {
    render(<Card id={1} name="Jane Doe" email="jane@example.com" />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('builds the avatar image src from the robot id', () => {
    render(<Card id={42} name="Jane Doe" email="jane@example.com" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://robohash.org/42?set=set6')
  })

  // Snapshot testing: render once, save the output as a committed file
  // (src/components/__snapshots__/Card.test.tsx.snap). Every future run
  // diffs the new render against that file. A failing snapshot means
  // "the markup changed" — you then either accept it (npx vitest -u)
  // if the change was intentional, or it just caught a regression.
  it('matches its snapshot', () => {
    const { container } = render(<Card id={1} name="Jane Doe" email="jane@example.com" />)
    expect(container).toMatchSnapshot()
  })
})
