import './index.css'
import Game from '../Game'

function ListOfGames ({ games }) {
  return (
    <ul className='Games'>
      {
        games?.map(game => (
          <Game key={game.id} {...game} />
        ))
      }
    </ul>
  )
}

export default function Games ({ games }) {
  const hasGames = games?.length > 0

  return hasGames
    ? <ListOfGames games={games} />
    : <p>No games found</p>
}
