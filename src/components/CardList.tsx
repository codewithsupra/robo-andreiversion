import Card from './Card'

interface Robot {
  id: number
  name: string
  email: string
}

interface CardListProps {
  robots: Robot[]
}

function CardList({ robots }: CardListProps) {
  if (robots.length === 0) {
    return <p>No results found!!</p>
  }
  return (
    <div className="flex flex-wrap justify-center pt-4 gap-3">
      {robots.map((robot) => (
        <Card key={robot.id} id={robot.id} name={robot.name} email={robot.email} />
      ))}
    </div>
  )
}

export default CardList
