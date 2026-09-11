import { describe, expect, it } from 'vitest'
import { robotsReducer } from './reducer'
import { setSearchField } from './actions'
import { FETCH_ROBOTS_FAILURE, FETCH_ROBOTS_REQUEST, FETCH_ROBOTS_SUCCESS } from './constants'
import type { Robot } from './actions'

// A reducer is a pure function: (state, action) => newState. No React,
// no store, no rendering needed to test it — just call it directly.
describe('robotsReducer', () => {
  it('returns the initial state when called with an unknown action', () => {
    const state = robotsReducer(undefined, { type: '@@INIT' } as never)
    expect(state).toEqual({
      searchField: '',
      robots: [],
      isLoading: false,
      error: null
    })
  })

  it('updates searchField on CHANGE_SEARCHFIELD without touching other fields', () => {
    const initial = { searchField: '', robots: [], isLoading: false, error: null }
    const state = robotsReducer(initial, setSearchField('jane'))
    expect(state.searchField).toBe('jane')
    expect(state.robots).toBe(initial.robots) // unchanged reference
  })

  it('sets isLoading true and clears error on FETCH_ROBOTS_REQUEST', () => {
    const initial = { searchField: '', robots: [], isLoading: false, error: 'old error' }
    const state = robotsReducer(initial, { type: FETCH_ROBOTS_REQUEST })
    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('stores robots and clears loading on FETCH_ROBOTS_SUCCESS', () => {
    const robots: Robot[] = [{ id: 1, name: 'Jane', email: 'jane@example.com' }]
    const initial = { searchField: '', robots: [], isLoading: true, error: null }
    const state = robotsReducer(initial, { type: FETCH_ROBOTS_SUCCESS, payload: robots })
    expect(state.isLoading).toBe(false)
    expect(state.robots).toEqual(robots)
  })

  it('stores the error and clears loading on FETCH_ROBOTS_FAILURE', () => {
    const initial = { searchField: '', robots: [], isLoading: true, error: null }
    const state = robotsReducer(initial, { type: FETCH_ROBOTS_FAILURE, payload: 'Network error' })
    expect(state.isLoading).toBe(false)
    expect(state.error).toBe('Network error')
  })

  it('never mutates the previous state object', () => {
    const initial = { searchField: '', robots: [], isLoading: false, error: null }
    robotsReducer(initial, setSearchField('x'))
    expect(initial.searchField).toBe('') // original untouched
  })
})
