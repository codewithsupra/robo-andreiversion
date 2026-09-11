import { memo, useEffect, useId, useRef, type ChangeEvent } from 'react'
import { Search } from 'lucide-react'

interface SearchBoxProps {
  searchChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function SearchBox({ searchChange }: SearchBoxProps) {
  // Handle to the actual <input> DOM node, so we can call .focus() on it.
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Unique id to link the label to the input for accessibility.
  const inputId = useId()

  return (
    <div className="flex justify-center px-4 mb-6 ">
      <div className="relative w-full max-w-sm">
        <label htmlFor={inputId} className="sr-only">
          Search robots
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          id={inputId}
          ref={inputRef}
          type="search"
          placeholder="Search robots"
          onChange={searchChange}
          className="w-full rounded-full bg-cyan-100 border border-gray-300 pl-10 pr-4 py-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </div>
    </div>
  )
}

// searchChange is a stable (useCallback'd) reference in App, so memo
// actually prevents re-rendering this on every keystroke/App re-render.
export default memo(SearchBox)
