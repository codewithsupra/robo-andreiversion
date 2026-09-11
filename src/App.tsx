import { useCallback, useEffect, useMemo, useRef, type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardList from './components/CardList'
import SearchBox from './components/SearchBox'
import Scroll from './components/Scroll'
import ErrorBoundary from './components/ErrorBoundary'
import { setSearchField, fetchRobots } from './actions'
import type { RootState, AppDispatch } from './store'
import Header from './components/Header'
import UpdateToast from './components/UpdateToast'

function App() {
  const robots = useSelector((state: RootState) => state.robotsReducer.robots)
  const isLoading = useSelector((state: RootState) => state.robotsReducer.isLoading)
  const searchField = useSelector((state: RootState) => state.robotsReducer.searchField)
  const dispatch = useDispatch<AppDispatch>()

  const renderCount = useRef(0)
  renderCount.current += 1

  useEffect(() => {
    dispatch(fetchRobots())
  }, [dispatch])

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      dispatch(setSearchField(value));
    }, 200)
  }, [dispatch])


  const filteredRobots = useMemo(() => {
    const query = searchField.toLowerCase();
    return robots.filter((robot) => robot.name.toLowerCase().includes(query))
  }, [robots, searchField])

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: 'linear-gradient(135deg, #0d1b3e 0%, #123a52 60%, #0f6a6a 100%)' }}
    >
     <Header />
      {import.meta.env.DEV && (
        <p className="text-center text-cyan-100/50 text-xs mb-2">render #{renderCount.current}</p>
      )}
      <SearchBox searchChange={onSearchChange} />
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400/30 border-t-cyan-400" />
        </div>
      ) : (
        <ErrorBoundary>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </ErrorBoundary>
      )}
      <UpdateToast />
    </div>
  )
}

export default App
