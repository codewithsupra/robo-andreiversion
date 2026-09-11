import { memo } from 'react'

function Header() {
  return (
    <div>
      <h1
        className="text-center text-5xl tracking-widest py-8 font-['Bungee',cursive] text-transparent"
        style={{
          WebkitTextStroke: '2px #22d3ee',
          textShadow: '0 0 8px rgba(34,211,238,0.7), 0 0 20px rgba(34,211,238,0.4)',
        }}
      >
        ROBOFRIENDS
      </h1>
    </div>
  )
}

// Header takes no props, so it never needs to re-render once mounted.
// memo skips re-rendering it when App re-renders (e.g. on every
// keystroke in the search box).
export default memo(Header)
