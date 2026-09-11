import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore, type Reducer, type UnknownAction } from '@reduxjs/toolkit'
import App from './App'
import { robotsReducer } from './reducer'

const robots = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 2, name: 'John Smith', email: 'john@example.com' }
]

// A connected component reads from the real store via useSelector/
// useDispatch, so testing it means wrapping it in a real <Provider> with
// a real store — NOT mocking Redux — and asserting on the rendered
// output as state actually flows through reducers and back.
function renderApp() {
  const store = configureStore({
    reducer: { robotsReducer: robotsReducer as Reducer<ReturnType<typeof robotsReducer>, UnknownAction> }
  })
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

describe('App (connected)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('fetches robots on mount and renders them once loaded', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: () => Promise.resolve(robots)
    }))

    renderApp()

    await waitFor(() => expect(screen.getByText('Jane Doe')).toBeInTheDocument())
    expect(screen.getByText('John Smith')).toBeInTheDocument()
  })

  it('filters the rendered cards as the user types, via the real store', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: () => Promise.resolve(robots)
    }))
    const user = userEvent.setup()

    renderApp()
    await waitFor(() => expect(screen.getByText('Jane Doe')).toBeInTheDocument())

    await user.type(screen.getByPlaceholderText('Search robots'), 'jane')

    // App debounces dispatch by 200ms, so the filtered result appears
    // asynchronously — waitFor polls until the DOM reflects the new state.
    await waitFor(() => expect(screen.queryByText('John Smith')).not.toBeInTheDocument())
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })
})
