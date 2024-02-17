import './index.css'
import GameCard from '../GameCard'

function ListOfGameCards ({ games, deleteGame }) {
  return (
    <ul className='GameCards'>
      {
        games?.map(game => (
          <GameCard key={game._id} {...game} deleteGame={deleteGame} />
        ))
      }
    </ul>
  )
}

export default function GameCards ({ games, deleteGame }) {
  const hasGames = games?.length > 0

  return hasGames
    ? <ListOfGameCards games={games} deleteGame={deleteGame} />
    : <p>No games found</p>
}
