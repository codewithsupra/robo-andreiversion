import type { ReactNode } from 'react'

interface ScrollProps {
  children: ReactNode
}

function Scroll({ children }: ScrollProps) {
  return (
    <div className="max-h-[70vh] border-t-2 overflow-y-auto">
      {children}
    </div>
  )
}

export default Scroll
