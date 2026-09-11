import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchRobots, setSearchField } from './actions'
import { CHANGE_SEARCHFIELD, FETCH_ROBOTS_FAILURE, FETCH_ROBOTS_REQUEST, FETCH_ROBOTS_SUCCESS } from './constants'

// Plain action creators are pure functions that return plain objects.
// Testing them means: call it, check the object shape. No mocking needed.
describe('setSearchField', () => {
  it('creates a CHANGE_SEARCHFIELD action with the given payload', () => {
    expect(setSearchField('jane')).toEqual({
      type: CHANGE_SEARCHFIELD,
      payload: 'jane'
    })
  })
})

// A thunk returns a function instead of an object, so testing it means:
// call the outer function to get the inner function, call that with a
// fake `dispatch`, then assert on what got dispatched and in what order.
describe('fetchRobots (thunk)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('dispatches REQUEST then SUCCESS when the fetch resolves', async () => {
    const robots = [{ id: 1, name: 'Jane', email: 'jane@example.com' }]
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: () => Promise.resolve(robots)
    }))

    const dispatch = vi.fn()
    await fetchRobots()(dispatch as never)

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: FETCH_ROBOTS_REQUEST })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: FETCH_ROBOTS_SUCCESS, payload: robots })
  })

  it('dispatches REQUEST then FAILURE when the fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')))

    const dispatch = vi.fn()
    await fetchRobots()(dispatch as never)

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: FETCH_ROBOTS_REQUEST })
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: FETCH_ROBOTS_FAILURE, payload: 'Network down' })
  })
})
