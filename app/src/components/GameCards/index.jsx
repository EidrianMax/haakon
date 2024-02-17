import './index.css'
import GameCard from '../GameCard'

function ListOfGameCards ({ games }) {
  return (
    <ul className='GameCards'>
      {
        games?.map(game => (
          <GameCard key={game._id} {...game} />
        ))
      }
    </ul>
  )
}

export default function GameCards ({ games }) {
  const hasGames = games?.length > 0

  return hasGames
    ? <ListOfGameCards games={games} />
    : <p>No games found</p>
}
