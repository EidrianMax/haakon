import './index.css'
import Game from '../Game'

function ListOfGames ({ games }) {
  return (
    <ul className='Games'>
      {
        games?.map(({ id, name, backgroundImage, platforms, genres }) => (
          <Game
            key={id}
            id={id}
            name={name}
            backgroundImage={backgroundImage}
            platforms={platforms}
            genres={genres}
          />
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
