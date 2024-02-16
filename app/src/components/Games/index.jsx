import './index.css'
import Game from '../Game'

function ListOfGames ({ games, favGames }) {
  return (
    <ul className='Games'>
      {
        games?.map(game => (
          <Game key={game.id} {...game} favGames={favGames} />
        ))
      }
    </ul>
  )
}

export default function Games ({ games, favGames }) {
  const hasGames = games?.length > 0

  return hasGames
    ? <ListOfGames games={games} favGames={favGames} />
    : <p>No games found</p>
}
