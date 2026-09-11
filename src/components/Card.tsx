import { memo } from 'react'

interface CardProps {
  id: number
  name: string
  email: string
}

function Card({ id, name, email }: CardProps) {
  return (
    <div className="bg-[#01426a] border-2 border-cyan-400/40 rounded-2xl p-5 m-1 shadow-lg shadow-cyan-500/20 transition-transform duration-200 hover:scale-105">
      <img src={`https://robohash.org/${id}?set=set6`} width={200} height={200} alt="not-found" />
      <div className='flex flex-col items-center gap-1 mt-2 p-2'>
        <h2 className="text-cyan-300">{name}</h2>
        <p className="text-cyan-100/80">{email}</p>
      </div>
    </div>
  )
}

// Skip re-rendering a card if its own id/name/email haven't changed,
// even when the parent list re-renders (e.g. other robots filtered out).
export default memo(Card)
